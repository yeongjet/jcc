/* eslint-disable quotes */
import R from 'ramda'
import {
    trigraphSequence,
    trigraphSequenceMapper,
    whiteSpace
} from '@jcc/common/definition'

// 涉及章节: 5.1.1 6.4.9

/**
 * 1.Physical source file multibyte characters are mapped, in an implementation-
 * defined manner, to the source character set (introducing new-line characters for
 * end-of-line indicators) if necessary. Trigraph sequences are replaced by
 * corresponding single-character internal representations.
 *
 * 如果有必要，物理源文件中的多字节字符以实现规定的方式映射为源字符集。
 * 三联序列替换为当前字符集中的某个字符
 */

/**
 * On Windows system, map '/r/n' to '/n'
 */

export const mapNewLine = (s: string): string => {
    let r = ''
    for (let i = 0; i < s.length; i++) {
        if (`${s[i]}${s[i + 1]}` === '\r\n') {
            r += '\n'
            i++
        } else {
            r += s[i]
        }
    }
    return r
}

export const mapTrigraphSequence = (s: string): string => {
    let r = ''
    for (let i = 0; i < s.length; i++) {
        const sq = `${s[i]}${s[i + 1]}${s[i + 2]}`
        if (R.indexOf(sq, trigraphSequence) >= 0) {
            const v = trigraphSequenceMapper[sq]
            r += v
            i += 2
        } else {
            r += s[i]
        }
    }
    return r
}

/**
 * 2.Each instance of a backslash character (\) immediately followed by a new-line
 * character is deleted, splicing physical source lines to form logical source lines.
 * Only the last backslash on any physical source line shall be eligible for being part
 * of such a splice. A source file that is not empty shall end in a new-line character,
 * which shall not be immediately preceded by a backslash character before any such
 * splicing takes place.
 *
 */

/**
 * 把物理源行拼接为逻辑源行
 */
export const splice = (s: string): string => {
    let r = ''
    for (let i = 0; i < s.length; i++) {
        const sq = `${s[i]}${s[i + 1]}`
        if (sq === '\\\n') {
            i++
        } else {
            r += s[i]
        }
    }
    return r
}

/**
 *
 * 3.The source file is decomposed into preprocessing tokens and sequences of
 *   white-space characters (including comments). A source file shall not end in a
 *   partial preprocessing token or in a partial comment. Each comment is replaced by
 *   one space character. New-line characters are retained. Whether each nonempty
 *   sequence of white-space characters other than new-line is retained or replaced by
 *   one space character is implementation-defined
 *
 * 源文件被分解为预处理记号，和空白字符序列(包括注释)。源文件不能以部分预处理记号
 * 或者部分注释结束。每个注释替换为一个空格。换行符保留。连续的空白字符(换行符除外)
 * 是否保留或者替换为一个空格字符由实现规定。
 */

/**
 * 注释替换为一个空格
 */
export const mapComment = (s: string): string => {
    let r = ''
    for (let i = 0; i < s.length; i++) {
        if (s[i] === "'" || s[i] === '"') {
            const t = s[i]
            r += s[i]
            i++
            while (s[i] !== t) {
                if (i === s.length - 1) {
                    break
                }
                r += s[i]
                i++
            }
            r += s[i]
        } else {
            const sq = `${s[i]}${s[i + 1]}`
            if (sq === '//') {
                i += 2
                while (s[i] != '\n') {
                    if (i >= s.length - 1) {
                        r += ' '
                        return r
                    }
                    i++
                }
                r += ' \n'
            } else if (sq === '/*') {
                i += 2
                while (`${s[i]}${s[i + 1]}` !== '*/') {
                    if (i >= s.length - 1) {
                        r += s.substring(i - 2, s.length)
                        return r
                    }
                    i++
                }
                i++
                r += ' '
            } else {
                r += s[i]
            }
        }
    }
    return r
}

/**
 * 把连续的空白字符替换为一个空格字符
 */
export const mapWhiteSpaceSequence = (s: string): string => {
    let r = ''
    const replaceSet = R.filter(n => n !== '\n', whiteSpace)
    for (let i = 0; i < s.length; i++) {
        if (replaceSet.indexOf(s[i]) >= 0) {
            if (i >= 1 && s[i - 1] !== '\n') {
                i++
                if (i === s.length) {
                    return r
                }
                r += ' '
            }

            while (replaceSet.indexOf(s[i]) >= 0) {
                i++
                if (i === s.length) {
                    if (r.substr(r.length - 1, 1) === ' ') {
                        r = r.substring(0, r.length - 1)
                        return r
                    }
                    return r
                }
            }
        }
        // 连续空格接着换行，去掉空格直接换行(replaceWhiteSpaceSequence.20.out)
        if (s[i] === '\n') {
            if (r.substr(r.length - 1, 1) === ' ') {
                r = r.substring(0, r.length - 1)
            }
        }
        r += s[i]
    }
    return r
}
