import React, { useState, useEffect } from "react";

import NewLink from "./components/NewLink/NewLink";
import Links from "./components/Links/Links";
import Modal from "./components/UI/Modal";

import "./App.css";

const App = () => {
    const [links, setLinks] = useState([]);
    const [selectedLink, setSelectedLink] = useState(null); // new state to manage the selected link
    const [linkContent, setLinkContent] = useState(""); // state to manage the content of the link

    useEffect(() => {
        const fetchLinks = async () => {
            const response = await fetch("http://localhost:5000/links");
            const data = await response.json();
            setLinks(data);
        };

        fetchLinks();
    }, []);

    const addLinkHandler = async (link) => {
        const response = await fetch("http://localhost:5000/links", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(link),
        });

        const data = await response.json();

        setLinks((prevLinks) => [
            ...prevLinks,
            { _id: data.link._id, name: link.name, url: link.url },
        ]);
    };

    const deleteLinkHandler = async (id) => {
        await fetch(`http://localhost:5000/links/${id}`, {
            method: "DELETE",
        });

        setLinks((prevLinks) => prevLinks.filter((link) => link._id !== id));
    };

    // function to handle the click of the "View content of the url" button
    const viewContentHandler = async (id) => {
        const response = await fetch(
            `http://localhost:5000/links/${id}/content`
        );
        const data = await response.json();
        setSelectedLink(id); // set the selected link
        setLinkContent(data.content); // set the content of the link
    };

    // function to handle the close of the modal
    const closeModalHandler = () => {
        setSelectedLink(null); // reset the selected link
        setLinkContent(""); // reset the content of the link
    };

    return (
        <div>
            <NewLink onAddLink={addLinkHandler} />
            <Links
                items={links}
                onDeleteLink={deleteLinkHandler}
                onViewContent={viewContentHandler}
            />

            {selectedLink && (
                <Modal onClose={closeModalHandler}>
                    <textarea readOnly value={linkContent} />
                </Modal>
            )}
        </div>
    );
};

export default App;
