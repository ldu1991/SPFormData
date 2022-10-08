/*!
 * SPFormData 2.1.0
 * VanillaJS (pure JavaScript) plugin that reads form data with and Change URL Query Parameters
 * https://github.com/ldu1991/sp-form-data/#readme
 *
 * Copyright 2022 Denis Lipatov <ldu2601@gmail.com>
 *
 * Released under the BSD License
 *
 * Released on: October 08, 2022
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
  return typeof window.Node === 'object' ? x instanceof window.Node : x !== null && typeof x === 'object' && typeof x.nodeType === 'number' && typeof x.nodeName === 'string';
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
  return !value || !/[^\s]+/.test(value);
}

function isObject(obj) {
  return obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype;
}


;// CONCATENATED MODULE: ./src/helpers/convertToArray.js


var convertToArray = function convertToArray(elements) {
  if (elements instanceof Array) {
    return elements.filter(isNode);
  }

  if (isNode(elements)) {
    return [elements];
  }

  if (isNodeList(elements)) {
    return Array.prototype.slice.call(elements);
  }

  if (typeof elements === 'string') {
    try {
      var query = document.querySelectorAll(elements);
      return Array.prototype.slice.call(query);
    } catch (err) {
      return [];
    }
  }

  return [];
};

/* harmony default export */ var helpers_convertToArray = (convertToArray);
;// CONCATENATED MODULE: ./src/helpers/serializeArray.js
var serializeArray = function serializeArray(formElement) {
  var formData = new FormData(formElement);
  var pairs = [];
  formData.forEach(function (value, name) {
    pairs.push({
      name,
      value
    });
  });
  return pairs;
};

/* harmony default export */ var helpers_serializeArray = (serializeArray);
;// CONCATENATED MODULE: ./src/helpers/normalizeArray.js


