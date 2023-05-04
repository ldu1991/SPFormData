/*!
 * SPFormData 4.1.0
 * VanillaJS (pure JavaScript) plugin that reads form data and Change URL Query Parameters
 * https://github.com/ldu1991/sp-form-data/#readme
 *
 * Copyright 2022 Denis Lipatov <ldu2601@gmail.com>
 *
 * Released under the BSD License
 *
 * Released on: May 04, 2023
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("SPFormData", [], factory);
	else if(typeof exports === 'object')
		exports["SPFormData"] = factory();
	else
		root["SPFormData"] = factory();
})(self, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ core; }
});

;// CONCATENATED MODULE: ./src/helpers/utils.js
function isNode(x) {
  return typeof x === 'object' && x !== null && x.nodeType !== undefined && x.nodeName !== undefined && window.Node.prototype.isPrototypeOf(x);
}
function isNodeList(x) {
  var prototypeToString = Object.prototype.toString.call(x);
  var regex = /^\[object (HTMLCollection|NodeList|Object)]$/;
  return typeof window.NodeList === 'object' ? x instanceof window.NodeList : x !== null && typeof x === 'object' && typeof x.length === 'number' && regex.test(prototypeToString) && (x.length === 0 || isNode(x[0]));
}
function isValid(str) {
  return /^[|,]+$/.test(str);
}
function isEmpty(value) {
  return typeof value !== 'string' || !value || !value.trim();
}
function isObject(obj) {
  return obj !== null && Object.getOwnPropertyNames(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype;
}

;// CONCATENATED MODULE: ./src/helpers/convertToArray.js

var convertToArray = function convertToArray(elements) {
  if (Array.isArray(elements)) {
    return elements.filter(isNode);
  }
  if (isNode(elements)) {
    return [elements];
  }
  if (isNodeList(elements)) {
    return Array.from(elements);
  }
  if (typeof elements === 'string') {
    var query = document.querySelectorAll(elements);
    return Array.from(query);
  }
  return [];
};
/* harmony default export */ var helpers_convertToArray = (convertToArray);
;// CONCATENATED MODULE: ./src/helpers/serializeArray.js

var serializeArray = function serializeArray(formElement) {
  var formData = new FormData(formElement);
  var pairs = [];
  formData.forEach(function (value, name) {
    if (!isEmpty(value) && formElement.querySelector("[name=\"".concat(name, "\"]")).type !== 'file') {
      pairs.push({
        name,
        value
      });
    }
  });
  return pairs;
};
/* harmony default export */ var helpers_serializeArray = (serializeArray);
;// CONCATENATED MODULE: ./src/helpers/normalizeArray.js
var normalizeArray = function normalizeArray(arrDataForm, separator) {
  var result = {};
  arrDataForm.forEach(function (item) {
    if (!result.hasOwnProperty(item.name)) {
      result[item.name] = encodeURIComponent(item.value.replace(/ /g, '+'));
    } else {
      result[item.name] += separator + encodeURIComponent(item.value.replace(/ /g, '+'));
    }
  });
  return result;
};
/* harmony default export */ var helpers_normalizeArray = (normalizeArray);
;// CONCATENATED MODULE: ./src/helpers/defaults.js
/* harmony default export */ var defaults = ({
  init: true,
  separator: ',',
  delayBeforeSend: 300,
  autoSubmit: true,
  changeQueryParameters: true,
  presetQueries: [],
  multipleArray: true,
  secondForm: null
});
;// CONCATENATED MODULE: ./src/core.js
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }





