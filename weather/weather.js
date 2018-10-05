const request = require('request');

const apiKey = '<your key>';

var getWeather = (lat,lng,callback) => {
    request({
        url:`https://api.darksky.net/forecast/${apiKey}/${lat},${lng}`,
        json:true
    }, (error,response,body)=>{
        if(error){
            callback('unable to connect to server');
        }else if(response.statusCode === 200){
            callback(undefined,{
                temperature : body.currently.temperature,
                apparentTemperature : body.currently.apparentTemperature
            });
        }else{
            callback('unable to fetch weather');
        }
    }
)};

module.exports.getWeather = getWeather;