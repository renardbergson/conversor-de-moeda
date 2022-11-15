const $convertBtn = document.querySelector('#convertBtn')
const $amount = document.querySelector('#numberInput')
const $initialCurrency = document.querySelector('#initialCurrency')
const $exchangeBtn = document.querySelector('#valueExchangeBtn')
const $finalCurrency = document.querySelector('#finalCurrency')
const $loadingGif = document.querySelector('.loadingGif')
const $conversionOutput = document.querySelector('#conversionOutput')

$amount.onkeypress = () => {
    $conversionOutput.innerHTML = ''
}

$initialCurrency.onchange = () => {
    request()
}

$finalCurrency.onchange = () => {
    request()
}

$exchangeBtn.onclick = () => {
    const tempValue = $initialCurrency.value

    $initialCurrency.value = $finalCurrency.value
    $finalCurrency.value = tempValue

    request()
}
$convertBtn.onclick = () => {
    if ($amount.value != '') {
        request()
    } else {
        $conversionOutput.style.color = 'red'
        $conversionOutput.style.fontSize = '0.6em'
        $conversionOutput.innerHTML = 'Valor de conversão inválido'
    }
}

function request() {
    $loadingGif.style.display = 'block'

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
    $conversionOutput.style.color = 'green'
    $conversionOutput.style.fontSize = '1em'

    $loadingGif.style.display = 'none'

    const result = data.conversion_result
    $conversionOutput.innerHTML = result
}

function error() {
    $loadingGif.style.display = 'none'
    
    $conversionOutput.style.color = 'red'
    $conversionOutput.style.fontSize = '0.6em'
    $conversionOutput.innerHTML = 'Desculpe, ocorreu um erro na requisição'

    $convertBtn.onclick = () => {
        $conversionOutput.innerHTML = ''
        request()
    }
}