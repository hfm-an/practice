(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Hfm"] = factory();
	else
		root["Hfm"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	* @Author : Amnhh
	* @Date : 2018/10/17
	* @Email : amnhhlod@163.com
	* @Description :
	*/
	'use strict';
	
	exports.__esModule = true;
	exports['default'] = Hfm;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _observe = __webpack_require__(1);
	
	var _observe2 = _interopRequireDefault(_observe);
	
	var _domResolve = __webpack_require__(4);
	
	var _domResolve2 = _interopRequireDefault(_domResolve);
	
	function Hfm(opt) {
	    this.$opt = opt;
	    this.$data = opt.data;
	
	    // 观察每个属性值
	    _observe2['default'](this.$data);
	
	    // 解析 dom
	    new _domResolve2['default'](this.$opt.el, this);
	}
	
	module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @Author : Amnhh
	 * @Date : 2018/10/17
	 * @Email : amnhhlod@163.com
	 * @Description :
	 */
	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _dep = __webpack_require__(2);
	
	var _dep2 = _interopRequireDefault(_dep);
	
	var _utils = __webpack_require__(3);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	function observe(data) {
	    new Observe(data);
	}
	
	/**
	 * 观察者构造函数
	 * @param data
	 * @constructor
	 */
	function Observe(data) {
	    this.data = data;
	    this.init();
	}
	
	var proto = Observe.prototype;
	
	/**
	 * 初始化这些数据，设置属性的 getter 和 setter
	 */
	proto.init = function () {
	    var _this = this;
	
	    var _data = this.data;
	    // 每个属性都为他们设置 getter 和 setter
	    Object.keys(this.data).map(function (key) {
	        _this.defineReactive(key, _data, _data[key]);
	    });
	};
	
	proto.defineReactive = function (key, data, val) {
	    var value = val;
	    var dep = new _dep2['default']();
	    // 如果一级属性是一个对象的话，则将他的属性也设置 getter 和 setter
	    if (_utils2['default'].isObject(val)) {
	        observe(val);
	    }
	    Object.defineProperty(data, key, {
	        /**
	         * 当一个属性在页面里被 get 的时候，说明页面里的某个 dom 元素或者指令，依赖这个属性
	         * 所以依赖的收集是在 get 中进行
	         * @returns {*}
	         */
	        get: function get() {
	            if (_dep2['default'].target) {
	                dep.depend();
	            }
	            // 订阅者的收集
	            return value;
	        },
	        /**
	         * 观察-订阅的这种模式中，
	         * 如果属性改变，就需要通知每一个订阅者，触发订阅者相关的方法
	         * @param newValue
	         */
	        set: function set(newValue) {
	            value = newValue;
	            // 属性被重新赋值的时候，通知订阅者执行相应的方法
	            dep.notify();
	        }
	    });
	};
	
	exports['default'] = observe;
	module.exports = exports['default'];

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	/**
	 * @Author : Amnhh
	 * @Date : 2018/10/17
	 * @Email : amnhhlod@163.com
	 * @Description :
	 */
	"use strict";
	
	exports.__esModule = true;
	function Dep() {
	    // 依赖列表
	    this.subs = [];
	}
	
	var proto = Dep.prototype;
	
	proto.depend = function () {
	    this.addSub(Dep.target);
	};
	
	proto.addSub = function (watcher) {
	    this.subs.push(watcher);
	};
	
	proto.notify = function () {
	    this.subs.map(function (sub) {
	        sub.update();
	    });
	};
	
	exports["default"] = Dep;
	module.exports = exports["default"];

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	/**
	 * @Author : Amnhh
	 * @Date : 2018/10/17
	 * @Email : amnhhlod@163.com
	 * @Description :
	 */
	'use strict';
	
	exports.__esModule = true;
	var utils = {};
	
	/**
	 * 状态检查函数
	 */
	var TYPE_NAMES = ['String', 'Number', 'Object', 'Array', 'Boolean', 'Null', 'Undefined'];
	
	TYPE_NAMES.map(function (type) {
	    utils['is' + type] = function (val) {
	        return Object.prototype.toString.call(val) === '[object ' + type + ']';
	    };
	});
	
	/**
	 * 检测是否是 dom element
	 * @param node
	 * @returns {boolean}
	 */
	utils.isElementNode = function (node) {
	    return node.nodeType === 1;
	};
	
	utils.isTextNode = function (node) {
	    return node.nodeType === 3;
	};
	
	exports['default'] = utils;
	module.exports = exports['default'];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * 解析 dom
	 * @param el dom 的选择器
	 * @param vm 我们解析了 dom 需要和 vm.$data 挂钩，所以 vm 也需要传入
	 * @constructor
	 */
	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _utils = __webpack_require__(3);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	var _resolveUtil = __webpack_require__(5);
	
	var _resolveUtil2 = _interopRequireDefault(_resolveUtil);
	
	function DomResolve(el, vm) {
	    this.vm = vm;
	    this.data = vm.$data;
	
	    // 确保 el 为 dom 元素
	    if (!_utils2['default'].isElementNode(el)) {
	        el = document.querySelector(el);
	    }
	    this.$el = el;
	
	    // 先拷贝出来一份 $el, 在内存里处理和完成绑定之后，再覆盖回去
	    var fragment = document.createDocumentFragment();
	    fragment = this.$el.cloneNode(true);
	    this.$fragment = fragment;
	
	    // 将所有绑定全都在 fragment 上执行一遍
	    this.initResolve();
	    // 然后移除 #app
	    document.body.removeChild(this.$el);
	    // 再往 body 里把 fragment 的 #app 填充进去
	    document.body.appendChild(this.$fragment);
	}
	
	var proto = DomResolve.prototype;
	
	proto.initResolve = function () {
	    var _this = this;
	
	    var childs = this.$fragment.childNodes;
	    var BRACKET_REG = /\{\{(.*)\}\}/;[].slice.call(childs).map(function (node) {
	        if (_utils2['default'].isTextNode(node) && BRACKET_REG.test(node.textContent)) {
	            _this.resolveTextNode(node, node.textContent.replace('{{', '').replace('}}', '').replace(/\s/g, ''));
	        } else if (_utils2['default'].isElementNode(node)) {
	            _this.resolveElementNode(node);
	        }
	    });
	};
	
	/**
	 * 解析文本节点
	 * @param node
	 * @param propertyName
	 */
	proto.resolveTextNode = function (node, propertyName) {
	    _resolveUtil2['default'].text(node, propertyName, this.vm);
	};
	
	/**
	 * 解析 element 节点
	 * @param node
	 */
	proto.resolveElementNode = function (node) {
	    var _this2 = this;
	
	    var attributes = [].slice.call(node.attributes);
	    var DIRECTIVE_REG = /^v-/;
	    attributes.map(function (attribute) {
	        var name = attribute.name;
	        // 说明是内置指令
	        if (DIRECTIVE_REG.test(name)) {
	            var directiveName = name.replace(/^v-/, '');
	            _this2['resolve' + (directiveName[0].toUpperCase() + directiveName.slice(1)) + 'Node'](node, attribute.value);
	            // 删除指令对应的 dom attribute
	            node.removeAttribute(name);
	        }
	    });
	};
	
	exports['default'] = DomResolve;
	module.exports = exports['default'];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @Author : Amnhh
	 * @Date : 2018/10/17
	 * @Email : amnhhlod@163.com
	 * @Description :
	 */
	
	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _resolveReducers = __webpack_require__(6);
	
	var _resolveReducers2 = _interopRequireDefault(_resolveReducers);
	
	var _watcher = __webpack_require__(7);
	
	var _watcher2 = _interopRequireDefault(_watcher);
	
	var resolveUtil = {
	    text: function text(node, propertyName, vm) {
	        this.bind(node, propertyName, 'text', vm);
	    },
	    bind: function bind(node, propertyName, type, vm) {
	        var reducerFunction = _resolveReducers2['default'][type + 'Reducer'];
	        reducerFunction(node, this.getValue(propertyName, vm));
	        new _watcher2['default'](vm, propertyName, function (newValue) {
	            reducerFunction(node, newValue);
	        });
	    },
	    /**
	     * 这一步没有执行依赖的收集，只是单纯的替换文本
	     */
	    getValue: function getValue(propertyName, vm) {
	        return vm.$data[propertyName];
	    }
	};
	
	exports['default'] = resolveUtil;
	module.exports = exports['default'];

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	/**
	 * @Author : Amnhh
	 * @Date : 2018/10/17
	 * @Email : amnhhlod@163.com
	 * @Description :
	 */
	"use strict";
	
	exports.__esModule = true;
	exports["default"] = {
	    textReducer: function textReducer(node, value) {
	        node.textContent = value;
	    }
	};
	module.exports = exports["default"];

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @Author : Amnhh
	 * @Date : 2018/10/17
	 * @Email : amnhhlod@163.com
	 * @Description :
	 */
	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _dep = __webpack_require__(2);
	
	var _dep2 = _interopRequireDefault(_dep);
	
	// let id = 1
	
	function Watcher(vm, propertyName, cb) {
	    // this.id = id ++
	    this.vm = vm;
	    this.cb = cb;
	    this.depMap = {};
	
	    this.getter = this.getterFactory(propertyName);
	    this.value = this.getValue();
	}
	
	var proto = Watcher.prototype;
	
	/**
	 * 用于获取绑定依赖
	 * 如果说我们获取这个 value，则说明这个 watcher 对应的那一个 v-text 是依赖于这个 property name 的
	 * 所以我们就在这个函数里将这个 watcher 添加到这个 propertyName 对应的 dep 的订阅列表中
	 *
	 * 而下一次 propertyName 对应的数据发生变化的时候，我们则可以直接通过 getter 去拿到新的值去更新视图
	 * 防止多次依赖的添加
	 * @returns {*}
	 */
	proto.getValue = function () {
	    _dep2['default'].target = this;
	    var value = this.getter();
	    _dep2['default'].target = null;
	    return value;
	};
	
	/**
	 * 生产一个 getter 函数，用于获取属性的值
	 * @param propertyName
	 * @returns {Function}
	 */
	proto.getterFactory = function (propertyName) {
	    var _self = this;
	    return function () {
	        return _self.vm.$data[propertyName];
	    };
	};
	
	// proto.addDep = function (dep) {
	//     if (!this.depMap[dep.id]) {
	//         this.depMap[dep.id] = true
	//         dep.addSub(this)
	//     }
	// }
	
	/**
	 * 因为后续 update 值，都是直接获取的属性，而并没有 getValue 的值
	 * 所以不会触发多次收集依赖
	 */
	proto.update = function () {
	    this.value = this.getter();
	    this.cb(this.value);
	};
	
	exports['default'] = Watcher;
	module.exports = exports['default'];

/***/ })
/******/ ])
});
;
//# sourceMappingURL=hfm.js.map