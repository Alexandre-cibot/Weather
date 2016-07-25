/**
 * Created by acibot on 22/07/2016.
 */
var prompt = require('prompt');
 prompt.start();
 prompt.get('city', function(err, result){

    var http = require('http');
    var city = result.city;
    // I will check the weather of Bussy-Saint-Georges pretty much everyday, so I set this city as the default city.
    if(city == ''){city = 'Bussy-Saint-Georges,fr'}
        
    var request = http.get('http://api.openweathermap.org/data/2.5/forecast/city?q=' + city + '&APPID=d8e3d3cfdccb6e72084a58fe33e2104c&units=metric', function(response){
    //console.log(response.statusCode);
    var body ='';
    response.on('data', function(chunk){
        body += chunk;
    });
    response.on('end', function(chunk){
        if(response.statusCode === 200){
            try{
                var data= JSON.parse(body);
                printMessage(data.city.name, data.list[1].main.temp, data.list[1].main.temp_max, data.list[1].main.temp_min)
            }
            catch(error){
                   console.error(error.message); 
            }
        }
        else{
            console.error('Impossible de récupérer les données.')
        }
       
    });

});//End of prompt.get();

 });


var printMessage = function(city, temperatureNow, temperatureMax, temperatureMin) {
    console.log(
        '......'+'\n'+'.....'+'\n'+'....'+'\n'+'/* Weather Informations dear Alex */' + '\n' +
        'A ' + city + ', la température est de ' + temperatureNow + '°C acutellement.' + "\n" +
        'Température maximum : ' + temperatureMax + '°C' + "\n" +
        'Température minimum : ' + temperatureMin + '°C' + "\n" +
        '......'+'\n'+'.....'+'\n'+'....'+'\n'
    )
};


