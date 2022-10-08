import convertToArray from './helpers/convertToArray';
import serializeArray from './helpers/serializeArray';
import normalizeArray from './helpers/normalizeArray';
import { isValid, isObject } from './helpers/utils';
import defaults from './helpers/defaults';

class SPFormData {
    #submitTimeout;

    constructor(...args) {
        this.#submitTimeout = true;

        let el;
        let params;

        if (args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === 'Object') {
            [params] = args;
        } else {
            [el, params] = args;
        }
        if (!params) params = {};

        this.elements = convertToArray(el);

        if (params.presetQueries === undefined && this.elements.length) {
            params.presetQueries = [];
            this.elements.forEach((formElement) => {
                formElement.querySelectorAll('[name]').forEach((element) => {
                    if (!params.presetQueries.includes(element.name)) {
                        params.presetQueries.push(element.name);
                    }
                });
            });
        }

        this.params = { ...defaults, ...params };

        if (!isValid(this.params.separator)) this.params.separator = defaults.separator;

        this.query = null;

        if (this.params.init) {
            this.init();
        }
    }

    #searchParams() {
        if (this.params.changeGetUrl) {
            const params = new URLSearchParams(window.location.search);
            const query = {};

            params.forEach((value, key) => {
                if (this.params.presetQueries.length) {
                    if (this.params.presetQueries.includes(key) && value !== '') {
                        if (value.indexOf(this.params.separator) !== -1) {
                            query[key] = value.split(this.params.separator);
                        } else {
                            query[key] = value;
                        }
                    }
                } else if (value !== '') {
                    if (value.indexOf(this.params.separator) !== -1) {
                        query[key] = value.split(this.params.separator);
                    } else {
                        query[key] = value;
                    }
                }
            });

            this.query = !isObject(query) ? query : null;
        }

        this.#sendForm(this);
    }

    #changeUrl(arr) {
        if (!isObject(arr)) {
            const loc = new URL(window.location);
            Object.keys(arr).forEach((key) => {
                loc.searchParams.forEach((value, name) => {
                    if (name !== key) loc.searchParams.delete(name);
                });
            });

            Object.keys(arr).forEach((key) => {
                loc.searchParams.set(key, arr[key]);
            });

            const url = decodeURIComponent(loc.href);

            window.history.pushState({}, '', url);

            this.#searchParams();
        } else {
            this.#clear();
        }
    }

    #noChangeUrl(arr) {
        if (!isObject(arr)) {
            const query = {};

            Object.keys(arr).forEach((pair) => {
                if (arr[pair] !== '') {
                    if (arr[pair].indexOf(this.params.separator) !== -1) {
                        query[pair] = arr[pair].split(this.params.separator);
                    } else {
                        query[pair] = arr[pair];
                    }
                }
            });

            this.query = query;
            this.#searchParams();
        } else {
            this.#clear();
        }
    }

    #activateForm(el) {
        if (this.params.formSync) {
            let result = {};
            el.forEach((formElement) => {
                const arrDataForm = serializeArray(formElement);
                if (arrDataForm.length) {
                    result = { ...result, ...normalizeArray(arrDataForm, this.params.separator) };
                } else {
                    this.#clear();
                }
            });

            if (this.params.changeGetUrl) {
                this.#changeUrl(result);
            } else {
                this.#noChangeUrl(result);
            }
        } else {
            const arrDataForm = serializeArray(el);
            if (arrDataForm.length) {
                const result = normalizeArray(arrDataForm, this.params.separator);

                if (this.params.changeGetUrl) {
                    this.#changeUrl(result);
                } else {
                    this.#noChangeUrl(result);
                }
            } else {
                this.#clear();
            }
        }
    }

    #sendForm() {
        if (this.params.on) {
            if (typeof this.params.on === 'function') {
                if (this.params && this.params.on) {
                    this.params.on(this.query);
                }
            } else {
                throw new Error('SPFormData#on must be passed a plain function');
            }
        }

        let event;
        if (window.CustomEvent && typeof window.CustomEvent === 'function') {
            event = new CustomEvent('spFormData:change', { detail: { query: this.query } });
        } else {
            event = document.createEvent('CustomEvent');
            event.initCustomEvent('spFormData:change', true, true, { query: this.query });
        }

        this.elements.forEach((formElement) => {
            formElement.dispatchEvent(event);
        });
    }

    #clear() {
        if (this.params.changeGetUrl) {
            window.history.pushState({}, '', '.');
        }

        this.query = null;
        this.#sendForm(this);
    }

    on(data) {
        if (this.elements.length) {
            this.elements.forEach((formElement) => {
                formElement.addEventListener('spFormData:change', (event) => {
                    data(event.detail.query);
                });
            });

            if (this.params.changeGetUrl && window.location.search !== '') {
                data(this.query);
            }
        }
    }

    update() {
        if (this.elements.length) {
            this.elements.forEach((formElement) => {
                const activateFormElement = this.params.formSync ? this.elements : formElement;

                if (formElement.tagName === 'FORM') {
                    this.#activateForm(activateFormElement);
                } else {
                    throw new Error('SPFormData constructor must be passed a form element');
                }
            });
        }
    }

    reset() {
        if (this.elements.length) {
            this.elements.forEach((formElement) => {
                formElement.reset();
            });
        }

        this.#clear();
    }

    init() {
        if (this.elements.length) {
            this.elements.forEach((formElement) => {
                const activateFormElement = this.params.formSync ? this.elements : formElement;

                if (formElement.tagName === 'FORM') {
                    formElement.addEventListener('submit', (e) => {
                        e.preventDefault();

                        if (!this.params.autoSubmit) {
                            this.#activateForm(activateFormElement);
                        }
                    });

                    if (this.params.autoSubmit) {
                        formElement.querySelectorAll('[name]').forEach((element) => {
                            element.addEventListener('change', () => {
                                if (this.#submitTimeout) clearTimeout(this.#submitTimeout);
                                this.#submitTimeout = setTimeout(() => {
                                    this.#activateForm(activateFormElement);
                                }, this.params.delayBeforeSend);
                            });
                        });
                    }
                } else {
                    throw new Error('SPFormData constructor must be passed a form element');
                }
            });

            if (this.params.changeGetUrl) {
                window.addEventListener('popstate', () => {
                    if (window.location.search !== '') {
                        this.#searchParams();
                    } else {
                        this.#clear();
                    }
                });

                if (window.location.search !== '') {
                    this.#searchParams();
                }
            }
        }
    }
}

export default SPFormData;
