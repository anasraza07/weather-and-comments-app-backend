console.log("hello world from server");
import express from "express";
// import cors from "cors";
import path from "path";
const __dirname = path.resolve();

const app = express();
// app.use(cors());
app.use(express.json()) // body parser

// app.get("/", (req, res) => {
//     console.log("hello world!", new Date());
//     res.send("hello world! " + new Date());
// })

app.get("/profile", (req, res) => {
    console.log("My profile!", new Date());
    res.send("My profile! " + new Date());
})

app.get("/weather/:cityName", (req, res) => {
    console.log("Current Weather", new Date());

    console.log("req.params.cityName:", req.params.cityName)

    console.log("req.query.unit:", req.query.unit)
    console.log("req.query.side:", req.query.side)
    console.log("req.query.age:", req.query.age)

    let weatherData = {
        karachi: {
            city: "Karachi",
            tempInC: 30,
            humidity: 21,
        },
        london: {
            city: "London",
            tempInC: 20,
            humidity: 11,
        }
    }

    let userCityInput = req.params.cityName;
    let weatherToBeSend = weatherData[userCityInput]

    if (weatherToBeSend) {
        res.send(weatherToBeSend);
    }
    else {
        res.status(404).send({
            msg: `weather data is not available for ${req.params.cityName}`
        })
    }
})

const comments = [];

app.post("/comment/:name", (req, res) => {
    console.log("req.params.name:", req.params.name)
    console.log("req.body.comment:", req.body.comment)

    const name = req.params.name;
    const comment = req.body.comment;
    comments.push({
        name: name,
        comment: comment
    })

    res.send({ msg: "Comment posted successfully" })
})

app.get("/comments", (req, res) => {
    res.send(comments)
})

app.use(express.static(path.join(__dirname, "public")))
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Example server listening on port ${PORT} `)
})