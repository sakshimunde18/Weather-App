import request from "request"
export const forecast = (latitude,longitude,callback) => {
    const url = "http://api.weatherstack.com/current?access_key=0fac775cd3af1babfea0946e9ce4f2a9&query="+latitude+","+longitude
    request({url : url, json: true},(error,response) => {
        if(error){
            callback("Unable to connect to location services!",undefined)
        }
        else if(response.body.features ==""){
            callback("Unable to find the location. Try another search!",undefined)
        }
        else{
            callback(undefined,response.body.current.weather_descriptions + ". It is currently " +response.body.current.temperature + " degrees out. It feels like " + response.body.current.feelslike + "degrees out.")
        }
    })
}
    