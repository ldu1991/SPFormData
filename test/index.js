import SPFormData from '../src/spFormData'

let filter = document.querySelectorAll('#filter')

let spFD = new SPFormData(filter, {
    submitTimeout: true,
    delayBeforeSend: 650,
    autoSubmit: true,
    changeGetUrl: true,
    response: data => {
        console.log(data)
    }
});

spFD.response(data => {
    console.log(data)
})

// Test event:
filter.addEventListener('spFormDataResponse', (event) => {
    console.log(event.detail.query)
    // OR
    console.log(spFD.query)
})
