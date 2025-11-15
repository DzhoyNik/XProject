import React, { useState } from "react";
import { IoHammerOutline, IoLinkOutline, IoTrashBinOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { NOTES_ROUTE } from "../../utils/consts";
import FillButton from "../../components/FillButton";

const NotesChapter = ({ type, chapter, subchapter = null, openModalLink, openModalDelete, desc = false }) => {
    const navigate = useNavigate()
    const location = useLocation()

    const handleRedirectSubchapter = () => {
        navigate(NOTES_ROUTE + `/${chapter.id}`)
    }

    const handleRedirectNote = () => {
        navigate(`${location.pathname}/${subchapter.id}`)
    }

    const action = type === "subchapter" ? handleRedirectSubchapter : handleRedirectNote

    const handleLinkClick = (e) => {
        e.stopPropagation()
        openModalLink()
    }

    const handleDeleteClick = (e) => {
        e.stopPropagation()
        openModalDelete(chapter.id)
    }

    return(
        <div className="notes-chapter-section" onClick={action}>
            <h2 style={ desc === true ? null : { margin: 0, padding: 0, border: "none" } }>{chapter.title}</h2>
            {desc === true ? (<p>{chapter?.description}</p>) : null}
            <div className="notes-chapter-section-btn">
                <button type="button" id="edit"><IoHammerOutline /></button>
                <button type="button" id="link" onClick={handleLinkClick}><IoLinkOutline /></button>
                <FillButton btn="fill-back"><IoTrashBinOutline /></FillButton>
                {/* <button type="button" id="delete" onClick={handleDeleteClick}></button> */}
            </div>
        </div>
    )
}

export default NotesChapter