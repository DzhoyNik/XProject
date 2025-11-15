import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import BaseStructure from "../../components/BaseStructure";
import { createSubchapter, fetchChapter, fetchSubchapters } from "../../api/notesAPI";
import { useNavigate, useParams } from "react-router-dom";
import { IoAdd, IoSearch, IoTrashBinOutline } from "react-icons/io5";
import Modal from "../../components/Modal";
import { toast } from "react-toastify";
import FillButton from "../../components/FillButton";
import { IoMdArrowDropdown } from "react-icons/io";
import TextArea from "../../components/TextArea";
import NotesChapter from "./NotesChapter";

const Chapter = observer(() => {
    const { chapterId } = useParams()
    const [ chapter, setChapter ] = useState([])
    const [ subchapter, setSubchapter ] = useState([])
    const [ isModalOpen, setIsModalOpen ] = useState(false)
    const [ title, setTitle ] = useState("")
    const [ desc, setDesc ] = useState("")
    const [ text, setText ] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        fetchChapter(chapterId).then(data => setChapter(data))
        fetchSubchapters(chapterId).then(data => setSubchapter(data))
    }, [])

    const handleOpenModal = () => {
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    const handleCreateSubchapter = () => {
        if (!title) {
            return toast.warn("Заполните поле!")
        }

        const payload = { title, desc }

        createSubchapter(chapterId, payload)
            .then(() => navigate(0))
            .catch(data => console.log(data))
    }

    return(
        <BaseStructure>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <div className="modal-section" style={{ width: "27vw" }}>
                    <p>Заголовок заметки*</p>
                    <input type="text" placeholder="Введите заголовок" value={title} onChange={e => setTitle(e.target.value)} />
                    <p>Описание*</p>
                    <TextArea value={desc} setValue={setDesc} place="Введите описание" />
                    <button type="button" className="modal-button" onClick={handleCreateSubchapter}>Создать</button>
                </div>
            </Modal>
            <h1>{chapter.title}</h1>
            <div className="topbar" style={{ display: "flex", justifyContent: "center" }}>
                <FillButton btn="topBtn" onClick={handleOpenModal}><IoAdd /></FillButton>
                <FillButton btn="topBtn"><IoSearch /></FillButton>
                <FillButton btn="topBtn"><IoTrashBinOutline /></FillButton>
            </div>
            <div className="notes-chapters-list">
                <div className="notes-chapters">
                    <h2 id="notes-chapters-h2">Заметки <IoMdArrowDropdown /></h2>
                    <div className="notes-list">
                        {subchapter.map((data) => (
                            <NotesChapter key={data.id} type="note" chapter={data} subchapter={data} desc={true} />
                        ))}
                    </div>    
                </div>
            </div>
        </BaseStructure>
    )
})

export default Chapter