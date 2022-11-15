const $amount = document.querySelector('#numberInput')
const $initialCurrency = document.querySelector('#initialCurrency')
const $exchangeBtn = document.querySelector('#valueExchangeBtn')
const $finalCurrency = document.querySelector('#finalCurrency')
const $conversionOutput = document.querySelector('#conversionOutput')
const $convertBtn = document.querySelector('#convertBtn')

const $loadingGif = document.querySelector('.loadingGif')
const $gitHubIcon = document.querySelector('.gitHubIcon')

$initialCurrency.onchange = () => {
    $gitHubIcon.style.display = 'none'
    request()
}

$finalCurrency.onchange = () => {
    $gitHubIcon.style.display = 'none'
    request()
}

$exchangeBtn.onclick = () => {
    const tempValue = $initialCurrency.value
    $initialCurrency.value = $finalCurrency.value
    $finalCurrency.value = tempValue

    if ($amount.value != '') {
        $gitHubIcon.style.display = 'none'
        
        request()
    } else {
        $conversionOutput.style.color = 'red'
        $conversionOutput.style.fontSize = '0.6em'
        $conversionOutput.style.height = '3em'
        $conversionOutput.innerHTML = 'Valor de conversão inválido'
    }
}

$convertBtn.onclick = () => {
    $gitHubIcon.style.display = 'none'

    if ($amount.value != '') {
        request()
    } else {        
        $conversionOutput.style.color = 'red'
        $conversionOutput.style.fontSize = '0.6em'
        $conversionOutput.style.height = '3em'
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
    $conversionOutput.style.fontSize = '0.8em'
    $conversionOutput.style.height = '2.25em'

    $loadingGif.style.display = 'none'

    const result = data.conversion_result
    $conversionOutput.innerHTML = result
}

function error() {
    $loadingGif.style.display = 'none'
    $convertBtn.innerHTML = 'Tentar novamente'
    
    $conversionOutput.style.color = 'red'
    $conversionOutput.style.fontSize = '0.6em'
    $conversionOutput.style.height = '3em'
    $conversionOutput.innerHTML = 'Desculpe, ocorreu um erro na requisição'

    $convertBtn.onclick = () => {
        location.reload()
    }
}