var normalizeArray = function normalizeArray(arrDataForm, separator) {
  var result = {};
  arrDataForm.forEach(function (item) {
    if (!isEmpty(item.value)) {
      if (!result.hasOwnProperty(item.name)) {
        result[item.name] = item.value;
      } else {
        result[item.name] += separator + item.value;
      }
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
  changeUrlQuery: true,
  formSync: true,
  presetQueries: []
});
;// CONCATENATED MODULE: ./src/core.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }







var _submitTimeout = /*#__PURE__*/new WeakMap();

var _searchParams = /*#__PURE__*/new WeakSet();

var _changeUrlQuery = /*#__PURE__*/new WeakSet();

var _noChangeUrlQuery = /*#__PURE__*/new WeakSet();

var _activateForm = /*#__PURE__*/new WeakSet();

var _sendForm = /*#__PURE__*/new WeakSet();

var _clear = /*#__PURE__*/new WeakSet();

var SPFormData = /*#__PURE__*/function () {
  function SPFormData() {
    _classCallCheck(this, SPFormData);

    _classPrivateMethodInitSpec(this, _clear);

    _classPrivateMethodInitSpec(this, _sendForm);

    _classPrivateMethodInitSpec(this, _activateForm);

    _classPrivateMethodInitSpec(this, _noChangeUrlQuery);

    _classPrivateMethodInitSpec(this, _changeUrlQuery);

    _classPrivateMethodInitSpec(this, _searchParams);

    _classPrivateFieldInitSpec(this, _submitTimeout, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _submitTimeout, true);

    var _el;

    var _params;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === 'Object') {
      _params = args[0];
    } else {
      _el = args[0];
      _params = args[1];
    }

    if (!_params) _params = {};
    this.elements = helpers_convertToArray(_el);

    if (_params.presetQueries === undefined && this.elements.length) {
      _params.presetQueries = [];
      this.elements.forEach(function (formElement) {
        formElement.querySelectorAll('[name]').forEach(function (element) {
          if (!_params.presetQueries.includes(element.name)) {
            _params.presetQueries.push(element.name);
          }
        });
      });
    }

    this.params = _objectSpread(_objectSpread({}, defaults), _params);
    if (!isValid(this.params.separator)) this.params.separator = defaults.separator;
    this.query = null;

    if (this.params.init) {
      this.init();
    }
  }

  _createClass(SPFormData, [{
    key: "on",
    value: function on(data) {
      if (this.elements.length) {
        this.elements.forEach(function (formElement) {
          formElement.addEventListener('spFormData:change', function (event) {
            data(event.detail.query);
          });
        });

        if (this.params.changeUrlQuery && window.location.search !== '') {
          data(this.query);
        }
      }
    }
  }, {
    key: "update",
    value: function update() {
      var _this = this;

      if (this.elements.length) {
        this.elements.forEach(function (formElement) {
          var activateFormElement = _this.params.formSync ? _this.elements : formElement;

          if (formElement.tagName === 'FORM') {
            _classPrivateMethodGet(_this, _activateForm, _activateForm2).call(_this, activateFormElement);
          } else {
            throw new Error('SPFormData constructor must be passed a form element');
          }
        });
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      if (this.elements.length) {
        this.elements.forEach(function (formElement) {
          formElement.reset();
        });
      }

      _classPrivateMethodGet(this, _clear, _clear2).call(this);
    }
  }, {
    key: "init",
    value: function init() {
      var _this2 = this;

      if (this.elements.length) {
        this.elements.forEach(function (formElement) {
          var activateFormElement = _this2.params.formSync ? _this2.elements : formElement;

          if (formElement.tagName === 'FORM') {
            formElement.addEventListener('submit', function (e) {
              e.preventDefault();

              if (!_this2.params.autoSubmit) {
                _classPrivateMethodGet(_this2, _activateForm, _activateForm2).call(_this2, activateFormElement);
              }
            });

            if (_this2.params.autoSubmit) {
              formElement.querySelectorAll('[name]').forEach(function (element) {
                element.addEventListener('change', function () {
                  if (_classPrivateFieldGet(_this2, _submitTimeout)) clearTimeout(_classPrivateFieldGet(_this2, _submitTimeout));

                  _classPrivateFieldSet(_this2, _submitTimeout, setTimeout(function () {
                    _classPrivateMethodGet(_this2, _activateForm, _activateForm2).call(_this2, activateFormElement);
                  }, _this2.params.delayBeforeSend));
                });
              });
            }
          } else {
            throw new Error('SPFormData constructor must be passed a form element');
          }
        });

        if (this.params.changeUrlQuery) {
          window.addEventListener('popstate', function () {
            if (window.location.search !== '') {
              _classPrivateMethodGet(_this2, _searchParams, _searchParams2).call(_this2);
            } else {
              _classPrivateMethodGet(_this2, _clear, _clear2).call(_this2);
            }
          });

          if (window.location.search !== '') {
            _classPrivateMethodGet(this, _searchParams, _searchParams2).call(this);
          }
        }
      }
    }
  }]);

  return SPFormData;
}();

function _searchParams2() {
  var _this3 = this;

  if (this.params.changeUrlQuery) {
    var params = new URLSearchParams(window.location.search);
    var query = {};
    params.forEach(function (value, key) {
      if (_this3.params.presetQueries.length) {
        if (_this3.params.presetQueries.includes(key) && value !== '') {
          if (value.indexOf(_this3.params.separator) !== -1) {
            query[key] = value.split(_this3.params.separator);
          } else {
            query[key] = value;
          }
        }
      } else if (value !== '') {
        if (value.indexOf(_this3.params.separator) !== -1) {
          query[key] = value.split(_this3.params.separator);
        } else {
          query[key] = value;
        }
      }
    });
    this.query = !isObject(query) ? query : null;
  }

  _classPrivateMethodGet(this, _sendForm, _sendForm2).call(this, this);
}

function _changeUrlQuery2(arr) {
  if (!isObject(arr)) {
    var loc = new URL(window.location);
    Object.keys(arr).forEach(function (key) {
      loc.searchParams.forEach(function (value, name) {
        if (name !== key) loc.searchParams.delete(name);
      });
    });
    Object.keys(arr).forEach(function (key) {
      loc.searchParams.set(key, arr[key]);
    });
    var url = decodeURIComponent(loc.href);
    window.history.pushState({}, '', url);

    _classPrivateMethodGet(this, _searchParams, _searchParams2).call(this);
  } else {
    _classPrivateMethodGet(this, _clear, _clear2).call(this);
  }
}

function _noChangeUrlQuery2(arr) {
  var _this4 = this;

  if (!isObject(arr)) {
    var query = {};
    Object.keys(arr).forEach(function (pair) {
      if (arr[pair] !== '') {
        if (arr[pair].indexOf(_this4.params.separator) !== -1) {
          query[pair] = arr[pair].split(_this4.params.separator);
        } else {
          query[pair] = arr[pair];
        }
      }
    });
    this.query = query;

    _classPrivateMethodGet(this, _searchParams, _searchParams2).call(this);
  } else {
    _classPrivateMethodGet(this, _clear, _clear2).call(this);
  }
}

function _activateForm2(el) {
  var _this5 = this;

  if (this.params.formSync) {
    var result = {};
    el.forEach(function (formElement) {
      var arrDataForm = helpers_serializeArray(formElement);

      if (arrDataForm.length) {
        result = _objectSpread(_objectSpread({}, result), helpers_normalizeArray(arrDataForm, _this5.params.separator));
      } else {
        _classPrivateMethodGet(_this5, _clear, _clear2).call(_this5);
      }
    });

    if (this.params.changeUrlQuery) {
      _classPrivateMethodGet(this, _changeUrlQuery, _changeUrlQuery2).call(this, result);
    } else {
      _classPrivateMethodGet(this, _noChangeUrlQuery, _noChangeUrlQuery2).call(this, result);
    }
  } else {
    var arrDataForm = helpers_serializeArray(el);

    if (arrDataForm.length) {
      var _result = helpers_normalizeArray(arrDataForm, this.params.separator);

      if (this.params.changeUrlQuery) {
        _classPrivateMethodGet(this, _changeUrlQuery, _changeUrlQuery2).call(this, _result);
      } else {
        _classPrivateMethodGet(this, _noChangeUrlQuery, _noChangeUrlQuery2).call(this, _result);
      }
    } else {
      _classPrivateMethodGet(this, _clear, _clear2).call(this);
    }
  }
}

function _sendForm2() {
  if (this.params.on) {
    if (typeof this.params.on === 'function') {
      if (this.params && this.params.on) {
        this.params.on(this.query);
      }
    } else {
      throw new Error('SPFormData#on must be passed a plain function');
    }
  }

  var event;

  if (window.CustomEvent && typeof window.CustomEvent === 'function') {
    event = new CustomEvent('spFormData:change', {
      detail: {
        query: this.query
      }
    });
  } else {
    event = document.createEvent('CustomEvent');
    event.initCustomEvent('spFormData:change', true, true, {
      query: this.query
    });
  }

  this.elements.forEach(function (formElement) {
    formElement.dispatchEvent(event);
  });
}

function _clear2() {
  if (this.params.changeUrlQuery) {
    window.history.pushState({}, '', '.');
  }

  this.query = null;

  _classPrivateMethodGet(this, _sendForm, _sendForm2).call(this, this);
}

/* harmony default export */ var core = (SPFormData);
__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});