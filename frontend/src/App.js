import React, { useState } from "react";
import "./App.css";

function App() {
    const [fullUrl, setFullUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");

    const shortenUrl = async () => {
        const response = await fetch("http://localhost:5000/shorten", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fullUrl: fullUrl }),
        });
        const data = await response.json();
        setShortUrl(
            window.location.origin.replace(":3000", ":5000") + "/" + data.short
        );
    };

    return (
        <div className="App">
            <h1>URL Shortener</h1>
            <input
                type="text"
                placeholder="Enter URL"
                value={fullUrl}
                onChange={(e) => setFullUrl(e.target.value)}
            />
            <button onClick={shortenUrl}>Shorten</button>
            {shortUrl && (
                <div>
                    <a href={shortUrl}>{shortUrl}</a>
                    <iframe
                        src={shortUrl}
                        title="Preview"
                        width="500"
                        height="500"
                    />
                </div>
            )}
        </div>
    );
}

export default App;
