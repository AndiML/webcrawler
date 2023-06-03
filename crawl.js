
const {JSDOM} = require('jsdom')



async function crawlPage(baseURL,currentURL,pages){
    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)
    // Base Cases for Recursion//
    // skips pages that are linked but are not children of a given hostname
    if(baseURLObj.hostname !== currentURLObj.hostname){
        return pages
    }
    const normalizedCurrentURL = normalizeURL(currentURL)

    // Checks if page was visited
    if (pages[normalizedCurrentURL]>0 ){
        pages[normalizedCurrentURL]++
        return pages
    }

    pages[normalizedCurrentURL] = 1
    console.log(`actively crawling: ${currentURL}`)

    try {
        const resp = await fetch(currentURL)
        
        if(resp.status>399){
            console.log(`error in fetch with status code: ${resp.status}, on page: ${currentURL}`)
            return pages
        }
        const contentType = resp.headers.get("content-type")
        if (!contentType.includes("text/html")){
            console.log(`non html response, content type: ${contentType}, on page: ${currentURL}`)
            return pages
        }

        const htmlBody =  await resp.text()
        const nextURLs = getURLsFromHTML(htmlBody, baseURL)

        //recursive crawling of nextURL as currentURL

        for (const nextURL of nextURLs){
            pages =  await crawlPage(baseURL, nextURL, pages)
        }

    } catch (error) {
        console.log(`error in fetch ${error.message}, on page: ${currentURL}`)
    }
    return pages
    
}

function getURLsFromHTML(htmlbody, baseURL) {
    const urls = [];
    const dom = new JSDOM(htmlbody);
    const linkElements = dom.window.document.querySelectorAll('a');
    
    for (const linkElement of linkElements) {
      if (linkElement.href.slice(0, 1) === '/') {
        try {
            const urlObj = new URL(`${baseURL}${linkElement.href}`)
            urls.push(urlObj.href);
            
        } catch (error) {
            console.log(`${error.message}`)
            
        }
      } else {
        try {
            const urlObj = new URL(linkElement.href)
            urls.push(urlObj.href);
            
        } catch (error) {
            console.log(`${error.message}`)
            
        }

      }
    }
    
    return urls;
  }
  

function normalizeURL(urlString){
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    if (hostPath.length > 0 && hostPath.slice(-1) == '/'){
        return hostPath.slice(0,-1)
    }
    return hostPath
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}