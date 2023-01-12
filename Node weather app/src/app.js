import  path from "path"
import express from "express"
import { fileURLToPath } from "url"
import { dirname } from "path"
import hbs from "hbs"
import { forecast } from "./utils/forecast.js"
import { geocode } from "./utils/geocode.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname,"../public/")
const viewPath = path.join(__dirname,"../templates/views")
const partialPath = path.join(__dirname,"../templates/partials")

app.set("view engine","hbs")
app.set("views",viewPath)
hbs.registerPartials(partialPath)
app.use(express.static(publicDirectoryPath))

app.get("",(req,res) => {
    res.render("index",{
        title: "Weather app",
        name: "Rafat"
    })
})

app.get("/help",(req,res) => {
    res.render("help",{
        title: "Help",
        helpText: "This is help text",
        name: "Rafat"
    })
})

app.get("/about",(req,res) => {
    res.render("about",{
        title:"About",
        name:"Rafat"
    })
})

app.get("/weather",(req,res) => {
    if(!req.query.address){
        return res.send({
            error: "You must provide an address!"
        })
    }

    geocode(req.query.address,(error,{ latitude,longitude,location}) =>{
        if(error){
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get("/products",(req, res) => {
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })
    }
})

app.get("/help/*",(req,res) => {
    res.render("404",{
        errorMessage : "Help article not found",
        title: "404",
        name: "Rafat"
    })
})

app.get("*",(req,res) => {
    res.render("404",{
        errorMessage : "Page not found",
        title : "404",
        name: "Rafat"
    })
})
app.listen(port,() => {
    console.log("Server is up on port "+port)
})