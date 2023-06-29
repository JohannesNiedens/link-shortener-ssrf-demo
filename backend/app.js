const express = require("express");
const axios = require('axios');
const fs = require('fs').promises;
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let idCounter = 0;
const links = new Map();

app.get("/links", (req, res) => {
    const linksArray = Array.from(links.values());
    res.json(linksArray);
});

app.post("/links", async (req, res) => {
    const { name, url } = req.body;
    const id = ++idCounter;

    if (!url.startsWith('file://')) {
        try {
            await axios.head(url);
        } catch (error) {
            return res.status(400).json({ message: "Invalid URL provided." });
        }
    }

    const link = { id, name, url };
    links.set(id, link);

    res.json({ message: "Link created!", link });
});

app.get("/links/:id/content", async (req, res) => {
    const link = links.get(Number(req.params.id));

    if (!link) {
        return res.status(404).json({ message: "Link not found." });
    }

    try {
        let content;
        if (link.url.startsWith('file://')) {
            // If it's a file URL, use the fs module to read the file.
            content = await fs.readFile(link.url.slice(7), 'utf8');
        } else {
            // If it's not a file URL, fetch it with Axios as before.
            const response = await axios.get(link.url);
            content = response.data;
        }

        res.json({ content });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch link content." });
    }
});

app.delete("/links/:id", (req, res) => {
    const id = Number(req.params.id);
    
    if (!links.has(id)) {
        return res.status(404).json({ message: "Link not found." });
    }

    links.delete(id);
    res.json({ message: "Link deleted!" });
});

app.listen(5000, () => console.log("Server started on port 5000"));
