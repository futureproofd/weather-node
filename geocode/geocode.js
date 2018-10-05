const request = require('request');

const apiKey = '<your key>';

var geocodeAddress = (a, callback) =>{
    //takes options object, and a callback function
    request({
        url:`http://www.mapquestapi.com/geocoding/v1/address?key=${apiKey}&location=${encodeURIComponent(a)}`,
        json:true
    },(error, response, body)=>{
        if(error){
            callback('unable to connect');
        //0 if OK
        }else if(body.info.statuscode === 0){
            callback(undefined,{
                address:a,
                latitude: body.results[0].locations[0].latLng.lat,
                longitude:body.results[0].locations[0].latLng.lng
            });
        }else{
            console.log('unable to get address');
        }
    });
};

module.exports.geocodeAddress = geocodeAddress;
