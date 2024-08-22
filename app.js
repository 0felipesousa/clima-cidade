const searchInput = document.querySelector('.search-input')
const searchBtn = document.querySelector('.search-btn')

const conteudo = document.querySelector('.conteudo')
const cidade = document.querySelector('#city')
const temperatura = document.querySelector('#temperatura')
const imgClima = document.querySelector('.image-clima')

const fetchTemperatura = async (cidade) => {
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=33c339ba8377b45598527147fcdd5ed6`)
        if (response.status === 200) {
            const obj = await response.json();
            console.log(obj)
            return obj
        }
    }catch (error) {
        console.error('Erro', error)
    }
    
}
const mostrarCidadeEtemp = async () => {
    const dataTemperatura = await fetchTemperatura(searchInput.value)
    if(dataTemperatura) {
        cidade.innerHTML = `${dataTemperatura.name}, ${dataTemperatura.sys.country}`
        temperatura.innerHTML = `Temperatura: ${dataTemperatura.main.temp} C`
        imgClima.src = `http://openweathermap.org/img/wn/${dataTemperatura.weather[0].icon}@2x.png`
        conteudo.style.display = 'flex';
    }
}

document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        if(searchInput.value !== '')
        mostrarCidadeEtemp()
    }
})
searchBtn.addEventListener('click', function(){
    if(searchInput.value !== ''){
        mostrarCidadeEtemp()
    }
})
