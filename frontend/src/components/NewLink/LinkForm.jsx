import React, { useState } from "react";

import "./LinkForm.css";

const LinkForm = (props) => {
    const [enteredName, setEnteredName] = useState("");
    const [enteredLink, setEnteredLink] = useState("");

    const nameChangeHandler = (event) => {
        setEnteredName(event.target.value);
    };

    const linkChangeHandler = (event) => {
        setEnteredLink(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const linkData = {
            name: enteredName,
            link: enteredLink,
        };

        props.onSaveLinkData(linkData);
        setEnteredName("");
        setEnteredLink("");
    };

    return (
        <form onSubmit={submitHandler}>
            <div className="new-link__controls">
                <div className="new-link__control">
                    <label>Name</label>
                    <input
                        type="text"
                        placeholder="Example"
                        value={enteredName}
                        onChange={nameChangeHandler}
                    />
                </div>
                <div className="new-link__control">
                    <label>Link</label>
                    <input
                        type="url"
                        placeholder="https://example.com"
                        value={enteredLink}
                        onChange={linkChangeHandler}
                    />
                </div>
            </div>
            <div className="new-link__actions">
                <button type="button" onClick={props.onCancel}>
                    Cancel
                </button>
                <button type="submit">Add Link</button>
            </div>
        </form>
    );
};

export default LinkForm;
