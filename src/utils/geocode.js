const request=require('request')

// const api_key='245ff5d062fdd873a1b94b99d712ed3e'
// const city_name='Kathmandu'

const geocode=(city_name,callback)=>{
    const geocode_url=`http://api.openweathermap.org/geo/1.0/direct?q=${city_name}&appid=245ff5d062fdd873a1b94b99d712ed3e`
    request({url:geocode_url,json:true},(error,{body})=>{
            
        
         if(error){
            callback("no internet",undefined)
         } else if(body.cod==='400' || body===[]){
            callback("Unable to find location",undefined)
        } 
        else{
            callback(undefined, {
                place_name:body[0].name,
                latitude:body[0].lat,
                longitude:body[0].lon
             }
             ) 
             
    }

    })

    }


module.exports=geocode