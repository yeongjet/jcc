/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import Mock from 'mockjs'
import { TrigraphSequence, WhiteSpace } from '@ncc/common'

export const common = [
    [
        '@integer()',
        '@integer(0,100)',
        '@float()',
        '@float(60, 100, 3)',
        '@boolean()',
        '@string(1,30)',
        '@string("symbol")',
        '李三',
        '王八',
        Mock.Random.word()
    ]
        .concat(['\t', '\v', ' ', '\f', '\n', '\r', '\n\r'])
        .concat(['\\', '\\\n', '\n\\', '\\\\', '\n\n'])
        .concat(['???', '=(', '(/)', "'!", '<>', "-'"])
        .concat(['???=', '?==', '==?', '?=?', '?==?', '==='])
        .concat(['???(', '?((', '((?', '?(?', '?((?', '((('])
        .concat(['???/', '?//', '//?', '?/?', '?//?', '///'])
        .concat(['???)', '?))', '))?', '?)?', '?))?', ')))'])
        .concat(["???'", "?''", "''?", "?'?", "?''?", "'''"])
        .concat(['???<', '?<<', '<<?', '?<?', '?<<?', '<<<'])
        .concat(['???!', '?!!', '!!?', '?!?', '?!!?', '!!!'])
        .concat(['???>', '?>>', '>>?', '?>?', '?>>?', '>>>'])
        .concat(['???-', '?--', '--?', '?-?', '?--?', '---'])
        .concat(['\\*', '/*', '*/', '//', '///', '/**/', '//*/', '/*//', '*\\', '//\\', '/\\\n/'])
        .concat([
            '"',
            "'",
            '"',
            "'",
            "'你好/*注释*/abc'",
            '"你好/*注释*/abc"',
            '"你好/**/abc"',
            '"/**/abc"',
            '"abc/**/"',
            '"/**/"'
        ])
        .concat([' ', '  ', '   '])
        .concat(WhiteSpace.set)
        .concat(TrigraphSequence.set)
]

// replaceComment
export const replaceComment = [
    [
        `fghdfgh'sdf/*sdfsd*/sd'dsdf324sdf"fea3434"rtd435//*erw34w*/45io23o/**/`,
        `fghdfgh'sdf/*sdfsd*/sd'dsdf324sdf"fea3434"rtd435/*erw34w*/45io23o/**/`,
        `fghdfgh'sdf/*sdfsd*/sd'dsdf324sdf"fea3434"rtd435/*erw34w*/45io23o/**/`,
        `fghdfgh'sdf/*sdfsd*/sd'dsdf324sdf"fea3434"rtd435/*erw34w*/45io23o/*`,
        `fghdf'gh"sdf/*sdfsd*/sd"dsdf324sdf"fea3434"rtd435/*erw34w*/45io23o`,
        `fghdf'gh"sdf/*sdfsd*/sd"dsdf324sdf"fea3434"rt'd435/*erw34w*/45io23o`,
        `fghd'fgh"sdf/*sdfsd*/sd"ds'df324sdf"fea/*e34*/34"rtd435/*erw34w*/45io23o`,
        `fghdfgh'sdf/*sdfsd*/sd'dsdf324sdf"fea3434"rtd/*435/*erw34w*/45io23o//`,
        `fghdfgh'sdf/*sdfsd*/sd'dsdf324sdf"fea3434"rtd/*435e*/rw34w*/45io23o//`
    ]
]

// replaceWhiteSpaceSequence
const [a, b, c, d, e] = ['\n', ' ', '1', 'd', '你']
export const replaceWhiteSpaceSequence = [
    [
        `${a}${b}${c}${d}${e}`,
        `${a}${b}${b}${d}${e}`,
        `${a}${b}${a}${d}${e}`,
        `${a}${a}${c}${d}${e}`,
        `${a}${a}${b}${d}${e}`,
        `${a}${a}${a}${d}${e}`,
        `${a}${c}${c}${d}${e}`,
        `${a}${c}${b}${d}${e}`,
        `${a}${c}${a}${d}${e}`, //
        `${b}${b}${c}${d}${e}`,
        `${b}${b}${b}${d}${e}`,
        `${b}${b}${a}${d}${e}`,
        `${b}${a}${c}${d}${e}`,
        `${b}${a}${b}${d}${e}`,
        `${b}${a}${a}${d}${e}`,
        `${b}${c}${c}${d}${e}`,
        `${b}${c}${b}${d}${e}`,
        `${b}${c}${a}${d}${e}`, //
        `${c}${b}${c}${d}${e}`,
        `${c}${b}${b}${d}${e}`,
        `${c}${b}${a}${d}${e}`,
        `${c}${a}${c}${d}${e}`,
        `${c}${a}${b}${d}${e}`,
        `${c}${a}${a}${d}${e}`,
        `${c}${c}${c}${d}${e}`,
        `${c}${c}${b}${d}${e}`,
        `${c}${c}${a}${d}${e}`, //sd
        `${a}${b}${c}`,
        `${a}${b}${b}`,
        `${a}${b}${a}`,
        `${a}${a}${c}`,
        `${a}${a}${b}`,
        `${a}${a}${a}`,
        `${a}${c}${c}`,
        `${a}${c}${b}`,
        `${a}${c}${a}`, //
        `${b}${b}${c}`,
        `${b}${b}${b}`,
        `${b}${b}${a}`,
        `${b}${a}${c}`,
        `${b}${a}${b}`,
        `${b}${a}${a}`,
        `${b}${c}${c}`,
        `${b}${c}${b}`,
        `${b}${c}${a}`, //
        `${c}${b}${c}`,
        `${c}${b}${b}`,
        `${c}${b}${a}`,
        `${c}${a}${c}`,
        `${c}${a}${b}`,
        `${c}${a}${a}`,
        `${c}${c}${c}`,
        `${c}${c}${b}`,
        `${c}${c}${a}`, // asdsd
        `${d}${e}${a}${b}${c}`,
        `${d}${e}${a}${b}${b}`,
        `${d}${e}${a}${b}${a}`,
        `${d}${e}${a}${a}${c}`,
        `${d}${e}${a}${a}${b}`,
        `${d}${e}${a}${a}${a}`,
        `${d}${e}${a}${c}${c}`,
        `${d}${e}${a}${c}${b}`,
        `${d}${e}${a}${c}${a}`, //
        `${d}${e}${b}${b}${c}`,
        `${d}${e}${b}${b}${b}`,
        `${d}${e}${b}${b}${a}`,
        `${d}${e}${b}${a}${c}`,
        `${d}${e}${b}${a}${b}`,
        `${d}${e}${b}${a}${a}`,
        `${d}${e}${b}${c}${c}`,
        `${d}${e}${b}${c}${b}`,
        `${d}${e}${b}${c}${a}`, //
        `${d}${e}${c}${b}${c}`,
        `${d}${e}${c}${b}${b}`,
        `${d}${e}${c}${b}${a}`,
        `${d}${e}${c}${a}${c}`,
        `${d}${e}${c}${a}${b}`,
        `${d}${e}${c}${a}${a}`,
        `${d}${e}${c}${c}${c}`,
        `${d}${e}${c}${c}${b}`,
        `${d}${e}${c}${c}${a}`
    ]
]
