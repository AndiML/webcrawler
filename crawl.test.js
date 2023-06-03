const {normalizeURL, getURLsFromHTML} = require('./crawl.js')
const {test, expect} = require('@jest/globals')

test('normalizeURL', () =>{
    const input = 'https://blog.boot.dev/path/'
    const actual_out = normalizeURL(input)
    const expected_out = 'blog.boot.dev/path'
    expect(actual_out).toEqual(expected_out)
})

test('normalizeURL capitals', () =>{
    const input = 'https://BLOG.boot.dev/path/'
    const actual_out = normalizeURL(input)
    const expected_out = 'blog.boot.dev/path'
    expect(actual_out).toEqual(expected_out)
})

test('normalizeURL http', () =>{
    const input = 'http://blog.boot.dev/path/'
    const actual_out = normalizeURL(input)
    const expected_out = 'blog.boot.dev/path'
    expect(actual_out).toEqual(expected_out)
})

test('getURLSFromHTML', () =>{
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/path"><span>Go to Boot.dev</span></a>
        </body> 
    </html>`

    const inputBaseURL = 'https://blog.boot.dev'
    const actual_out = getURLsFromHTML(inputHTMLBody,inputBaseURL)
    const expected_out = ['https://blog.boot.dev/path']
    expect(actual_out).toEqual(expected_out)
})


test('getURLSFromHTML relative', () =>{
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
        </body> 
    </html>`

    const inputBaseURL = 'https://blog.boot.dev'
    const actual_out = getURLsFromHTML(inputHTMLBody,inputBaseURL)
    const expected_out = ['https://blog.boot.dev/']
    expect(actual_out).toEqual(expected_out)
})


test('getURLSFromHTML both', () =>{
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path1/"><span>Go to Boot.dev Blog Path One</span></a>
            <a href="/path2/"><span>Go to Boot.dev Blog Path Two</span></a>
        </body> 
    </html>`

    const inputBaseURL = 'https://blog.boot.dev'
    const actual_out = getURLsFromHTML(inputHTMLBody,inputBaseURL)
    const expected_out = ['https://blog.boot.dev/path1/','https://blog.boot.dev/path2/']
    expect(actual_out).toEqual(expected_out)
})
test('getURLSFromHTML relative', () =>{
    const inputHTMLBody = `
    <html>
        <body>
            <a href="invalid"><span>Invalid URL</span></a>
        </body> 
    </html>`

    const inputBaseURL = 'https://blog.boot.dev'
    const actual_out = getURLsFromHTML(inputHTMLBody,inputBaseURL)
    const expected_out = []
    expect(actual_out).toEqual(expected_out)
})