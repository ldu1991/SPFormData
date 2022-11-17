import SPFormData from '../src/core'

let filter = document.querySelectorAll('#filter')

let SPFD = new SPFormData(filter, {
    //separator: ',',
    //delayBeforeSend: 650,
    //autoSubmit: true,
    changeUrlQuery: false,
    //presetQueries: ['option', 'search'],
});

SPFD.on('change', data => {
    console.log('OnFn Change:')
    console.log(data)
})

let reset = document.querySelector('.reset')

if (!!reset) {
    reset.addEventListener('click', () => {
        SPFD.reset()
    })
}


/*let SPFDSync = new SPFormData('#filter-sync, #pagination-sync', {
    init: false,
    separator: ',',
    delayBeforeSend: 650,
    autoSubmit: true,
    changeUrlQuery: true,
    presetQueries: [],
    multipleArray: true,
    on: {
        init: data => {
            console.warn('Console init:')
            console.log(data)
        },
        afterInit: () => {
            console.warn('Console afterInit:')
        },
        beforeInit: () => {
            console.warn('Console beforeInit:')
        },
        change: data => {
            console.log('Console Change:')
            console.log(data)
        },
        update: data => {
            console.log('Console Update')
            console.log(data)
        },
        reset: data => {
            console.log('Console Reset')
            console.log(data)
        },
        submit: data => {
            console.log('Console Submit')
            console.log(data)
        },
        popstate: data => {
            console.log('Console Popstate')
            console.log(data)
        },
    }
});

SPFDSync.on('afterInit', () => {
    console.warn('OnFn afterInit')
})
SPFDSync.on('init', data => {
    console.warn('OnFn init')
    console.log(data)
})
SPFDSync.on('beforeInit', () => {
    console.warn('OnFn beforeInit')
})


SPFDSync.on('change', data => {
    console.log('OnFn Change:')
    console.log(data)
})

SPFDSync.on('update', data => {
    console.log('OnFn Update')
    console.log(data)
})
SPFDSync.on('reset', data => {
    console.log('OnFn Reset')
    console.log(data)
})
SPFDSync.on('submit', data => {
    console.log('OnFn Submit')
    console.log(data)
})
SPFDSync.on('popstate', data => {
    console.log('OnFn Popstate')
    console.log(data)
})

SPFDSync.once('change', data => {
    console.log('---OnceFn Change:')
    console.log(data)
})

SPFDSync.init()

let page = 2
let nextPage = document.querySelector('.next-page')
let prevPage = document.querySelector('.prev-page')
let resetSync = document.querySelector('.reset-sync')

if (!!nextPage) {
    nextPage.addEventListener('click', () => {
        document.querySelector('[name="paged"]').value = page
        page++

        SPFDSync.update()
    })
}
if (!!prevPage) {
    prevPage.addEventListener('click', () => {
        document.querySelector('[name="paged"]').value = page
        page--

        SPFDSync.update()
    })
}

if (!!resetSync) {
    resetSync.addEventListener('click', () => {
        SPFDSync.reset()
    })
}*/
