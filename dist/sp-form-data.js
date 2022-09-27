/*!
 * SPFormData 1.6.2
 * VanillaJS (pure JavaScript) plugin that reads form data with a change in Get URL parameters
 * https://github.com/ldu1991/sp-form-data/#readme
 *
 * Copyright 2022 Denis Lipatov <ldu2601@gmail.com>
 *
 * Released under the BSD License
 *
 * Released on: September 27, 2022
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
  "default": function() { return /* binding */ SPFormData; }
});

;// CONCATENATED MODULE: ./src/helpers/convertToArray.js
function isDomNode(x) {
  return typeof window.Node === 'object' ? x instanceof window.Node : x !== null && typeof x === 'object' && typeof x.nodeType === 'number' && typeof x.nodeName === 'string';
}

function isDomNodeList(x) {
  var prototypeToString = Object.prototype.toString.call(x);
  var regex = /^\[object (HTMLCollection|NodeList|Object)]$/;
  return typeof window.NodeList === 'object' ? x instanceof window.NodeList : x !== null && typeof x === 'object' && typeof x.length === 'number' && regex.test(prototypeToString) && (x.length === 0 || isDomNode(x[0]));
}

var convertToArray = function convertToArray(elements) {
  if (elements instanceof Array) {
    return elements.filter(isDomNode);
  }

  if (isDomNode(elements)) {
    return [elements];
  }

  if (isDomNodeList(elements)) {
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
;// CONCATENATED MODULE: ./src/helpers/isEmpty.js
var isEmpty = function isEmpty(value) {
  return !value || !/[^\s]+/.test(value);
};
var isEmptyObject = function isEmptyObject(obj) {
  return obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype;
};
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
;// CONCATENATED MODULE: ./src/helpers/isValid.js
var isValid = function isValid(str) {
  return /^[|,]+$/.test(str);
};

/* harmony default export */ var helpers_isValid = (isValid);
;// CONCATENATED MODULE: ./src/sp-form-data.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }







var SPFormData = /*#__PURE__*/function () {
  function SPFormData(elements, params) {
    _classCallCheck(this, SPFormData);

    this.elements = helpers_convertToArray(elements);
    if (!this.elements.length) return;
    this.defaults = {
      separator: ',',
      delayBeforeSend: 600,
      autoSubmit: true,
      changeGetUrl: true,
      formSync: false
    };
    this.params = Object.assign(this.defaults, params);
    if (!helpers_isValid(this.params.separator)) this.params.separator = this.defaults.separator;
    this.query = null;
    this.submitTimeout = true;
    this.init();
  }

  _createClass(SPFormData, [{
    key: "searchParams",
    value: function searchParams() {
      var _this = this;

      if (this.params.changeGetUrl) {
        var params = new URLSearchParams(window.location.search);
        var query = {};
        params.forEach(function (value, key) {
          if (value !== '') {
            if (value.indexOf(_this.params.separator) !== -1) {
              query[key] = value.split(_this.params.separator);
            } else {
              query[key] = value;
            }
          }
        });
        this.query = !isEmptyObject(query) ? query : null;
      }

      this.sendForm();
    }
  }, {
    key: "changeGetUrl",
    value: function changeGetUrl(arr) {
      if (!isEmptyObject(arr)) {
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
        this.searchParams();
      } else {
        this.resetForm();
      }
    }
  }, {
    key: "noChangeGetUrl",
    value: function noChangeGetUrl(arr) {
      var _this2 = this;

      if (!isEmptyObject(arr)) {
        var query = {};
        Object.keys(arr).forEach(function (pair) {
          if (arr[pair] !== '') {
            if (arr[pair].indexOf(_this2.params.separator) !== -1) {
              query[pair] = arr[pair].split(_this2.params.separator);
            } else {
              query[pair] = arr[pair];
            }
          }
        });
        this.query = query;
        this.searchParams();
      } else {
        this.resetForm();
      }
    }
  }, {
    key: "activateForm",
    value: function activateForm(el) {
      var _this3 = this;

      if (this.params.formSync) {
        var result = {};
        el.forEach(function (formElement) {
          var arrDataForm = helpers_serializeArray(formElement);

          if (arrDataForm.length) {
            result = _objectSpread(_objectSpread({}, result), helpers_normalizeArray(arrDataForm, _this3.params.separator));
          } else {
            _this3.resetForm();
          }
        });

        if (this.params.changeGetUrl) {
          this.changeGetUrl(result);
        } else {
          this.noChangeGetUrl(result);
        }
      } else {
        var arrDataForm = helpers_serializeArray(el);

        if (arrDataForm.length) {
          var _result = helpers_normalizeArray(arrDataForm, this.params.separator);

          if (this.params.changeGetUrl) {
            this.changeGetUrl(_result);
          } else {
            this.noChangeGetUrl(_result);
          }
        } else {
          this.resetForm();
        }
      }
    }
  }, {
    key: "resetForm",
    value: function resetForm() {
      if (this.params.changeGetUrl) {
        window.history.pushState({}, '', '.');
      }

      this.query = null;
      this.sendForm();
    }
  }, {
    key: "sendForm",
    value: function sendForm() {
      if (this.params.response) {
        if (typeof this.params.response === 'function') {
          if (this.params && this.params.response) {
            this.params.response(this.query);
          }
        } else {
          throw new Error('SPFormData#response must be passed a plain function');
        }
      }

      var event;

      if (window.CustomEvent && typeof window.CustomEvent === 'function') {
        event = new CustomEvent('spFormDataResponse', {
          detail: {
            query: this.query
          }
        });
      } else {
        event = document.createEvent('CustomEvent');
        event.initCustomEvent('spFormDataResponse', true, true, {
          query: this.query
        });
      }

      this.elements.forEach(function (formElement) {
        formElement.dispatchEvent(event);
      });
    }
  }, {
    key: "response",
    value: function response(data) {
      this.elements.forEach(function (formElement) {
        formElement.addEventListener('spFormDataResponse', function (event) {
          data(event.detail.query);
        });
      });

      if (this.params.changeGetUrl && window.location.search !== '') {
        data(this.query);
      }
    }
  }, {
    key: "init",
    value: function init() {
      var _this4 = this;

      this.elements.forEach(function (formElement) {
        var activateFormElement = _this4.params.formSync ? _this4.elements : formElement;

        if (formElement.tagName === 'FORM') {
          formElement.addEventListener('submit', function (e) {
            e.preventDefault();

            if (!_this4.params.autoSubmit) {
              _this4.activateForm(activateFormElement);
            }
          });

          if (_this4.params.autoSubmit) {
            formElement.querySelectorAll('select, input, textarea').forEach(function (element) {
              element.addEventListener('change', function () {
                if (_this4.submitTimeout) clearTimeout(_this4.submitTimeout);
                _this4.submitTimeout = setTimeout(function () {
                  _this4.activateForm(activateFormElement);
                }, _this4.params.delayBeforeSend);
              });
            });
          }
        } else {
          throw new Error('SPFormData constructor must be passed a form element');
        }
      });

      if (this.params.changeGetUrl) {
        window.addEventListener('popstate', function () {
          if (window.location.search !== '') {
            _this4.searchParams();
          } else {
            _this4.resetForm();
          }
        });

        if (window.location.search !== '') {
          this.searchParams();
        }
      }
    }
  }]);

  return SPFormData;
}();


__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});