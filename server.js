require("dotenv").config();
const path = require("path");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost/urlShortener", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const urlShortener = require("./models/shortUrl");

app = express();

app.use(express.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(express.static(path.join(__dirname, "public")));

app.post("/getShortUrl", async (req, res) => {
    console.log("here");
    const fullUrl = req.body.fullUrl;
    if (fullUrl == null || fullUrl.length == 0) {
        console.log("Error!!!");
        res.json({ Error: true });
    } else {
        urlShortener.findOne({ fullUrl: fullUrl }).then((result) => {
            if (result != null) {
                // Document exists
                res.json({ Result: result, Error: false });
            } else {
                urlShortener.create({ fullUrl: fullUrl }).then((result) => {
                    if (result != null) {
                        res.json({ Result: result, Error: false });
                    } else {
                        res.json({ Error: true });
                    }
                });
            }
        });
    }
});

app.get("/", (req, res) => {
    res.render("index.html");
});

// app.get("/getShortUrl", async (req, res) => {
//     urlShortener.find().then((result) => {
//         res.json(result);
//     });
// });


app.get("/url", (req, res) => {
    const url = req.query.shortUrl;
    console.log(url);
    urlShortener.findOne({ shortUrl: url }).then((result) => {
        if (result.fullUrl != null) {
            res.redirect(result.fullUrl);
        }
    });
});

app.listen(process.env.PORT, () => {
    console.log("listening");
});
