import request from "request"
export const geocode = (address,callback) => {
    const geocodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoicmFmYXRuYWF6IiwiYSI6ImNsMDNoem42ZjBjYmkzZG1qaHpzZGtuZjMifQ.hs1bx0L_T4C3ar8jl-xfZQ&limit=1"

    request({url : geocodeURL, json: true},(error,response) => {
        if(error){
            callback("Unable to connect to location services!",undefined)
        }
        else if(response.body.features ==""){
            callback("Unable to find the location. Try another search!",undefined)
        }
        else{
            callback(undefined,{
                longitude : response.body.features[0].center[0],
                latitude : response.body.features[0].center[1],
                location : response.body.features[0].place_name

            })
        }
    })
}
    