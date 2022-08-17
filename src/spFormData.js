import convertToArray from './helpers/convertToArray';
import serializeArray from './helpers/serializeArray';
import normalizeArray from './helpers/normalizeArray';
import { isEmptyObject } from './helpers/isEmpty';

export default class SPFormData {
    constructor(elements, params) {
        if (!elements) return;

        this.elements = convertToArray(elements);

        this.defaults = {
            submitTimeout: true,
            delayBeforeSend: 600,
            autoSubmit: true,
            changeGetUrl: true,
            formSynchronization: false
        };

        this.params = Object.assign(this.defaults, params);

        this.query = null;

        this.init();
    }

    getUrlString(params, keys = [], isArray = false) {
        const p = Object.keys(params)
            .map((key) => {
                const val = params[key];

                if (Object.prototype.toString.call(val) === '[object Object]' || Array.isArray(val)) {
                    if (Array.isArray(params)) {
                        keys.push('');
                    } else {
                        keys.push(key);
                    }
                    return this.getUrlString(val, keys, Array.isArray(val));
                }
                let tKey = key;

                if (keys.length > 0) {
                    const tKeys = isArray ? keys : [...keys, key];
                    tKey = tKeys.reduce((str, k) => {
                        return str === '' ? k : `${str}[${k}]`;
                    }, '');
                }
                if (isArray) {
                    return `${tKey}[]=${val}`;
                }
                return `${tKey}=${val}`;
            })
            .join('&');

        keys.pop();
        return p;
    }

    searchParams() {
        if (this.params.changeGetUrl) {
            const params = new URLSearchParams(window.location.search);
            const query = {};

            for (const pair of params.entries()) {
                if (pair[1] !== '') {
                    if (pair[1].indexOf(',') !== -1) {
                        query[pair[0]] = pair[1].split(',');
                    } else {
                        query[pair[0]] = pair[1];
                    }
                }
            }

            this.query = !isEmptyObject(query) ? query : null;
        }
        this.sendForm();
    }

    changeGetUrl(arr) {
        if (!isEmptyObject(arr)) {
            const url = `?${decodeURIComponent(this.getUrlString(arr))}`;
            history.pushState({}, '', url);

            this.searchParams();
        } else {
            this.resetForm();
        }
    }

    noChangeGetUrl(arr) {
        if (!isEmptyObject(arr)) {
            const query = {};

            for (const pair in arr) {
                if (arr[pair] !== '') {
                    if (arr[pair].indexOf(',') !== -1) {
                        query[pair] = arr[pair].split(',');
                    } else {
                        query[pair] = arr[pair];
                    }
                }
            }

            this.query = query;
            this.searchParams();
        } else {
            this.resetForm();
        }
    }

    activateForm(el) {
        if (this.params.formSynchronization) {
            let result = {};
            el.forEach((formElement) => {
                const arrDataForm = serializeArray(formElement);
                if (arrDataForm.length) {
                    result = { ...result, ...normalizeArray(arrDataForm) };
                } else {
                    this.resetForm();
                }
            });

            if (this.params.changeGetUrl) {
                this.changeGetUrl(result);
            } else {
                this.noChangeGetUrl(result);
            }
        } else {
            const arrDataForm = serializeArray(el);
            if (arrDataForm.length) {
                const result = normalizeArray(arrDataForm);

                if (this.params.changeGetUrl) {
                    this.changeGetUrl(result);
                } else {
                    this.noChangeGetUrl(result);
                }
            } else {
                this.resetForm();
            }
        }
    }

    resetForm() {
        history.pushState({}, '', '.');

        this.query = null;
        this.sendForm();
    }

    sendForm() {
        if (typeof this.params.response === 'function') {
            if (this.params && this.params.response) {
                this.params.response(this.query);
            }
        } else {
            throw new Error('SPFormData#response must be passed a plain function');
        }
    }

    init() {
        this.elements.forEach((formElement) => {
            const activateFormElement = this.params.formSynchronization ? this.elements : formElement;

            if (formElement.tagName === 'FORM') {
                formElement.addEventListener('submit', (e) => {
                    e.preventDefault();

                    if (!this.params.autoSubmit) {
                        this.activateForm(activateFormElement);
                    }
                });

                if (this.params.autoSubmit) {
                    formElement.querySelectorAll('select, input, textarea').forEach((element) => {
                        element.addEventListener('change', () => {
                            if (this.params.submitTimeout) {
                                if (this.params.submitTimeout) clearTimeout(this.params.submitTimeout);
                                this.params.submitTimeout = setTimeout(() => {
                                    this.activateForm(activateFormElement);
                                }, this.params.delayBeforeSend);
                            } else {
                                setTimeout(() => {
                                    this.activateForm(activateFormElement);
                                }, this.params.delayBeforeSend);
                            }
                        });
                    });
                }
            } else {
                throw new Error('SPFormData constructor must be passed a form element');
            }
        });

        if (this.params.changeGetUrl) {
            window.addEventListener('popstate', () => {
                if (location.search !== '') {
                    this.searchParams();
                } else {
                    this.resetForm();
                }
            });

            if (location.search !== '') {
                this.searchParams();
            }
        }
    }
}
