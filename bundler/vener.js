(function (modules) {
    function require (id) {
        const [fn, idMapping] = modules[id];

        function childRequire (filename) {
            return require(idMapping[filename]);
        }

        const newModule = {exports: {}};
        fn(childRequire, newModule, newModule.exports);
        return newModule.exports
    }

    require(0);
})({
    0: [
        function (require, module, exports) {
            "use strict";

            var _varible = require("./varible.js");

            var _varible2 = _interopRequireDefault(_varible);

            var _funcs = require("./funcs.js");

            function _interopRequireDefault (obj) {
                return obj && obj.__esModule ? obj : {default: obj};
            }

            console.log((0, _funcs.resolveVar)(_varible2.default.a));
            console.log((0, _funcs.resolveVar)(_varible2.default.b));
            console.log((0, _funcs.resolveVar)(_varible2.default.c));
        },
        {"./varible.js": 1, "./funcs.js": 2},
    ], 1: [
        function (require, module, exports) {
            "use strict";

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            /**
             * @Author : Amnhh
             * @Date : 2018/10/31
             * @Email : amnhhlod@163.com
             * @Description : 变量声明
             */
            exports.default = {
                // module.exports = {
                a: 1,
                b: 2,
                c: 3
            };
        },
        {},
    ], 2: [
        function (require, module, exports) {
            "use strict";

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.resolveVar = resolveVar;

            /**
             * @Author : Amnhh
             * @Date : 2018/10/31
             * @Email : amnhhlod@163.com
             * @Description : 函数定义
             */
            function resolveVar (_varible) {
                return _varible + " is resolved now";
            }
        },
        {},
    ],
});
