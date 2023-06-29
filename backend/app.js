const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let links = [];  // Using array to store links
let idCounter = 0;  // Counter to generate unique ids

app.post("/links", async (req, res) => {
    const { name, url } = req.body;

    try {
        await fetch(url, { method: "HEAD" });
    } catch (error) {
        return res.status(400).json({ message: "Invalid URL provided." });
    }

    const link = { id: idCounter++, name, url };
    links.push(link);

    res.json({ message: "Link created!", link });
});

app.get("/links", async (req, res) => {
    res.json(links);
});

app.get("/links/:id/content", async (req, res) => {
    const link = links.find(link => link.id == req.params.id);

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
    const index = links.findIndex(link => link.id == req.params.id);

    if (index === -1) {
        return res.status(404).json({ message: "Link not found." });
    }

    links.splice(index, 1);

    res.json({ message: "Link deleted!" });
});

app.get("/links/:id/download", async (req, res) => {
    const link = links.find(link => link.id == req.params.id);

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
