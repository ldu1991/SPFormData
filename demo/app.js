import SPFormData from '../src/core'

let filter = document.querySelectorAll('#filter')

let SPFD = new SPFormData(filter, {
    separator: ',',
    delayBeforeSend: 650,
    autoSubmit: true,
    changeUrlQuery: true,
    formSync: false,
    presetQueries: ['option', 'search'],
    on: data => {
        console.log(data)
    }
});

SPFD.on(function (data) {
    console.log(data)
})

let reset = document.querySelector('.reset')

if (!!reset) {
    reset.addEventListener('click', () => {
        SPFD.reset()
    })
}


let SPFDSync = new SPFormData('#filter-sync, #pagination-sync', {
    separator: ',',
    delayBeforeSend: 650,
    autoSubmit: true,
    changeUrlQuery: true,
    formSync: true,
    presetQueries: [],
    on: data => {
        console.log(data)
    }
});

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
}
