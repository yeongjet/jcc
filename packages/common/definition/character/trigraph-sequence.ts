/* eslint-disable quotes */
import R from 'ramda'

export const trigraphSequenceMapper = {
    ['??=']: '#',
    ['??(']: '[',
    ['??/']: '\\',
    ['??)']: ']',
    ["??'"]: '^',
    ['??<']: '{',
    ['??!']: '|',
    ['??>']: '}',
    ['??-']: '~'
}

export const trigraphSequence = R.keys(trigraphSequenceMapper)
