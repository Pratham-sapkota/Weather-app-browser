const request=require('request')
const api_key='245ff5d062fdd873a1b94b99d712ed3e'
const units='metric'

const forecast=(latitude,longitude,callback)=>{
    console.log(latitude,longitude)
    const weather_url=`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=${units}&appid=${api_key}`
    request({url:weather_url,json:true},(error,response)=>{
       if(error){
            callback('Couldn\'t connect to weather API',undefined )
        }else if(response.body.error){
                callback('Unable to find location',undefined)
        }else{
            const body1=response.body
            const temperature=body1.current.temp
            const weather=body1.current.weather[0].description
            callback(undefined,`It is currently ${temperature} degree celsius and there seems ${weather} .`)
        }
})
}

module.exports=forecast