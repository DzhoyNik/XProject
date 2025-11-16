import { React, useContext, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import BaseStructure from "../../components/BaseStructure"
import { IoAdd, IoCopyOutline, IoSearch, IoTrashBinOutline } from "react-icons/io5"
import { TiFolderAdd } from "react-icons/ti"
import { IoMdArrowDropdown } from "react-icons/io";
import Modal from "../../components/Modal"
import { Context } from "../.."
import { toast } from "react-toastify"
import { createChapter, deleteChapter, fetchChapters } from "../../api/notesAPI"
import { useNavigate } from "react-router-dom"
import "./notes.css"
import NotesChapter from "./NotesChapter"
import FillButton from "../../components/FillButton"
import NoNotes from "../../assets/NoNotes.png"

const Notes = observer(() => {
    const { user } = useContext(Context)
    const navigate = useNavigate()
    const [ isModalOpen, setIsModalOpen ] = useState(false)
    const [ isModalLinkOpen, setIsModalLinkOpen ] = useState(false)
    const [ isModalDeleteOpen, setIsModalDeleteOpen ] = useState(false)
    const [ titleChapter, setTitleChapter ] = useState("")
    const [ chapters, setChapters ] = useState([])
    const [ chapter, setChapter ] = useState(null)

    useEffect(() => {
        document.title = "Заметки | Planner"

        fetchChapters(user.user.id).then(data => setChapters(data))

        if (localStorage.getItem("ShowSuccessToast") === "true") {
            toast.success("Раздел успешно создан!")
            localStorage.removeItem("ShowSuccessToast")
        }

        if (localStorage.getItem("ShowSuccessDeleteChapter") === "true") {
            toast.success("Раздел успешно удален!")
            localStorage.removeItem("ShowSuccessDeleteChapter")
        }
    }, [])

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const openLinkModal = () => {
        setIsModalLinkOpen(true)
    }

    const handleCloseLinkModal = () => {
        setIsModalLinkOpen(false)
    }

    const openDeleteModal = ( chapter ) => {
        setIsModalDeleteOpen(true)
        setChapter(chapter)
    }

    const handleCloseDeleteModal = () => {
        setIsModalDeleteOpen(false)
        setChapter(null)
    }

    const handleCreateChapter = () => {
        if (!titleChapter) return toast.warn("Напишите название раздела!")
        const payload = { titleChapter, userId: user.user.id }
        createChapter(payload)
            .then(() => {
                localStorage.setItem("ShowSuccessToast", true)
                navigate(0)
            })
            .catch(e => {
                toast.error(e.respone.data.message)
            })
    }

    const handleDeleteChapter = (chapterId) => {
        if (!chapterId) {
            return toast.error("Непредвиденная ошибка!")
        }

        deleteChapter(chapterId)
            .then(() => {
                localStorage.setItem("ShowSuccessDeleteChapter", true)
                navigate(0)
            })
            .catch(e => {
                console.log(e)
            })
    }

    const handleViewToastDontWork = () => {
        toast.info("Данная функция пока не работает")
    }

    console.log(chapters);
    

    return(
        <BaseStructure>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div className="modal-section" style={{ width: "30vw" }}>
                    <p>Название раздела*</p>
                    <input type="text" placeholder="Введите название" value={titleChapter} onChange={e => setTitleChapter(e.target.value)} />
                </div>
                <button type="button" className="modal-button" onClick={handleCreateChapter}>Создать</button>
            </Modal>
            <Modal isOpen={isModalLinkOpen} onClose={handleCloseLinkModal}>
                <h2 style={{ marginBottom: "1.5rem" }}>Использовать раздел в другой проекте</h2>
                <div className="modal-link">
                    <div className="modal-link-info">
                        <p style={{ lineHeight: "1.75rem", marginBottom: "0.95rem" }}>Скопируйте код доступа и вставьте его в нужный проект для синхронизации раздела.</p>
                        <p style={{ lineHeight: "1.75rem" }}>Его можно безопасно применять в любых проектах, созданных нашей компанией.</p>
                    </div>
                    <div className="modal-link-action">
                        <h2>Код доступа</h2>
                        <input type="text" value="dwadjawidjawdaw" />
                        <button type="button"><IoCopyOutline /> Скопировать</button>
                    </div>
                </div>
            </Modal>
            <Modal isOpen={isModalDeleteOpen} onClose={handleCloseDeleteModal}>
                <p>Вы действительно хотите удалить данный раздел?</p>
                <h2>{chapter}</h2>
                <button type="button" style={{ color: "var(--color-red)", border: "var(--border-1)", borderColor: "var(--color-red)", background: "unset" }} onClick={() => handleDeleteChapter(chapter)} >Удалить</button>
                <button type="button" onClick={handleCloseDeleteModal}>Отменить</button>
            </Modal>
            <h1>Заметки</h1>
            <div className="topbar" style={{ display: "flex", justifyContent: "center" }}>
                <FillButton btn="topBtn" onClick={handleViewToastDontWork}><IoAdd /></FillButton>
                <FillButton btn="topBtn" onClick={openModal}><TiFolderAdd /></FillButton>
                <FillButton btn="topBtn"><IoSearch /></FillButton>
                <FillButton btn="topBtn"><IoTrashBinOutline /></FillButton>
            </div>
            <div className="notes-chapters-list">
                {Array.isArray(chapters) && chapters.length === 0 ? 
                <div className="notes-void">
                    <div className="notes-void-img">
                        <img src={NoNotes} alt="" />
                    </div>
                    <h1>Пока здесь пусто</h1>
                    <p>Добавьте свою первоую заметку<br />или раздел, чтобы ничего не забыть!</p>
                </div> : (
                    <div className="notes-chapters">
                        <h2 id="notes-chapters-h2">Разделы <IoMdArrowDropdown /></h2>
                        <div className="notes-list">
                            {chapters.map((data) => (
                                <NotesChapter type="subchapter" chapter={data} openModalDelete={openDeleteModal} />
                            ))}
                        </div>    
                    </div>
                )}
            </div>
        </BaseStructure>
    )
})

export default Notes