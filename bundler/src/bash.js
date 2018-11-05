const vm = require('vm')

const bundler = require('./index')

const vender = bundler(process.argv[2])

vm.runInThisContext(vender)
console.log(vender)