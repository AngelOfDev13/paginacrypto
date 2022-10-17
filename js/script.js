const selectorMoneda = document.querySelector('#moneda-select');
const selectorCripto = document.querySelector('#cripto-select');
const formulario = document.querySelector('#form');
const infoCoin = document.querySelector('#coin-info');
const btnInput = document.querySelector('#input');
// selectorMoneda.addEventListener('change', e => {


// });

// selectorCripto.addEventListener('change', e => {


// });

formulario.addEventListener('submit', async e => {
    e.preventDefault();

    infoCoin.innerHTML = 
    `
    <div class="loader"></div>`
    const monedaSelect = [...selectorMoneda.children].find(option => option.selected).value;
    const criptoSelect = [...selectorCripto.children].find(option => option.selected).value;
    const montoValue = monto.value;
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoSelect}&tsyms=${monedaSelect}`;
    const reponse = await (await fetch(url, { method: 'GET' })).json();
    const price = reponse.DISPLAY[criptoSelect][monedaSelect].PRICE;
    const high = reponse.DISPLAY[criptoSelect][monedaSelect].HIGH24HOUR;
    const low = reponse.DISPLAY[criptoSelect][monedaSelect].LOW24HOUR;
    const change = reponse.DISPLAY[criptoSelect][monedaSelect].CHANGEPCT24HOUR;

    if (!montoValue) {
        infoCoin.innerHTML = `
        <p>El Precio acutal es: <span class="coin-value">${price}</span></p>
        <p>El Precio mas alto es: <span class="coin-value">${high}</span></p>
        <p>El Precio mas bajo es: <span class="coin-value">${low}</span></p>
        <p>Diferencia 24h es: <span class="coin-value">${change}%</span></p>
    `
    } else {

        const priceRaw = reponse.RAW[criptoSelect][monedaSelect].PRICE;
        const result = (montoValue / priceRaw).toFixed(4);
        infoCoin.innerHTML = `
        <p>El Precio acutal es: <span class="coin-value">${price}</span></p>
        <p>El Precio mas alto es: <span class="coin-value">${high}</span></p>
        <p>El Precio mas bajo es: <span class="coin-value">${low}</span></p>
        <p>Diferencia 24h es: <span class="coin-value">${change}%</span></p>
        <p>Puedes comprar: <span class="coin-value">${change}%</span></p>
    `

    }



})