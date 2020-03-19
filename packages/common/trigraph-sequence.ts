/*
 * @Author: yeongjet
 * @LastEditors: Please set LastEditors
 * @Date: 2019-07-06 12:31:15
 * @UpdatedAt: 2020-03-11 22:08:29
 * @Description: Trigraph sequences.(5.2.1.1)
 */

/* eslint-disable quotes */

export const map = [
    { key: '??=', value: '#' },
    { key: '??(', value: '[' },
    { key: '??/', value: '\\' },
    { key: '??)', value: ']' },
    { key: "??'", value: '^' },
    { key: '??<', value: '{' },
    { key: '??!', value: '|' },
    { key: '??>', value: '}' },
    { key: '??-', value: '~' }
]

export const set = ['??=', '??(', '??/', '??)', "??'", '??<', '??!', '??>', '??-']
