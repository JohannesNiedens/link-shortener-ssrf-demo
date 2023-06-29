import React from "react";
import Card from "../UI/Card";
import LinkItem from "./LinkItem";
import "./Links.css";

const Links = (props) => {
    if (props.items.length === 0) {
        return (
            <Card className="links">
                <h2 className="links-list__fallback">Found no links.</h2>
            </Card>
        );
    }

    return (
        <Card className="links">
            <ul className="links-list">
                {props.items.map((link) => (
                    <LinkItem
                        key={link.id}
                        id={link.id}
                        name={link.name}
                        url={link.url}
                        onDelete={props.onDeleteLink}
                        onViewContent={props.onViewContent}
                    />
                ))}
            </ul>
        </Card>
    );
};

export default Links;
