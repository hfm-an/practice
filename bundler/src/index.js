const {readFileSync, writeFileSync} = require('fs')
const path = require('path')
const traverse = require('babel-traverse').default
const {transformFromAst, transform} = require('babel-core')

// auto increase id
let _id = 0

const currentPath = process.cwd()

function parseFile (path) {
    console.log(path)
    const fileCode = readFileSync(path, 'utf-8')
    const ast = transform(fileCode).ast
    const dep = []

    traverse(ast, {
        /**
         * 每次解析到 Import 声明语句的时候，会进入到这个函数里
         * @param path
         * @constructor
         */
        ImportDeclaration (path) {
            // 获取到js的依赖路径
            const depPath = path.node.source.value
            dep.push(depPath)
        }
    })

    const es5Code = transformFromAst(ast, null, {
        presets: ['env']
    }).code


    const customCode = loader(path, es5Code)

    // 最后模块导出
    return {
        id: _id++,
        code: customCode,
        dep,
        path
    }
}

function parseGraph (entry) {
    // 从入口文件收集到的模块 id, 模块解析成 es5 之后的代码，模块的依赖以及模块本身的路径
    const entryData = parseFile(path.resolve(currentPath, entry))
    const graph = [entryData]

    for (const _data of graph) {
        // id 缓存到每个模块的对象中
        if (!_data.idMapping) _data.idMapping = {}

        const dirname = path.dirname(_data.path)

        _data.dep.map(_dep => {
            // 获取这个依赖的绝对路径
            const _path = path.resolve(dirname, _dep)

            // 解析依赖
            const denpendencyData = parseFile(_path)

            // 获取唯一 id
            const id = denpendencyData.id

            // 记录 id
            _data.idMapping[_dep] = denpendencyData.id

            // 将解析的模块推入 graph 中去
            graph.push(denpendencyData)
        })
    }

    return graph
}

function build (graph) {
    let _buildCode = ''

    graph.map(_data => {
        _buildCode += `${_data.id} : [
            function(require,module,exports){${_data.code}},
            ${JSON.stringify(_data.idMapping)},
        ],`
    })

    const wrap = `
        (function(modules) {
            function require(id) {
                const [fn, idMapping] = modules[id];
                function childRequire(filename) {
                return require(idMapping[filename]);
            }
            const newModule = {exports: {}};
            fn(childRequire, newModule, newModule.exports);
            return newModule.exports
        }
        require(0);
      })({${_buildCode}});` // 注意这里需要给 modules 加上一个 {}
    return wrap
}

function loader (filename, code) {
    console.log('loader 代码被执行了')
    return code
}

module.exports = entry => {
    const graph = parseGraph(entry)
    const bundle = build(graph)
    return bundle
}

