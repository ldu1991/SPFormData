import SPFormData from '../src/sp-form-data'

let filter = document.querySelectorAll('#filter')

let spFD = new SPFormData(filter, {
    submitTimeout: true,
    delayBeforeSend: 650,
    autoSubmit: true,
    changeGetUrl: true,
    formSync: false,
    response: data => {
        console.log(data)
    }
});

spFD.response(data => {
    console.log(data)
})


new SPFormData('#filter-sync, #pagination-sync', {
    submitTimeout: true,
    delayBeforeSend: 650,
    autoSubmit: true,
    changeGetUrl: true,
    formSync: true,
    response: data => {
        console.log(data)
    }
});

// Test event:
// filter.addEventListener('spFormDataResponse', (event) => {
//     console.log(event.detail.query)
//     // OR
//     console.log(spFD.query)
// })
