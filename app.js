const yargs = require('yargs');
const axios = require('axios');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const geoApiKey = '';
const weatherApiKey = '';

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

var mapQuestUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=${geoApiKey}&location=${encodeURIComponent(argv.address)}`;

//use axios library (with promises) to chain both API calls:
axios.get(mapQuestUrl).then((response) => {
    if(response.data.info.statuscode === 0){
        console.log(argv.address); 
        var lat = response.data.results[0].locations[0].latLng.lat;
        var lng = response.data.results[0].locations[0].latLng.lng;
        //chained 2nd
        return axios.get(`https://api.darksky.net/forecast/${weatherApiKey}/${lat},${lng}`);
    }else{
        throw new Error('Unable to retrieve address');
    }
//chained 2nd
}).then((response)=>{
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently: ${temperature}, but feels like ${apparentTemperature}`);
}).catch((e) =>{
    if(e.code === 'ENOTFOUND'){
        console.log('could not connect');
    }else{
        console.log(e.message);
    }
});