/*
 * @Author: yeongjet
 * @CreatedAt: 2020-03-06 21:28:04
 * @UpdatedAt: 2020-03-07 15:21:56
 * @Description: Do not edit
 */

import R from 'ramda'
import { DFA } from './definition'

const parse = (dfa: DFA) => {
    R.map(n => {
        n.parent = dfa
        parse(n)
    }, dfa.child)
}

const yq0 = (iek: string, dfa: DFA) => {
    const 
}
