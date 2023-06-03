
const {sortPages} = require('./report.js')
const {test, expect} = require('@jest/globals')

test('sortPages', () =>{
    const input = {
        'https://wagslane.dev/path/' : 1,
        'https://wagslane.dev' : 3
    }
    const actual_out = sortPages(input)
    const expected_out = [
        ['https://wagslane.dev', 3],
        ['https://wagslane.dev/path/', 1]
    ]
    expect(actual_out).toEqual(expected_out)
})
