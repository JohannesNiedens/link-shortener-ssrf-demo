import React from "react";
import Card from "../UI/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import "./LinkItem.css";

const LinkItem = (props) => {
    const deleteHandler = () => {
        props.onDelete(props.id);
    };

    const contentHandler = () => {
        props.onViewContent(props.id);
    };

    return (
        <li>
            <Card className="link-item">
                <div className="link-item__description">
                    <h2>{props.name}</h2>
                    <div className="link-item__buttons">
                        <a href={props.url} className="link-item__button">
                            <FontAwesomeIcon icon={faGlobe} />
                        </a>

                        <button
                            onClick={contentHandler}
                            className="link-item__button"
                        >
                            <FontAwesomeIcon icon={faEye} />
                        </button>
                        <button
                            onClick={deleteHandler}
                            className="link-item__button"
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                </div>
            </Card>
        </li>
    );
};

export default LinkItem;

