import convertToArray from './helpers/convertToArray';
import serializeArray from './helpers/serializeArray';
import normalizeArray from './helpers/normalizeArray';
import { isValid, isObject, isNode, isEmpty } from './helpers/utils';
import defaults from './helpers/defaults';

class SPFormData {
    #submitTimeout;

    #eventsListeners;

    #innerPresetQueries;

    #secondForm;

    constructor(...args) {
        this.#submitTimeout = true;
        this.#eventsListeners = {};
        this.#innerPresetQueries = [];
        this.#secondForm = null;

        let el;
        let params;

        if (args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === 'Object') {
            [params] = args;
        } else {
            [el, params] = args;
        }
        if (!params) params = {};

        this.params = { ...defaults, ...params };

        this.elements = convertToArray(el);

        if (!this.elements.length) return;

        if (this.params.secondForm) {
            this.#secondForm = convertToArray(this.params.secondForm);
            this.elements = [...convertToArray(el), ...this.#secondForm];
        }

        if (this.params.presetQueries !== undefined && !Array.isArray(this.params.presetQueries))
            throw new Error('"presetQueries" parameter must be an Array');

        this.#innerPresetQueries = this.params.presetQueries;

        if (this.#innerPresetQueries === undefined || !this.#innerPresetQueries.length) {
            this.params.presetQueries = [];
            this.elements.forEach((formElement) => {
                if (formElement.tagName !== 'FORM') throw new Error('SPFormData constructor must be passed a FORM element');

                formElement.querySelectorAll('[name]').forEach((element) => {
                    if (!this.params.presetQueries.includes(element.name)) {
                        this.params.presetQueries.push(element.name);
                    }
                });
            });
        }

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

    #processingQueryParameters(arr) {
        if (!isObject(arr)) {
            const query = {};

            Object.keys(arr).forEach((pair) => {
                if (arr[pair].type !== undefined && arr[pair].type === 'file') {
                    query[pair] = arr[pair].elements;
                } else if (!isEmpty(arr[pair])) {
                    if (this.params.multipleArray) {
                        if (arr[pair].indexOf(this.params.separator) !== -1) {
                            query[pair] = decodeURIComponent(arr[pair]).replace(/\+/g, ' ').split(this.params.separator);
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
            this.#clear();
        }
    }

    #searchParams(queryArr = {}) {
        if (this.params.changeQueryParameters) {
            const params = new URLSearchParams(window.location.search);
            const query = { ...{}, ...queryArr };

            params.forEach((value, key) => {
                const { multipleArray, separator } = this.params;

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

    #changeQueryParameters(arr) {
        if (!isObject(arr)) {
            const filteredArr = Object.keys(arr).reduce((acc, key) => {
                if (!this.params.excludeQueryParameters.includes(key)) {
                    acc[key] = arr[key];
                }
                return acc;
            }, {});

            const queryArr = this.params.excludeQueryParameters.reduce((acc, key) => {
                if (arr.hasOwnProperty(key)) {
                    acc[key] = arr[key];
                }
                return acc;
            }, {});

            const loc = new URL(window.location);
            const { presetQueries } = this.params;

            // Delete
            Array.from(loc.searchParams.keys()).forEach(key => {
                loc.searchParams.delete(key);
            });

            // Add
            presetQueries.forEach((key) => {
                if (filteredArr.hasOwnProperty(key)) {
                    loc.searchParams.set(key, arr[key]);
                }
            });

            const url = decodeURIComponent(loc.href);

            window.history.pushState({}, '', url);

            this.#searchParams(queryArr);
        } else {
            this.#clear();
        }

        this.#emit('change');
    }

    #noChangeQueryParameters(arr) {
        this.#processingQueryParameters(arr);

        this.#emit('change');
    }

    #activateForm() {
        let result = {};
        this.elements.forEach((formElement) => {
            const arrDataForm = serializeArray(formElement);
            if (arrDataForm.length) {
                if (this.params.changeQueryParameters) {
                    result = { ...result, ...normalizeArray(arrDataForm, this.params.separator, formElement).string_query };
                } else {
                    result = { ...result, ...normalizeArray(arrDataForm, this.params.separator, formElement).all_query };
                }
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

    #initActivateForm() {
        let result = {};
        this.elements.forEach((formElement) => {
            const arrDataForm = serializeArray(formElement);
            if (arrDataForm.length) {
                if (this.params.changeQueryParameters) {
                    result = { ...result, ...normalizeArray(arrDataForm, this.params.separator, formElement).string_query };
                } else {
                    result = { ...result, ...normalizeArray(arrDataForm, this.params.separator, formElement).all_query };
                }
            } else {
                this.#clear();
            }
        });

        this.#processingQueryParameters(result);
    }

    #clear() {
        if (this.params.changeQueryParameters) {
            window.history.pushState({}, '', '.');
        }

        this.query = null;
    }

    #secondFormReset(form) {
        const self = this;
        if (self.params.secondForm && !self.#secondForm.includes(form)) {
            self.#secondForm.forEach((secondFormElement) => {
                secondFormElement.reset();
            });
        }
    }

    #submit() {
        const self = this;
        self.elements.forEach((formElement) => {
            formElement.addEventListener('submit', (event) => {
                event.preventDefault();

                if (!self.params.autoSubmit) {
                    for (let { target } = event; target && target !== this; target = target.parentNode) {
                        if (target instanceof Element) {
                            this.#secondFormReset(target);
                        }
                    }

                    self.#activateForm();

                    self.#emit('submit');
                }
            });
        });
    }

    #autoSubmit() {
        const self = this;
        self.elements.forEach((formElement) => {
            let nameElements = '[name]';

            if (self.#innerPresetQueries !== undefined) {
                const { presetQueries } = self.params;
                const inputElements = [];
                presetQueries.forEach((key) => {
                    inputElements.push(`[name="${key}"]`);
                });

                nameElements = inputElements.join(',');
            }

            formElement.addEventListener(
                'change',
                (event) => {
                    for (let { target } = event; target && target !== this; target = target.parentNode) {
                        if (target instanceof Element) {
                            if (target.matches(nameElements)) {
                                this.#secondFormReset(target.form);

                                const fieldsArray = Object.keys(this.params.resetFieldsOnChange);

                                fieldsArray.forEach(key => {
                                    let inputElement = `[name="${key}"]`;

                                    if (!fieldsArray.includes(target.name)) {
                                        this.elements.forEach((formElement) => {
                                            const nameElement = formElement.querySelector(inputElement);

                                            nameElement.value = this.params.resetFieldsOnChange[key]
                                        });
                                    }
                                });


                                if (self.#submitTimeout) clearTimeout(self.#submitTimeout);
                                self.#submitTimeout = setTimeout(() => {
                                    self.#activateForm();
                                }, self.params.delayBeforeSend);

                                break;
                            }
                        }
                    }
                },
                true
            );
        });
    }

    #popstate() {
        window.addEventListener('popstate', () => {
            if (!isEmpty(window.location.search)) {
                this.#searchParams();
            } else {
                this.#clear();
            }

            this.#emit('popstate');
        });
    }

    #searchParamsDefined() {
        if (!isEmpty(window.location.search)) {
            this.#searchParams();
        } else {
            this.#initActivateForm();
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
        if (!this.elements.length) return;

        /* if (this.params.autoSubmit) { */
        this.#activateForm();

        this.#emit('update');
    }

    reset() {
        if (!this.elements.length) return;

        this.elements.forEach((formElement) => {
            formElement.reset();
        });

        if (this.params.autoSubmit) {
            this.#activateForm();
        }

        this.#clear();

        if (this.params.autoSubmit) {
            this.#emit('reset');
        }
    }

    setValue(name, value) {
        if (!this.elements.length) return;

        let element;
        if (typeof name === 'string') {
            this.elements.forEach((formElement) => {
                const nameElement = formElement.querySelector(`[name="${name}"]`);
                if (nameElement) element = nameElement;
            });
        } else if (isNode(name)) {
            element = name;
        }

        if (element && (element.type !== 'checkbox' || element.type !== 'radio' || element.type !== 'file')) {
            this.#secondFormReset(element.form);

            if (value !== '') {
                element.value = value;
            } else {
                throw new Error('setValue(name, value) "value" is required!');
            }

            this.update();
        }
    }

    setChecked(name, value) {
        if (!this.elements.length) return;

        let element;
        if (typeof name === 'string') {
            this.elements.forEach((formElement) => {
                let nameElement;
                if (value) {
                    nameElement = formElement.querySelector(`[name="${name}"][value="${value}"]`);
                } else {
                    throw new Error('setChecked(name, value) "value" is required if string name is used!');
                }

                if (nameElement) element = nameElement;
            });
        } else if (isNode(name)) {
            element = name;
        }

        if (element && (element.type === 'checkbox' || element.type === 'radio')) {
            this.#secondFormReset(element.form);

            element.checked = true;

            this.update();
        }
    }

    init() {
        if (!this.elements.length) return;

        this.#emit('beforeInit', false);

        this.#submit();

        if (this.params.autoSubmit) {
            this.#autoSubmit();
        }

        this.#popstate();

        this.#searchParamsDefined();

        this.#emit('init');
        this.#emit('afterInit', false);
    }
}

export default SPFormData;
