import React from "react";
import { observer } from "mobx-react-lite";
import { IoClose } from "react-icons/io5";
import "../styles/modal.css"

const Modal = observer(({ isOpen, onClose, children }) => {
    if (!isOpen) {
        return null
    }

    return(
        <div className="modal">
            <div className="modal-body">
                <div className="modal-close">
                    <button type="button" onClick={onClose}>
                        <IoClose style={{ margin: 0 }} />
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
})

export default Modal