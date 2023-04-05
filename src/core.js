import convertToArray from './helpers/convertToArray';
import serializeArray from './helpers/serializeArray';
import normalizeArray from './helpers/normalizeArray';
import { isValid, isObject } from './helpers/utils';
import defaults from './helpers/defaults';

class SPFormData {
    #submitTimeout;

    #eventsListeners;

    constructor(...args) {
        this.#submitTimeout = true;
        this.#eventsListeners = {};

        let el;
        let params;

        if (args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === 'Object') {
            [params] = args;
        } else {
            [el, params] = args;
        }
        if (!params) params = {};

        this.elements = convertToArray(el);

        if (!this.elements.length) throw new Error('Form not defined');

        if (params.presetQueries === undefined && this.elements.length) {
            params.presetQueries = [];
            this.elements.forEach((formElement) => {
                formElement.querySelectorAll('[name]').forEach((element) => {
                    if (!params.presetQueries.includes(element.name)) {
                        params.presetQueries.push(element.name);
                    }
                });

                if (formElement.tagName !== 'FORM') throw new Error('SPFormData constructor must be passed a form element');
            });
        }

        this.params = { ...defaults, ...params };

        if (!isValid(this.params.separator)) this.params.separator = defaults.separator;

        if (this.params && this.params.on) {
            Object.keys(this.params.on).forEach((eventName) => {
                this.on(eventName, this.params.on[eventName]);
            });
        }

        this.query = null;

        if (this.params.init) {
            this.init();
        }
    }

    #searchParams() {
        if (this.params.changeQueryParameters) {
            const params = new URLSearchParams(window.location.search);
            const query = {};

            params.forEach((value, key) => {
                const { multipleArray, separator } = this.params;

                if (value !== '') {
                    if (multipleArray) {
                        if (value.indexOf(separator) !== -1) {
                            query[key] = value.split(separator);
                        } else {
                            query[key] = value;
                        }
                    } else {
                        query[key] = value;
                    }
                }
            });

            this.query = !isObject(query) ? query : null;
        }
    }

    #changeQueryParameters(arr) {
        if (!isObject(arr)) {
            const loc = new URL(window.location);
            const { presetQueries } = this.params;

            // Delete
            Object.keys(arr).forEach((key) => {
                loc.searchParams.forEach((value, name) => {
                    if (name !== key) loc.searchParams.delete(name);
                });
            });

            // Add
            presetQueries.forEach((key) => {
                if (arr.hasOwnProperty(key)) {
                    loc.searchParams.set(key, arr[key]);
                }
            });

            const url = decodeURIComponent(loc.href);

            window.history.pushState({}, '', url);

            this.#searchParams();
        } else {
            this.#clear();
        }

        this.#emit('change');
    }

    #noChangeQueryParameters(arr) {
        if (!isObject(arr)) {
            const query = {};

            Object.keys(arr).forEach((pair) => {
                if (arr[pair] !== '') {
                    if (this.params.multipleArray) {
                        if (arr[pair].indexOf(this.params.separator) !== -1) {
                            query[pair] = arr[pair].split(this.params.separator);
                        } else {
                            query[pair] = arr[pair];
                        }
                    } else {
                        query[pair] = arr[pair];
                    }
                }
            });

            this.query = query;
        } else {
            this.#clear();
        }

        this.#emit('change');
    }

    #activateForm() {
        let result = {};
        this.elements.forEach((formElement) => {
            const arrDataForm = serializeArray(formElement);
            if (arrDataForm.length) {
                result = { ...result, ...normalizeArray(arrDataForm, this.params.separator) };
            } else {
                this.#clear();
            }
        });

        if (this.params.changeQueryParameters) {
            this.#changeQueryParameters(result);
        } else {
            this.#noChangeQueryParameters(result);
        }
    }

    #clear() {
        if (this.params.changeQueryParameters) {
            window.history.pushState({}, '', '.');
        }

        this.query = null;
    }

    #submit() {
        this.elements.forEach((formElement) => {
            formElement.addEventListener('submit', (e) => {
                e.preventDefault();

                if (!this.params.autoSubmit) {
                    this.#activateForm();

                    this.#emit('submit');
                }
            });
        });
    }

    #autoSubmit() {
        this.elements.forEach((formElement) => {
            formElement.querySelectorAll('[name]').forEach((element) => {
                element.addEventListener('change', () => {
                    if (this.#submitTimeout) clearTimeout(this.#submitTimeout);
                    this.#submitTimeout = setTimeout(() => {
                        this.#activateForm();
                    }, this.params.delayBeforeSend);
                });
            });
        });
    }

    #popstate() {
        window.addEventListener('popstate', () => {
            if (window.location.search !== '') {
                this.#searchParams();
            } else {
                this.#clear();
            }

            this.#emit('popstate');
        });
    }

    #searchParamsDefined() {
        if (window.location.search !== '') {
            this.#searchParams();
        }
    }

    #emit(events, query = true) {
        const self = this;

        const data = query ? self.query : '';

        if (!self.#eventsListeners) return self;

        const eventsArray = Array.isArray(events) ? events : events.split(' ');

        eventsArray.forEach((event) => {
            if (self.#eventsListeners && self.#eventsListeners[event]) {
                self.#eventsListeners[event].forEach((eventHandler) => {
                    eventHandler.call(self, data);
                });
            }
        });

        return self;
    }

    on(events, handler, priority) {
        const self = this;

        if (!self.#eventsListeners) return self;

        if (typeof handler !== 'function') return self;

        const method = priority ? 'unshift' : 'push';
        events.split(' ').forEach((event) => {
            if (!self.#eventsListeners[event]) self.#eventsListeners[event] = [];
            self.#eventsListeners[event][method](handler);
        });
        return self;
    }

    once(events, handler, priority) {
        const self = this;
        if (!self.#eventsListeners) return self;

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

    off(events, handler) {
        const self = this;
        if (!self.#eventsListeners) return self;

        events.split(' ').forEach((event) => {
            if (typeof handler === 'undefined') {
                self.#eventsListeners[event] = [];
            } else if (self.#eventsListeners[event]) {
                self.#eventsListeners[event].forEach((eventHandler, index) => {
                    if (eventHandler === handler || (eventHandler.emitterProxy && eventHandler.emitterProxy === handler)) {
                        self.#eventsListeners[event].splice(index, 1);
                    }
                });
            }
        });
        return self;
    }

    update() {
        this.#activateForm();

        this.#emit('update');
    }

    reset() {
        this.elements.forEach((formElement) => {
            formElement.reset();
        });

        this.#activateForm();

        this.#clear();

        this.#emit('reset');
    }

    init() {
        this.#emit('beforeInit', false);

        this.#submit();

        if (this.params.autoSubmit) {
            this.#autoSubmit();
        }

        this.#popstate();

        this.#searchParamsDefined();

        this.#emit('init');
        this.#emit('afterInit', false);

        return this;
    }
}

export default SPFormData;
