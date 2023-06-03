function sortPages(pages){
    const pagesArr = Object.entries(pages)
    console.log(pagesArr)
    pagesArr.sort((a,b) => {
        return b[1] -a[1]
    })
    return pagesArr
}

function printReport(pages){
    console.log("============")
    console.log("Report")
    console.log("============")
    const sortpages = sortPages(pages)
    for (const sortPage of sortpages){
        const url = sortPage[0]
        const hits = sortPage[1]
        console.log(`Found ${hits} links to page ${url}`)
    }
    console.log("============")
    console.log("End Report")
    console.log("============")
}



module.exports = {
    sortPages,
    printReport

}