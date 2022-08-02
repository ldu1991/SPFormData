export default class SPFormData {
    /**
     * Constructor
     * @param elementForm
     * @param options
     */
    constructor(elementForm, options) {
        this.elementForm = elementForm
        this.options = Object.assign({}, {
            submitTimeout: true,
            delayBeforeSend: 600,
            autoSubmit: true,
            response: data => {}
        }, options)
        this.query = null

        this.init()
    }

    /**
     * serializeArray
     * @param formElement
     * @returns {*[]}
     */
    serializeArray(formElement) {
        const formData = new FormData(formElement);
        const pairs = [];
        for (const [name, value] of formData) {
            pairs.push({name, value});
        }
        return pairs;
    }

    /**
     *
     * @param params
     * @param keys
     * @param isArray
     * @returns {string}
     */
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
        let params = new URLSearchParams(location.search),
            query = {}

        for (let pair of params.entries()) {
            if(pair[1] !== '') {
                if (pair[1].indexOf(',') !== -1) {
                    query[pair[0]] = pair[1].split(',')
                } else {
                    query[pair[0]] = pair[1]
                }
            }
        }

        this.query = query
        this.sendForm()
    }

    activateForm(el) {
        let arrDataForm = this.serializeArray(el)

        if(arrDataForm.length) {
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

            let url = '?' + decodeURIComponent(this.getUrlString(result));
            history.pushState({}, '', url);

            this.searchParams()
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
        if (typeof this.options.response === 'function') {
            this.options.response(this.query);
        } else {
            throw new Error('SPFormData#response must be passed a plain function');
        }
    }

    init() {
        let form = null;

        if (typeof (this.elementForm) === 'undefined' || this.elementForm === null) {
            return
        }

        if (typeof (this.elementForm) !== 'object' && typeof (this.elementForm) === 'string') {
            form = document.querySelector(this.elementForm)
        } else {
            form = this.elementForm
        }

        if(form !== null) {
            if (form.tagName === 'FORM') {
                form.addEventListener('submit', (e) => {
                    e.preventDefault()

                    if (!this.options.autoSubmit) {
                        this.activateForm(form)
                    }
                })

                if (this.options.autoSubmit) {
                    form.querySelectorAll('select, input, textarea').forEach(element => {
                        element.addEventListener('change', () => {
                            if(this.options.submitTimeout) {
                                if (this.options.submitTimeout) clearTimeout(this.options.submitTimeout);
                                this.options.submitTimeout = setTimeout(() => {
                                    this.activateForm(form)
                                }, this.options.delayBeforeSend)
                            } else {
                                setTimeout(() => {
                                    this.activateForm(form)
                                }, this.options.delayBeforeSend)
                            }
                        })
                    })
                }
            } else {
                throw new Error('SPFormData constructor must be passed a form element');
            }
        }

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

    static isEmpty(value) {
        return !value || !/[^\s]+/.test(value);
    }
}
