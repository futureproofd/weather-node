const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

//Command-line arg options:
const argv = yargs
    .options({
        a: {
            demand:true,
            alias:'address',
            describe:'address to fetch weather for',
            string:true
        }
    })
    .help()
    .alias('help','h')
    .argv;

geocode.geocodeAddress(argv.a, (error, results)=>{
    if(error){
        console.log(error);
    }else{
        console.log(results.address);
        //lat,lng,callback
        weather.getWeather(results.latitude,results.longitude, (errorMessage, weatherResults)=>{
            if(error){
                console.log(errorMessage)
            }else{
                console.log(`It's currently ${weatherResults.temperature}. Feels like ${weatherResults.apparentTemperature}`);
            }
        });
    }
});



