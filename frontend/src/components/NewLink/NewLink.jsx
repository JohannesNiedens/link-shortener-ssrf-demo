import React, { useState } from "react";
import LinkForm from "./LinkForm";
import "./NewLink.css";

const NewLink = (props) => {
    const [isAdding, setIsAdding] = useState(false);

    const saveLinkDataHandler = async (enteredLinkData) => {
        const linkData = {
            name: enteredLinkData.name,
            url: enteredLinkData.link,
        };

        props.onAddLink(linkData);

        setIsAdding(false);
    };

    const startAddingHandler = () => {
        setIsAdding(true);
    };

    const stopAddingHandler = () => {
        setIsAdding(false);
    };

    return (
        <div className="new-link">
            {!isAdding && (
                <button onClick={startAddingHandler}>Add new Link</button>
            )}
            {isAdding && (
                <LinkForm
                    onSaveLinkData={saveLinkDataHandler}
                    onCancel={stopAddingHandler}
                />
            )}
        </div>
    );
};

export default NewLink;
