const express = require("express");
const mongoose = require("mongoose");
const ShortUrl = require("./models/shortUrl");
const fetch = require("node-fetch");
const cors = require("cors");
const app = express();

app.use(cors());

mongoose.connect("mongodb://localhost/urlshortener", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/shorten", async (req, res) => {
    try {
        // Fetch the URL contents to validate the URL.
        const response = await fetch(req.body.fullUrl);

        if (response.ok) {
            const url = new ShortUrl({ full: req.body.fullUrl });
            await url.save();
            res.json({ short: url.short });
        } else {
            res.status(400).json({ error: "Invalid URL" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error validating URL" });
    }
});

app.get("/:shortUrl", async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });

    if (shortUrl) {
        res.redirect(shortUrl.full);
    } else {
        res.status(404).json({ error: "Short URL not found" });
    }
});

app.listen(5000);
