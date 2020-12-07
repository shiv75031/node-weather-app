const request=require("request");

const forecast=(latitude,longitude,callback)=>{
    const url="http://api.weatherstack.com/current?access_key=33f43557747824733a3b626bb68e8134&units=m&query="+latitude+","+longitude;
    request({ url,json:true},(error,{body})=>{
        if(error){
            callback("Unable to connect to weather service!",undefined);
        }
        else if(body.error){
            callback("Unable to find location",undefined);
        }
        else{
            callback(undefined,"Temprature is "+body.current.temperature+",feels like "+body.current.feelslike
            );
        }
    });
}

module.exports=forecast;