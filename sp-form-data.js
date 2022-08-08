/**
 * SPFormData 1.2.8
 * VanillaJS (_pure JavaScript_) plugin that reads form data with a change in Get URL parameters
 * https://github.com/ldu1991/sp-form-data
 *
 * Copyright 2022 Denis Lipatov
 *
 * Released under the BSD License
 *
 * Released on: August 9, 2022
 */

(function(global, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        global.SPFormData = factory();
    }
}(this, function() {
    'use strict';

    class SPFormData {

        constructor(el, params) {
            let defaults = {
                submitTimeout: true,
                delayBeforeSend: 600,
                autoSubmit: true,
                changeGetUrl: true,
                formSynchronization: false
            }

            this.el = el

            if (!params) params = {};
            params = Object.assign({}, params);
            const spFormDataParams = Object.assign({}, defaults);
            this.params = Object.assign({}, spFormDataParams, params);

            this.query = null;

            this.init();

            return this;
        }

        serializeArray(formElement) {
            const formData = new FormData(formElement);
            const pairs = [];
            for (const [name, value] of formData) {
                pairs.push({name, value});
            }
            return pairs;
        }

        normalizeArray(arrDataForm) {
            let result = {};
            arrDataForm.forEach(function (item) {
                if (!SPFormData.isEmpty(item.value)) {
                    if (!result.hasOwnProperty(item.name)) {
                        result[item.name] = item.value.replace(/ /g, '+')
                    } else {
                        result[item.name] += ',' + item.value.replace(/ /g, '+')
                    }
                }
            })

            return result;
        }

        getUrlString(params, keys = [], isArray = false) {
            const p = Object.keys(params).map(key => {
                let val = params[key]

                if ("[object Object]" === Object.prototype.toString.call(val) || Array.isArray(val)) {
                    if (Array.isArray(params)) {
                        keys.push("")
                    } else {
                        keys.push(key)
                    }
                    return this.getUrlString(val, keys, Array.isArray(val))
                } else {
                    let tKey = key

                    if (keys.length > 0) {
                        const tKeys = isArray ? keys : [...keys, key]
                        tKey = tKeys.reduce((str, k) => {
                            return "" === str ? k : `${str}[${k}]`
                        }, "")
                    }
                    if (isArray) {
                        return `${tKey}[]=${val}`
                    } else {
                        return `${tKey}=${val}`
                    }

                }
            }).join('&')

            keys.pop()
            return p
        }

        searchParams() {
            if(this.params.changeGetUrl) {
                let params = new URLSearchParams(location.search),
                    query = {}

                for (let pair of params.entries()) {
                    if (pair[1] !== '') {
                        if (pair[1].indexOf(',') !== -1) {
                            query[pair[0]] = pair[1].split(',')
                        } else {
                            query[pair[0]] = pair[1]
                        }
                    }
                }

                this.query = !SPFormData.isEmptyObject(query) ? query : null
            }
            this.sendForm()
        }

        changeGetUrl(arr) {
            if (!SPFormData.isEmptyObject(arr)) {
                let url = '?' + decodeURIComponent(this.getUrlString(arr));
                history.pushState({}, '', url);

                this.searchParams()
            } else {
                this.resetForm()
            }
        }

        noChangeGetUrl(arr) {
            if (!SPFormData.isEmptyObject(arr)) {
                let query = {}

                for (let pair in arr) {
                    if (arr[pair] !== '') {
                        if (arr[pair].indexOf(',') !== -1) {
                            query[pair] = arr[pair].split(',')
                        } else {
                            query[pair] = arr[pair]
                        }
                    }
                }

                this.query = query
                this.searchParams()
            } else {
                this.resetForm()
            }
        }

        activateForm(el) {
            if(this.params.formSynchronization) {
                let result = {};
                el.forEach(formElement => {
                    let arrDataForm = this.serializeArray(formElement)
                    if (arrDataForm.length) {
                        result = Object.assign({}, result, this.normalizeArray(arrDataForm));
                    } else {
                        this.resetForm()
                    }
                })

                if(this.params.changeGetUrl) {
                    this.changeGetUrl(result)
                } else {
                    this.noChangeGetUrl(result)
                }
            } else {
                let arrDataForm = this.serializeArray(el)
                if (arrDataForm.length) {
                    let result = this.normalizeArray(arrDataForm);

                    if(this.params.changeGetUrl) {
                        this.changeGetUrl(result)
                    } else {
                        this.noChangeGetUrl(result)
                    }
                } else {
                    this.resetForm()
                }
            }
        }

        resetForm() {
            history.pushState({}, '', '.');

            this.query = null
            this.sendForm()
        }

        sendForm() {
            if (typeof this.params.response === 'function') {
                if (this.params && this.params.response) {
                    this.params.response(this.query)
                }
            } else {
                throw new Error('SPFormData#response must be passed a plain function');
            }
        }

        init() {
            let form = null;

            if (typeof this.el === 'undefined' || this.el === null || this.el === '') {
                return
            }

            if (typeof (this.el) !== 'object' && typeof (this.el) === 'string') {
                form = document.querySelectorAll(this.el)
            } else {
                if(NodeList.prototype.isPrototypeOf(this.el)) {
                    form = this.el
                } else {
                    form = [this.el]
                }
            }

            if (form !== null) {
                form.forEach(formElement => {
                    let activateFormElement = this.params.formSynchronization ? form : formElement;

                    if (formElement.tagName === 'FORM') {
                        formElement.addEventListener('submit', (e) => {
                            e.preventDefault()

                            if (!this.params.autoSubmit) {
                                this.activateForm(activateFormElement)
                            }
                        })

                        if (this.params.autoSubmit) {
                            formElement.querySelectorAll('select, input, textarea').forEach(element => {
                                element.addEventListener('change', () => {
                                    if (this.params.submitTimeout) {
                                        if (this.params.submitTimeout) clearTimeout(this.params.submitTimeout);
                                        this.params.submitTimeout = setTimeout(() => {
                                            this.activateForm(activateFormElement)
                                        }, this.params.delayBeforeSend)
                                    } else {
                                        setTimeout(() => {
                                            this.activateForm(activateFormElement)
                                        }, this.params.delayBeforeSend)
                                    }
                                })
                            })
                        }
                    } else {
                        throw new Error('SPFormData constructor must be passed a form element');
                    }
                })
            }

            if(this.params.changeGetUrl) {
                window.addEventListener('popstate', () => {
                    if (location.search !== '') {
                        this.searchParams()
                    } else {
                        this.resetForm();
                    }
                })

                if (location.search !== '') {
                    this.searchParams()
                }
            }
        }

        static isEmpty(value) {
            return !value || !/[^\s]+/.test(value);
        }

        static isEmptyObject(obj) {
            for (let i in obj) {
                if (obj.hasOwnProperty(i)) {
                    return false;
                }
            }
            return true;
        }
    }

    return SPFormData;
}));
