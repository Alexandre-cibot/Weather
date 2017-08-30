/**
 * Created by acibot on 22/07/2016.
 */
const prompt = require('prompt');
const http = require('http');
const { SHORTCUTS, DEFAULT_CITY } = require('./shortcuts');

  prompt.start();
  prompt.get('city', function(err, result){
    let city = SHORTCUTS[result.city] ? SHORTCUTS[result.city] : (result.city || DEFAULT_CITY);

    const request = getWeather(city, (response) => {
      let body ='';
      response.on('data', function(chunk){
        body += chunk;
      });
      response.on('end', function(chunk){
        if(response.statusCode === 200){
            try{
              const data = JSON.parse(body);
              printMessage(data.name, data.main.temp, data.main.temp_max, data.main.temp_min)
            }
            catch(error){
              console.error(error.message); 
            }
        }
        else{
          console.error('Impossible de récupérer les données.')
        }
      });
    });
  });//End of prompt.get();


function getWeather(city, callback) {
  http.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=ed877c27dd1d147a4a5ebbb5de0c8c2c&units=metric', callback);
}

function printMessage(city, temperatureNow, temperatureMax, temperatureMin) {
    console.log(
        `......\n.....\n....\n
        /* Weather Informations dear Alex */\n 
        A ${city}, la température est de ${temperatureNow}°C actuellement.\n 
        Température maximum: ${temperatureMax}°C \n 
        Température minimum: ${temperatureMin}°C \n 
        ......\n.....\n....\n`
    )
};


