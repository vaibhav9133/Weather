const express = require("express")
const http = require("https")
const bodyParser = require("body-parser")

const app = express()
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))
app.get('/', function(req, res) {

    res.sendFile(__dirname + "/index.html")

})
app.post("/", function(req, res) {
    const query = req.body.cityName

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=metric&appid=f5183ca35c3bfbdd1d2ebb11a2a56962"

    http.get(url, function(response) {
        response.on("data", function(data) {
            const WeatherData = JSON.parse(data)
            let temp = WeatherData.main.temp
            const icon = WeatherData.weather[0].icon

            const desc = WeatherData.weather[0].description
            let t = Number.parseInt(temp)
            console.log(t)
            console.log(desc)

            const ic = WeatherData.weather[0].icon
            const img = "http://openweathermap.org/img/w/" + ic + ".png";

            res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celsius.</h1>")
            res.write("<p>The weather is currently " + desc + ".</p>")
            res.write("<img src='" + img + "' alt='Weather icon'>")
            res.send()
        })


    })
})


app.listen(process.env.PORT || 3000, function() {
    console.log("server is running")
})
