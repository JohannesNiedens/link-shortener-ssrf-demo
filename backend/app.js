const express = require("express");
const mongoose = require("mongoose");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/shortener", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Link = mongoose.model("Link", {
    name: String,
    url: String,
});

app.post("/links", async (req, res) => {
    const { name, url } = req.body;

    // Make a request to the provided URL to verify it's valid
    try {
        await fetch(url, { method: "HEAD" });
    } catch (error) {
        return res.status(400).json({ message: "Invalid URL provided." });
    }

    const link = new Link({ name, url });
    await link.save();

    res.json({ message: "Link created!", link });
});

app.get("/links", async (req, res) => {
    const links = await Link.find();
    res.json(links);
});

app.get("/links/:id/content", async (req, res) => {
    const link = await Link.findById(req.params.id);

    if (!link) {
        return res.status(404).json({ message: "Link not found." });
    }

    try {
        const response = await fetch(link.url);
        const content = await response.text();

        res.json({ content });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch link content." });
    }
});

app.delete("/links/:id", async (req, res) => {
    const link = await Link.findById(req.params.id);

    if (!link) {
        return res.status(404).json({ message: "Link not found." });
    }

    await link.deleteOne();

    res.json({ message: "Link deleted!" });
});

app.get("/links/:id/download", async (req, res) => {
    const link = await Link.findById(req.params.id);

    if (!link) {
        return res.status(404).json({ message: "Link not found." });
    }

    try {
        const response = await fetch(link.url);
        const content = await response.text();

        res.setHeader(
            "Content-Disposition",
            `attachment; filename=${link.name}.html`
        );
        res.setHeader("Content-Type", "text/html");
        res.send(content);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch link content." });
    }
});

app.listen(5000, () => console.log("Server started on port 5000"));
