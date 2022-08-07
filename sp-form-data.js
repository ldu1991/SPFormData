/**
 * SPFormData 1.1.8
 * VanillaJS (_pure JavaScript_) plugin that reads form data with a change in Get URL parameters
 * https://github.com/ldu1991/sp-form-data
 *
 * Copyright 2022 Denis Lipatov
 *
 * Released under the BSD License
 *
 * Released on: August 7, 2022
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
                changeGetUrl: true
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
            let arrDataForm = this.serializeArray(el)

            if (arrDataForm.length) {
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

                if(this.params.changeGetUrl) {
                    this.changeGetUrl(result)
                } else {
                    this.noChangeGetUrl(result)
                }
            } else {
                this.resetForm()
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

            if (typeof (this.el) === 'undefined' || this.el === null) {
                return
            }

            if (typeof (this.el) !== 'object' && typeof (this.el) === 'string') {
                form = document.querySelector(this.el)
            } else {
                form = this.el
            }

            if (form !== null) {
                if (form.tagName === 'FORM') {
                    form.addEventListener('submit', (e) => {
                        e.preventDefault()

                        if (!this.params.autoSubmit) {
                            this.activateForm(form)
                        }
                    })

                    if (this.params.autoSubmit) {
                        form.querySelectorAll('select, input, textarea').forEach(element => {
                            element.addEventListener('change', () => {
                                if (this.params.submitTimeout) {
                                    if (this.params.submitTimeout) clearTimeout(this.params.submitTimeout);
                                    this.params.submitTimeout = setTimeout(() => {
                                        this.activateForm(form)
                                    }, this.params.delayBeforeSend)
                                } else {
                                    setTimeout(() => {
                                        this.activateForm(form)
                                    }, this.params.delayBeforeSend)
                                }
                            })
                        })
                    }
                } else {
                    throw new Error('SPFormData constructor must be passed a form element');
                }
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
