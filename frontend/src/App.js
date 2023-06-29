import React, { useState, useEffect } from "react";
import NewLink from "./components/NewLink/NewLink";
import Links from "./components/Links/Links";
import Modal from "./components/UI/Modal";
import "./App.css";

const App = () => {
  const [links, setLinks] = useState([]);
  const [selectedLink, setSelectedLink] = useState(null);
  const [linkContent, setLinkContent] = useState("");

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

    // Check if response is successful
    if (!response.ok) {
      throw new Error('Failed to create link');
    }

    const data = await response.json();

    // Check if data.link exists before trying to access its properties
    if (data && data.link) {
        setLinks((prevLinks) => [
            ...prevLinks,
            { id: data.link.id, name: link.name, url: link.url },
        ]);
    } else {
        console.error('Failed to create link: ', data.message);
    }
  };

  const deleteLinkHandler = async (id) => {
    await fetch(`http://localhost:5000/links/${id}`, {
      method: "DELETE",
    });

    setLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));
  };

  const viewContentHandler = async (id) => {
    const response = await fetch(`http://localhost:5000/links/${id}/content`);
    const data = await response.json();
    setSelectedLink(id);
    setLinkContent(data.content);
  };

  const closeModalHandler = () => {
    setSelectedLink(null);
    setLinkContent("");
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