var _submitTimeout = /*#__PURE__*/new WeakMap();
var _eventsListeners = /*#__PURE__*/new WeakMap();
var _innerPresetQueries = /*#__PURE__*/new WeakMap();
var _secondForm = /*#__PURE__*/new WeakMap();
var _searchParams = /*#__PURE__*/new WeakSet();
var _changeQueryParameters = /*#__PURE__*/new WeakSet();
var _noChangeQueryParameters = /*#__PURE__*/new WeakSet();
var _activateForm = /*#__PURE__*/new WeakSet();
var _clear = /*#__PURE__*/new WeakSet();
var _submit = /*#__PURE__*/new WeakSet();
var _autoSubmit = /*#__PURE__*/new WeakSet();
var _popstate = /*#__PURE__*/new WeakSet();
var _searchParamsDefined = /*#__PURE__*/new WeakSet();
var _emit = /*#__PURE__*/new WeakSet();
var SPFormData = /*#__PURE__*/function () {
  function SPFormData() {
    var _this = this;
    _classCallCheck(this, SPFormData);
    _classPrivateMethodInitSpec(this, _emit);
    _classPrivateMethodInitSpec(this, _searchParamsDefined);
    _classPrivateMethodInitSpec(this, _popstate);
    _classPrivateMethodInitSpec(this, _autoSubmit);
    _classPrivateMethodInitSpec(this, _submit);
    _classPrivateMethodInitSpec(this, _clear);
    _classPrivateMethodInitSpec(this, _activateForm);
    _classPrivateMethodInitSpec(this, _noChangeQueryParameters);
    _classPrivateMethodInitSpec(this, _changeQueryParameters);
    _classPrivateMethodInitSpec(this, _searchParams);
    _classPrivateFieldInitSpec(this, _submitTimeout, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _eventsListeners, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _innerPresetQueries, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _secondForm, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldSet(this, _submitTimeout, true);
    _classPrivateFieldSet(this, _eventsListeners, {});
    _classPrivateFieldSet(this, _innerPresetQueries, []);
    _classPrivateFieldSet(this, _secondForm, null);
    var el;
    var _params;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === 'Object') {
      _params = args[0];
    } else {
      el = args[0];
      _params = args[1];
    }
    if (!_params) _params = {};
    this.params = _objectSpread(_objectSpread({}, defaults), _params);
    this.elements = helpers_convertToArray(el);
    if (!this.elements.length) return;
    if (this.params.secondForm) {
      _classPrivateFieldSet(this, _secondForm, helpers_convertToArray(this.params.secondForm));
      this.elements = [].concat(_toConsumableArray(helpers_convertToArray(el)), _toConsumableArray(_classPrivateFieldGet(this, _secondForm)));
    }
    if (this.params.presetQueries !== undefined && !Array.isArray(this.params.presetQueries)) throw new Error('"presetQueries" parameter must be an Array');
    _classPrivateFieldSet(this, _innerPresetQueries, this.params.presetQueries);
    if (_classPrivateFieldGet(this, _innerPresetQueries) === undefined || !_classPrivateFieldGet(this, _innerPresetQueries).length) {
      this.params.presetQueries = [];
      this.elements.forEach(function (formElement) {
        if (formElement.tagName !== 'FORM') throw new Error('SPFormData constructor must be passed a FORM element');
        formElement.querySelectorAll('[name]').forEach(function (element) {
          if (element.type !== 'file') {
            if (!_this.params.presetQueries.includes(element.name)) {
              _this.params.presetQueries.push(element.name);
            }
          }
        });
      });
    }
    if (!isValid(this.params.separator)) this.params.separator = defaults.separator;
    if (this.params && this.params.on) {
      Object.keys(this.params.on).forEach(function (eventName) {
        _this.on(eventName, _this.params.on[eventName]);
      });
    }
    this.query = null;
    if (this.params.init) {
      this.init();
    }
  }
  _createClass(SPFormData, [{
    key: "on",
    value: function on(events, handler, priority) {
      var self = this;
      if (!_classPrivateFieldGet(self, _eventsListeners)) return self;
      if (typeof handler !== 'function') return self;
      var method = priority ? 'unshift' : 'push';
      events.split(' ').forEach(function (event) {
        if (!_classPrivateFieldGet(self, _eventsListeners)[event]) _classPrivateFieldGet(self, _eventsListeners)[event] = [];
        _classPrivateFieldGet(self, _eventsListeners)[event][method](handler);
      });
      return self;
    }
  }, {
    key: "once",
    value: function once(events, handler, priority) {
      var self = this;
      if (!_classPrivateFieldGet(self, _eventsListeners)) return self;
      if (typeof handler !== 'function') return self;
      function onceHandler(query) {
        self.off(events, onceHandler);
        if (onceHandler.emitterProxy) {
          delete onceHandler.emitterProxy;
        }
        handler.call(self, query);
      }
      onceHandler.emitterProxy = handler;
      return self.on(events, onceHandler, priority);
    }
  }, {
    key: "off",
    value: function off(events, handler) {
      var self = this;
      if (!_classPrivateFieldGet(self, _eventsListeners)) return self;
      events.split(' ').forEach(function (event) {
        if (typeof handler === 'undefined') {
          _classPrivateFieldGet(self, _eventsListeners)[event] = [];
        } else if (_classPrivateFieldGet(self, _eventsListeners)[event]) {
          _classPrivateFieldGet(self, _eventsListeners)[event].forEach(function (eventHandler, index) {
            if (eventHandler === handler || eventHandler.emitterProxy && eventHandler.emitterProxy === handler) {
              _classPrivateFieldGet(self, _eventsListeners)[event].splice(index, 1);
            }
          });
        }
      });
      return self;
    }
  }, {
    key: "update",
    value: function update() {
      if (!this.elements.length) return;
      _classPrivateMethodGet(this, _activateForm, _activateForm2).call(this);
      _classPrivateMethodGet(this, _emit, _emit2).call(this, 'update');
    }
  }, {
    key: "reset",
    value: function reset() {
      if (!this.elements.length) return;
      this.elements.forEach(function (formElement) {
        formElement.reset();
      });
      _classPrivateMethodGet(this, _activateForm, _activateForm2).call(this);
      _classPrivateMethodGet(this, _clear, _clear2).call(this);
      _classPrivateMethodGet(this, _emit, _emit2).call(this, 'reset');
    }
  }, {
    key: "setValue",
    value: function setValue(name, value) {
      if (!this.elements.length) return;
      var element;
      if (typeof name === 'string') {
        this.elements.forEach(function (formElement) {
          var nameElement = formElement.querySelector("[name=\"".concat(name, "\"]"));
          if (nameElement) element = nameElement;
        });
      } else if (isNode(name)) {
        element = name;
      }
      if (element && (element.type !== 'checkbox' || element.type !== 'radio' || element.type !== 'file')) {
        if (value) {
          element.value = value;
        } else {
          throw new Error('setValue(name, value) "value" is required!');
        }
        this.update();
      }
    }
  }, {
    key: "setChecked",
    value: function setChecked(name, value) {
      if (!this.elements.length) return;
      var element;
      if (typeof name === 'string') {
        this.elements.forEach(function (formElement) {
          var nameElement;
          if (value) {
            nameElement = formElement.querySelector("[name=\"".concat(name, "\"][value=\"").concat(value, "\"]"));
          } else {
            throw new Error('setChecked(name, value) "value" is required if string name is used!');
          }
          if (nameElement) element = nameElement;
        });
      } else if (isNode(name)) {
        element = name;
      }
      if (element && (element.type === 'checkbox' || element.type === 'radio')) {
        element.checked = true;
        this.update();
      }
    }
  }, {
    key: "init",
    value: function init() {
      if (!this.elements.length) return;
      _classPrivateMethodGet(this, _emit, _emit2).call(this, 'beforeInit', false);
      _classPrivateMethodGet(this, _submit, _submit2).call(this);
      if (this.params.autoSubmit) {
        _classPrivateMethodGet(this, _autoSubmit, _autoSubmit2).call(this);
      }
      _classPrivateMethodGet(this, _popstate, _popstate2).call(this);
      _classPrivateMethodGet(this, _searchParamsDefined, _searchParamsDefined2).call(this);
      _classPrivateMethodGet(this, _emit, _emit2).call(this, 'init');
      _classPrivateMethodGet(this, _emit, _emit2).call(this, 'afterInit', false);
    }
  }]);
  return SPFormData;
}();
function _searchParams2() {
  var _this2 = this;
  if (this.params.changeQueryParameters) {
    var params = new URLSearchParams(window.location.search);
    var query = {};
    params.forEach(function (value, key) {
      var _this2$params = _this2.params,
        multipleArray = _this2$params.multipleArray,
        separator = _this2$params.separator;
      if (!isEmpty(value)) {
        if (multipleArray) {
          if (value.indexOf(separator) !== -1) {
            query[key] = value.replace(/\+/g, ' ').split(separator);
          } else {
            query[key] = value.replace(/\+/g, ' ');
          }
        } else {
          query[key] = value.replace(/\+/g, ' ');
        }
      }
    });
    this.query = !isObject(query) ? query : null;
  }
}
function _changeQueryParameters2(arr) {
  if (!isObject(arr)) {
    var loc = new URL(window.location);
    var presetQueries = this.params.presetQueries;

    // Delete
    Object.keys(arr).forEach(function (key) {
      loc.searchParams.forEach(function (value, name) {
        if (name !== key) loc.searchParams.delete(name);
      });
    });

    // Add
    presetQueries.forEach(function (key) {
      if (arr.hasOwnProperty(key)) {
        loc.searchParams.set(key, arr[key]);
      }
    });
    var url = decodeURIComponent(loc.href);
    window.history.pushState({}, '', url);
    _classPrivateMethodGet(this, _searchParams, _searchParams2).call(this);
  } else {
    _classPrivateMethodGet(this, _clear, _clear2).call(this);
  }
  _classPrivateMethodGet(this, _emit, _emit2).call(this, 'change');
}
function _noChangeQueryParameters2(arr) {
  var _this3 = this;
  if (!isObject(arr)) {
    var query = {};
    Object.keys(arr).forEach(function (pair) {
      if (!isEmpty(arr[pair])) {
        if (_this3.params.multipleArray) {
          if (arr[pair].indexOf(_this3.params.separator) !== -1) {
            query[pair] = decodeURIComponent(arr[pair]).replace(/\+/g, ' ').split(_this3.params.separator);
          } else {
            query[pair] = decodeURIComponent(arr[pair]).replace(/\+/g, ' ');
          }
        } else {
          query[pair] = decodeURIComponent(arr[pair]).replace(/\+/g, ' ');
        }
      }
    });
    this.query = query;
  } else {
    _classPrivateMethodGet(this, _clear, _clear2).call(this);
  }
  _classPrivateMethodGet(this, _emit, _emit2).call(this, 'change');
}
function _activateForm2() {
  var _this4 = this;
  var result = {};
  this.elements.forEach(function (formElement) {
    var arrDataForm = helpers_serializeArray(formElement);
    if (arrDataForm.length) {
      result = _objectSpread(_objectSpread({}, result), helpers_normalizeArray(arrDataForm, _this4.params.separator));
    } else {
      _classPrivateMethodGet(_this4, _clear, _clear2).call(_this4);
    }
  });
  if (this.params.changeQueryParameters) {
    _classPrivateMethodGet(this, _changeQueryParameters, _changeQueryParameters2).call(this, result);
  } else {
    _classPrivateMethodGet(this, _noChangeQueryParameters, _noChangeQueryParameters2).call(this, result);
  }
}
function _clear2() {
  if (this.params.changeQueryParameters) {
    window.history.pushState({}, '', '.');
  }
  this.query = null;
}
function _submit2() {
  var _this5 = this;
  var self = this;
  self.elements.forEach(function (formElement) {
    formElement.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!self.params.autoSubmit) {
        for (var target = event.target; target && target !== _this5; target = target.parentNode) {
          if (self.params.secondForm && !_classPrivateFieldGet(self, _secondForm).includes(target)) {
            _classPrivateFieldGet(self, _secondForm).forEach(function (secondFormElement) {
              secondFormElement.reset();
            });
          }
        }
        _classPrivateMethodGet(self, _activateForm, _activateForm2).call(self);
        _classPrivateMethodGet(self, _emit, _emit2).call(self, 'submit');
      }
    });
  });
}
function _autoSubmit2() {
  var _this6 = this;
  var self = this;
  self.elements.forEach(function (formElement) {
    var nameElements = '[name]';
    if (_classPrivateFieldGet(self, _innerPresetQueries) !== undefined) {
      var presetQueries = self.params.presetQueries;
      var inputElements = [];
      presetQueries.forEach(function (key) {
        inputElements.push("[name=\"".concat(key, "\"]"));
      });
      nameElements = inputElements.join(',');
    }
    formElement.addEventListener('change', function (event) {
      for (var target = event.target; target && target !== _this6; target = target.parentNode) {
        if (target.matches(nameElements)) {
          if (target.type !== 'file') {
            if (_this6.params.secondForm && !_classPrivateFieldGet(_this6, _secondForm).includes(target.form)) {
              _classPrivateFieldGet(_this6, _secondForm).forEach(function (secondFormElement) {
                secondFormElement.reset();
              });
            }
            if (_classPrivateFieldGet(self, _submitTimeout)) clearTimeout(_classPrivateFieldGet(self, _submitTimeout));
            _classPrivateFieldSet(self, _submitTimeout, setTimeout(function () {
              _classPrivateMethodGet(self, _activateForm, _activateForm2).call(self);
            }, self.params.delayBeforeSend));
          }
          break;
        }
      }
    }, true);
  });
}
function _popstate2() {
  var _this7 = this;
  window.addEventListener('popstate', function () {
    if (!isEmpty(window.location.search)) {
      _classPrivateMethodGet(_this7, _searchParams, _searchParams2).call(_this7);
    } else {
      _classPrivateMethodGet(_this7, _clear, _clear2).call(_this7);
    }
    _classPrivateMethodGet(_this7, _emit, _emit2).call(_this7, 'popstate');
  });
}
function _searchParamsDefined2() {
  if (!isEmpty(window.location.search)) {
    _classPrivateMethodGet(this, _searchParams, _searchParams2).call(this);
  }
}
function _emit2(events) {
  var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var self = this;
  var data = query ? self.query : '';
  if (!_classPrivateFieldGet(self, _eventsListeners)) return self;
  var eventsArray = Array.isArray(events) ? events : events.split(' ');
  eventsArray.forEach(function (event) {
    if (_classPrivateFieldGet(self, _eventsListeners) && _classPrivateFieldGet(self, _eventsListeners)[event]) {
      _classPrivateFieldGet(self, _eventsListeners)[event].forEach(function (eventHandler) {
        eventHandler.call(self, data);
      });
    }
  });
  return self;
}
/* harmony default export */ var core = (SPFormData);
__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});