/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import { Random } from 'mockjs'
import { trigraphSequence, whiteSpace } from '@jcc/common/definition'

const baseSchema = [
    '@integer()', // 大整数(默认)
    '@integer(0,1000)', // 小整数
    '@float()', // 大浮点数(默认)
    '@float(0, 1000, 5)', // 小浮点数
    '@boolean()', // 布尔值
    '@string()', // 随机字符
    '@string(lower)', // 小写英文字母
    '@string(upper)', // 大写英文字母
    '@string("symbol")', // 标点符号
    '@string("中文字符测试")' // 中文字符
]

const trigraphSequenceSchema = [
    ...trigraphSequence,
    ...['???', '=(', '(/)', "'!", '<>', "-'"],
    ...['???=', '?==', '==?', '?=?', '?==?', '==='],
    ...['???(', '?((', '((?', '?(?', '?((?', '((('],
    ...['???/', '?//', '//?', '?/?', '?//?', '///'],
    ...['???)', '?))', '))?', '?)?', '?))?', ')))'],
    ...["???'", "?''", "''?", "?'?", "?''?", "'''"],
    ...['???<', '?<<', '<<?', '?<?', '?<<?', '<<<'],
    ...['???!', '?!!', '!!?', '?!?', '?!!?', '!!!'],
    ...['???>', '?>>', '>>?', '?>?', '?>>?', '>>>'],
    ...['???-', '?--', '--?', '?-?', '?--?', '---']
]

const whiteSpaceSchema = [
    ...whiteSpace,
    ...['\n\r'],
    ...[' ', '  ', '   '],
    ...['\\', '\\\n', '\n\\', '\\\\', '\n\n']
]

const commentSchema = [
    ...[ '\\*', '/*', '*/', '//', '///', '/**/', '//*/', '/*//', '*\\', '//\\', '/\\\n/'],
    ...[ '"', "'", '"', "'", "'注/*释*/abc'", '"注/*释*/abc"', '"注释/**/abc"', '"/**/abc"', '"abc/**/"', '"/**/"']
]

export const mockSchema = [
    ...baseSchema,
    ...whiteSpaceSchema,
    ...trigraphSequenceSchema,
    ...commentSchema
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
