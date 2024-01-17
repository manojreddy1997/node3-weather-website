const request = require('request');

const forecast = (lat,lan, callback) =>{

 const url = 'http://api.weatherstack.com/current?access_key=0e317bd41eec53115a3fd58f382cc579&query=' +lat + ',' + lan 

 console.log(url)
request({url:url, json: true }, (error, {body}= {}) =>{ 

    if(error){
        callback("Unable to connect to error")
         
    }    else {

        callback(undefined, {
        
          temp: body.current.temperature,
          feeslike: body.current.feelslike,
         desc: body.current.weather_descriptions[0]
         
        })

    }
    
})

}

module.exports= forecast