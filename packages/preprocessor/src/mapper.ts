import R from 'ramda'
import { TrigraphSequence, WhiteSpace } from '@jcc/common'

/**
 * On Windows system, map '/r/n' to '/n'
 *
 * @param {string} s source string
 * @returns {string}
 */

export const mapNewLineCharact = (s: string): string => {
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

/**
 * Remap trigraph sequence the s character set
 *
 * @param {*} s source string
 * @returns
 */
export const mapTrigraphSequence = (s: string): string => {
    let r = ''
    for (let i = 0; i < s.length; i++) {
        const sq = `${s[i]}${s[i + 1]}${s[i + 2]}`
        if (TrigraphSequence.set.indexOf(sq) >= 0) {
            const v = _.find(TrigraphSequence.map, { key: sq }).value
            r += v
            i += 2
        } else {
            r += s[i]
        }
    }
    return r
}

/**
 * Splice physical source lines to form logical source lines
 *
 * @param {string} s source string
 * @returns {string}
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
 *  Replace Each comment with one space character.Except within a character constant, a string literal, or a comment.(6.4.9)
 *
 * @param {string} s source string
 * @returns {string}
 */
export const replaceComment = (s: string): string => {
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
 * Replace each nonempty sequence of white-space characters to one space character other than new-line
 *
 * @param {string} s source string
 * @returns {string}
 */
export const replaceWhiteSpaceSequence = (s: string): string => {
    let r = ''
    const replaceSet = _.filter(WhiteSpace.set, o => o !== '\n')
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
