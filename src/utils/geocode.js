const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibWFub2oxOSIsImEiOiJjbHFwbGJ4NTgwbHc1MmtvOHVjeGd3Y2R4In0.bZ2y2-N1E7Ez0tVz50Igkw&limit=1'

    console.log(url)

    request({ url, json: true }, (error, { body }) => {

       console.log(body.features[0].center[1])
       console.log(body.features[0].center[0])
       
           if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
               
            })
        }
    })
}

module.exports = geocode