const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(__filename)

const app=express()
const port=process.env.PORT || 3000
const publicDirectory=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')



app.use(express.static(publicDirectory))
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Pratham Sapkota'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Pratham sapkota',
        message:'Hello if you have any queriezs contact me here!!',
        contact:'12124533452'
    })
})



app.get('/weather',(req,res)=>{
    
    if(!req.query.address){
        return res.send({
            error:"You must give an address"
        })

    }     
    

    geocode(req.query.address,(error,{latitude,longitude,place_name}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
                return res.send({
                    forecast:forecastData,
                    location:place_name
                })
            

        })

    })
    // res.send({
    //     address:'Kathmandu',
    //     Temperature:'28 C', 
    //     location:req.query.address
    // })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({
            error:'You must provide a search term '
        })
    }
    res.send({
        products:[]
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Pratham'
    })
})
app.get('*',(req,res)=>{
    res.render('error',{
        title:'Error',
        name:'Pratham sapkota',
        errorMessage:'404'
    })
})


app.listen(port,()=>{
    console.log('listeningn port '+port)
})
