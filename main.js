const $ = document.querySelector.bind(document)

const container = $('.container')
const spring = $('.spring')
const summer = $('.summer')
const autumn = $('.autumn')
const winter = $('.winter')
const background = $('.background')
const board= $('.board')
const search = $('.board__search')

const city = $('.location__city')
const degree = $('.dataDegrees__text')
const state = $('.data__state')
const time =  $('.location__dateAndTime')

const seasons = [
  'spring',
  'summer',
  'autumn',
  'winter'
] 

document.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    $('.abc').innerHTML = `
    <div class="rotating" style='width: 100%; text-align: center; height: 300px; position:relative; z-index: 100; font-size: 80px; color: rgb(255, 255, 255);'>
      <i class="fa-solid fa-spinner" style='line-height: 300px; text-shadow: 2px 2px black'></i>
    </div>
    `
    const changeWeatherUI = async function() {
      let searchValue
      searchValue=search.value
    
      const cityAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${searchValue}&limit=5&appid=d25394650e2cd57e53c3eb84e884a69c`
      let dataAPI = await fetch(cityAPI)
        .then(response => response.json())
        .then(dataCity => {
          return `https://api.openweathermap.org/data/2.5/weather?lat=${dataCity[0].lat}&lon=${dataCity[0].lon}&lang=vi&appid=d25394650e2cd57e53c3eb84e884a69c`
        })
        .then(api => fetch(api))
        .then(res => res.json())
        .then(data => {

          let season 

          if (Math.floor(data.main.temp - 273.15) < 10) season = seasons[3]
          if (Math.floor(data.main.temp - 273.15) < 20, Math.floor(data.main.temp - 273.15) >=10) season = seasons[0]
          if (Math.floor(data.main.temp - 273.15) < 25, Math.floor(data.main.temp - 273.15) >=20) season = seasons[2]
          if (Math.floor(data.main.temp - 273.15) >= 25) season = seasons[1]

          const setBackground = (season) => {
            board.style.backgroundImage = `url('./asset/${season}.png')`;
            board.style.transition= '0.4s ease-out'
            container.style.backgroundImage = `url('./asset/${season}.png')`;
            container.style.transition= '0.2s ease-out'
          }
          setBackground(season)


//           const getTime = () => data.timeZone

//           let d = new Date((new Date().getTime())-25200*1000)
//           d.toISOString()
//  console.log(d)

    // const dateBuilder = (timezone) => {
      
    //   const nowInLocalTime = Date.now()  + 1000 * (timezone / 3600);
    //   const millitime = new Date(nowInLocalTime);
    //   const dateFormat = millitime.toLocaleString();

    //   let day = dateFormat.toLocaleString("en-US", {weekday: "long"});
    //   let month = dateFormat.toLocaleString("en-US", {month: "long"}); 
    //   let date = dateFormat.toLocaleString("en-US", {day: "numeric"});
    //   let year = dateFormat.toLocaleString("en-US", {year: "numeric"}); 
    //   let hours = dateFormat.toLocaleString("en-US", {hour: "numeric"}); 
    //   let minutes = dateFormat.toLocaleString("en-US", {minute: "numeric"});

    //   console.log( `${day} ${date} ${month} ${year} ${hours}:${minutes}`)
    // }

// dateBuilder(data.timeZone)

          console.log(data)
          const htmls = () => {
            return `
            <div class="board__location">
                <div class="location__city">${data.name}, ${data.sys.country}</div>
                <div class="location__dateAndTime">${new Date().toLocaleString('vi')}</div>
            </div>
            <div class="board__data">
                <div class="data__degrees">
                    <div class="dataDegrees__background"></div>
                    <div class="dataDegrees__text" value='${Math.floor(data.main.temp- 273.15)}'>${Math.floor(data.main.temp- 273.15)} °C</div>
                </div>
                <div class="data__state">${data.weather[0].description}</div>
                <div class="data__specificInfo">
                    <div class="specificInfo__height">
                        <i class="fa-regular fa-eye"></i>
                        <span class="">${data.visibility} (m)</span>
                    </div>
                    <div class="specificInfo__windVelocity">
                        <i class="fa-solid fa-wind"></i>
                        <span class="">${data.wind.speed} (m/s)</span>
                    </div>
                    <div class="specificInfo__cloudCoverage">
                        <i class="fa-solid fa-cloud-sun"></i>
                        <span class="">${data.clouds.all} (%)</span>
                    </div>
                </div>
            </div>
            `
          }
          return htmls()
        })
        .then(htmls => $('.abc').innerHTML = htmls)
        .catch(err => {
          $('.abc').innerHTML = `
          <div class="location__city" style='margin-top: 30px'>Không tồn tại</div>
          `
        })
    }

    changeWeatherUI()
    search.value = ''
    }

});
