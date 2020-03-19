export interface DFA {
    include?: string[]
    exclude?: string[]
    forward: number
    accept?: string
    pass?: boolean
    child?: DFA[]
    parent?: DFA
}
