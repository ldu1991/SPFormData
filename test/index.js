import SPFormData from '../src/spFormData'

let filter = document.querySelectorAll('#filter')

new SPFormData(filter, {
    submitTimeout: true,
    delayBeforeSend: 650,
    autoSubmit: true,
    changeGetUrl: true,
    response: data => {
        console.log(data)
    }
});
