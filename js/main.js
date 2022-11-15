const $convertBtn = document.querySelector('#convertBtn')
const $amount = document.querySelector('#numberInput')
const $initialCurrency = document.querySelector('#initialCurrency')
const $exchangeBtn = document.querySelector('#valueExchangeBtn')
const $finalCurrency = document.querySelector('#finalCurrency')
const $conversionOutput = document.querySelector('#conversionOutput')
const $errorOutput = document.querySelector('#errorOutput')

$exchangeBtn.onclick = () => {
    const tempValue = $initialCurrency.value

    $initialCurrency.value = $finalCurrency.value
    $finalCurrency.value = tempValue

    request()
}

$initialCurrency.onchange = () => {
    request()
}

$finalCurrency.onchange = () => {
    request()
}

$convertBtn.onclick = () => {
    request()
}

function request() {
    // start loading animation

    fetch(`https://v6.exchangerate-api.com/v6/7394fe02a5811e6760b68b4b/pair/${$initialCurrency.value}/${$finalCurrency.value}/${$amount.value}`)
    .then(getResponse)
    .then(conversionResult)
    .catch(error)
}

function getResponse(response) {
    if (response.status === 200) {
        return response.json()
    }
}

function conversionResult(data) {
    // finish loading animation

    const result = data.conversion_result
    $conversionOutput.innerHTML = result
    console.log(result)
}

function error() {
    $conversionOutput.style.display = 'none'
    $errorOutput.style.display = 'block'
    $convertBtn.innerHTML = 'Tentar novamente'

    $convertBtn.onclick = () => {
        location.reload()
    }
}