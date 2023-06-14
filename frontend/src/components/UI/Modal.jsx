import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const Backdrop = (props) => {
    return <div className="modal__backdrop" onClick={props.onClose}></div>;
};

const ModalOverlay = (props) => {
    return (
        <div className="modal__overlay">
            <div className="modal__content">
                <div className="modal__header">
                    <button
                        className="modal__close-btn"
                        onClick={props.onClose}
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                {props.children}
            </div>
        </div>
    );
};

const Modal = (props) => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(
                <Backdrop onClose={props.onClose} />,
                document.getElementById("overlays")
            )}
            {ReactDOM.createPortal(
                <ModalOverlay onClose={props.onClose}>
                    {props.children}
                </ModalOverlay>,
                document.getElementById("overlays")
            )}
        </React.Fragment>
    );
};

export default Modal;
