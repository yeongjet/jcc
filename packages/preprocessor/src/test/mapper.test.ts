/* eslint-disable quotes */
import R from 'ramda'
import fs from 'fs-extra'
import path from 'path'
import { mock } from 'mockjs'
import countLine from 'count-lines'
import {
    splice,
    mapNewLine,
    mapComment,
    mapTrigraphSequence,
    mapWhiteSpaceSequence
} from '../mapper'
import {
    trigraphSequence,
    trigraphSequenceMapper
} from '@jcc/common/definition'
import { mockSchema } from './mock-data'

const getRandomString = (number, mockArray) => {
    const randomArray = mock({
        [`array|${number}`]: mockArray
    }).array
    const randomString = R.flatten(randomArray)
        .sort((a, b) => (Math.random() > 0.5 ? -1 : 1))
        .join('')
    return randomString
}

const getFirstQuoteIndex = s => {
    const quote = ["'", '"']
    const n = s.indexOf(quote[0])
    const m = s.indexOf(quote[1])
    if (n < 0 && m < 0) {
        return -1
    } else if (n > 0 && m > 0) {
        return n > m ? m : n
    } else if (n < 0 && m > 0) {
        return m
    } else if (m < 0 && n > 0) {
        return n
    } else if (n === 0 || m === 0) {
        return 0
    }
}

const getQuoteString = s => {
    const start = getFirstQuoteIndex(s)
    if (start < 0) {
        return -1
    }
    const terminate = s[start]
    s = s.substring(start + 1)
    const end = s.indexOf(terminate)
    if (end >= 0) {
        return s.substring(0, end)
    } else {
        return -1
    }
}

const spliceSourceByQuote = s => {
    const santence: any = []
    const func = p => {
        const fristQuoteIndex = getFirstQuoteIndex(p)
        if (fristQuoteIndex < 0) {
            santence.push({ type: 'non-string', string: p })
            return
        }
        const noquoteString = p.substring(0, fristQuoteIndex)
        const quoteString = getQuoteString(p)
        if (noquoteString !== '') {
            santence.push({ type: 'non-string', string: noquoteString })
        }
        if (quoteString === -1) {
            santence.push({
                type: 'non-string',
                string: p.substring(fristQuoteIndex)
            })
            return
        }
        santence.push({ type: 'string', string: quoteString })
        p = p.substring(fristQuoteIndex + quoteString.length + 2, p.length)
        func(p)
    }
    func(s)
    return santence
}

const getStringContext = (s, start, length) => {
    let r = ''
    for (let i = 0; i < length; i++) {
        r += s[start - (length - i)]
    }
    for (let i = 0; i < length; i++) {
        r += s[start + i]
    }
    return r
}

const getCountOfCharInString = (str1, str2) => {
    const r = new RegExp(str2, 'gi')
    const match = str1.match(r)
    return match ? match.length : 0
}

test('mapNewLine', () => {
    const randomString = getRandomString(300, mockSchema)
    const resultString = mapNewLine(randomString)
    const expectString = randomString.replace(/\r\n/g, '\n')
    expect(resultString).toEqual(expectString)
})

test('mapTrigraphSequence', () => {
    const randomString = getRandomString(300, mockSchema)
    let expectString = randomString
    const resultString = mapTrigraphSequence(randomString)
    for (let i = 0; i < trigraphSequence.length; i++) {
        const sequenceKey = trigraphSequence[i]
        const sequence = trigraphSequenceMapper[sequenceKey]
        const splitArray = sequenceKey.split('')
        const regExp =
            '\\' + splitArray[0] + '\\' + splitArray[1] + '\\' + splitArray[2]
        expectString = expectString.replace(new RegExp(regExp, 'g'), sequence)
    }
    expect(resultString).toEqual(expectString)
})

test('splice', () => {
    const randomString = getRandomString(300, mockSchema)
    let expectString = randomString
    const resultString = splice(randomString)
    expectString = expectString.replace(new RegExp('\\\\\n', 'g'), '')
    expect(resultString).toEqual(expectString)
})

test('mapComment', () => {
    const randomString = getRandomString(300, mockSchema)
    const resultString = mapComment(randomString)
    const stringArray = spliceSourceByQuote(resultString)
    let isCommentAInString = false
    let isCommentBInString = false
    let isCommentNotInNonString = true
    for (let i = 0; i < stringArray.length; i++) {
        const item = stringArray[i]
        if (item.type === 'string') {
            const leftComment = item.string.indexOf('/*')
            const rightComment = item.string.indexOf('*/')
            if (leftComment >= 0 && rightComment > leftComment) {
                isCommentAInString = true
            }
            if (item.string.indexOf('//') >= 0) {
                isCommentBInString = true
            }
        } else if (item.type === 'non-string') {
            // 源文件最后的可能会分解得到一个引号开头，但没有引号结尾的字符串
            if (i === stringArray.length - 1) {
                continue
            }
            const leftComment = item.string.indexOf('/*')
            const rightComment = item.string.indexOf('*/')
            if (
                (leftComment >= 0 && rightComment > leftComment) ||
                item.string.indexOf('//') >= 0
            ) {
                isCommentNotInNonString = false
            }
        }
    }
    expect(
        isCommentAInString && isCommentBInString && isCommentNotInNonString
    ).toEqual(true)
})

test('mapWhiteSpaceSequence', async () => {
    const pathPrefix = path.join(__dirname, 'out')
    const testString = getRandomString(300, mockSchema)
    const lineCountExpected = await countLine(testString)
    console.log(`expect line count: ${lineCountExpected}`)
    const resultString = mapWhiteSpaceSequence(testString)
    const expectString = testString.replace(/[ \f\r\t\v]/g, ' ')
    const expectFilePath = `${pathPrefix}/mapWhiteSpaceSequence-before.out`
    const resultFilePath = `${pathPrefix}/mapWhiteSpaceSequence-after.out`
    fs.writeFileSync(expectFilePath, testString)
    fs.writeFileSync(resultFilePath, resultString)
    const afterLine = await countLine(resultString)
    console.log(`result line count: ${afterLine}`)
    // fs.unlinkSync(expectFilePath)
    // fs.unlinkSync(resultFilePath)
    expect(
        lineCountExpected === afterLine && resultString.indexOf('  ') < 0
    ).toEqual(true)
})
