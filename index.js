const { Lang, parse } = require('@ast-grep/napi')

const str = `
const obj = {
  a: 1,
  b: 2,
  c: {
    d: 3,
    e: 4,
    f: {
      g: 5,
      h: 6
    }
  },
  i:{
    j: 7,
    k: 8
  }
}
`

const rule = {
  rule: {
    kind: 'object',
    pattern: '$O',
    not: {
      inside: {
        kind: 'object',
        stopBy: 'end',
      }
    }
  }
}
const rule1 = {
  rule: {
    kind: 'pair',
    all: [
      {
        has: {
          field: 'key',
          regex: '^c$'
        }
      },
      {
        has: {
          field: 'value',
          pattern: '$$$C'
        }
      }
    ]
  }
}
const ast = parse(Lang.JavaScript, str)
const root = ast.root()
const parent = root.find(rule)
const children = parent.find(rule1)
console.log('==>', children.text())
const subObj = children.find(rule)
console.log('==>', subObj) // why it's empty?