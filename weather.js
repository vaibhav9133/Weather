const express = require("express")
const request = require("request")
const http = require("https")
const bodyParser = require("body-parser")

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.get('/', function(req, res) {

    res.sendFile(__dirname + "/index.html")

})
app.post("/", function(req, res) {
    const query = req.body.cityName

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=metric&appid=f5183ca35c3bfbdd1d2ebb11a2a56962"

    http.get(url, function(response) {
        response.on("data", function(da) {
            const WeatherData = JSON.parse(da)
            let temp = WeatherData.main.temp
            const icon = WeatherData.weather[0].icon

            const desc = WeatherData.weather[0].description
            let t = Number.parseInt(temp)
            console.log(t)
            console.log(desc)
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("hi")
            res.send(`The temperature of ${query } is ${t}`)


        })


    })
})


app.listen(3000, function() {
    console.log("server is running")
})