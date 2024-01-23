const { application } = require('express')
const express = require('express')
const path = require('path')
const hbs= require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
const port= process.env.PORT || 3000

//Define paths for express configs
const publicDir= path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')




//Setup handle bars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDir))

app.get('',(req, res) =>{

    res.render('index',{
        title: 'Weather',
        name: 'Manoj'

    })
})
app.get('/help', (req, res) => {

    res.render('help',{
        title: 'Help',
        name: 'Manoj'
    
    })
    

})

app.get('/about', (req, res) => {

    res.render('about',{
        title: 'About',
        name: 'Manoj'
        
    })    

})

app.get('/weather', (req, res) => {

    if(!req.query.address){

        return res.send({
            error: 'No address provided please provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location}= {}) => {

        if(error){
            return res.send({error})
           }
        
        console.log(latitude + " " + longitude)

        forecast(latitude,longitude, (error, desc ) => {
           
            if(error){
                return console.log(error)
                }
        
            return res.send({
                    Location: location,
                    Weather: desc
            
                })


        })
    })



    

})

app.get('/products', (req,res)=> {

if (!req.query.search){
    return res.send({
        error: 'please provide a search term'
    })
}

    console.log(req.query)
    res.send({
        products: []
    })

})

app.get('/help/*', (req,res) => {

    res.render('error',{
        title: 'Help article not found'
    })
})

app.get('*', (req,res) => {

    res.render('error',{
        title: 'Error 404',
       

    })
    
    

})

app.listen(port,() => {

    console.log('Server is up and running on port' + port)
})