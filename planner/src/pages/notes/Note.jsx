import React, { useEffect, useState, useRef } from "react";
import BaseStructure from "../../components/BaseStructure";
import { useParams } from "react-router-dom";
import { fetchNote, saveContent } from "../../api/notesAPI";
import style from "./note.module.css";
import styleContentCode from "./ContentCodeSection.module.css";
import FillButton from "../../components/FillButton";
import { IoCheckmark, IoCodeSlashOutline, IoImageOutline, IoInformationOutline, IoTextOutline, IoTrashBinOutline, IoWarningOutline } from "react-icons/io5";
import { MdErrorOutline, MdOutlineEdit } from "react-icons/md";
import TextArea from "../../components/TextArea";
import ImageUploader from "../../components/ImageUploader";
import { v4 as uuidv4 } from "uuid";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ButtonBack from "../../components/ButtonBack";
import { NOTES_ROUTE } from "../../utils/consts";

const Note = () => {
    const { chapterId, noteId } = useParams();
    const [note, setNote] = useState({});
    const [content, setContent] = useState([]);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        fetchNote(chapterId, noteId).then((data) => {
            setNote(data)
            
            if (data.contents && Array.isArray(data.contents.content)) {
                const sortedContent = data.contents.content.sort((a, b) => a.pos - b.pos)
                setContent(sortedContent)
            }
        });
    }, [chapterId, noteId]);

    const addContentBlock = (type) => {
        setContent((prev) => {
            const newBlock = { id: uuidv4(), type, pos: prev.length, value: "" };
            if (type === "info") newBlock.style = "info";
            return [...prev, newBlock];
        });
    };

    const updateContentBlock = (id, newValue) => {
        setContent((prev) =>
            prev.map((block) => (block.id === id ? { ...block, value: newValue } : block))
        );
    };

    const updateContentStyle = (id, newStyle) => {
        setContent((prev) =>
            prev.map((block) => (block.id === id ? { ...block, style: newStyle } : block))
        );
    };

    const deleteContentBlock = (id) => {
        setContent((prev) => {
            const updated = prev.filter((block) => block.id !== id);
            return updated.map((block, i) => ({ ...block, pos: i }));
        });
    };

    const handleSaveContent = async () => {
        setIsEdit(!isEdit);
        // console.log(content);
        await saveContent(chapterId, noteId, content).then(data => console.log(data))
    };

    const moveBlock = (dragIndex, hoverIndex) => {
        setContent(prev => {
            const updated = [...prev];
            const [removed] = updated.splice(dragIndex, 1);
            updated.splice(hoverIndex, 0, removed);
            return updated.map((block, i) => ({ ...block, pos: i }));
        });
    };

    const renderContentBlock = (block, index) => (
        <DraggableBlock
            key={block.id}
            index={index}
            block={block}
            moveBlock={moveBlock}
            isEdit={isEdit}
            updateContentBlock={updateContentBlock}
            updateContentStyle={updateContentStyle}
            deleteContentBlock={deleteContentBlock}
        />
    );

    return (
        <DndProvider backend={HTML5Backend}>
            <BaseStructure>
                <ButtonBack route={`${NOTES_ROUTE}/${chapterId}`} />
                <h1 className={style.title}>{note.title}</h1>
                {isEdit ? (
                    <FillButton onClick={handleSaveContent} btn={style.btnEdit}>
                        <IoCheckmark />
                    </FillButton>
                ) : (
                    <FillButton onClick={() => setIsEdit(!isEdit)} btn={style.btnEdit}>
                        <MdOutlineEdit />
                    </FillButton>
                )}
                <div className={style.content}>
                    {content.map((block, index) => renderContentBlock(block, index))}
                </div>
                {isEdit && (
                    <div className={style.tools}>
                        <FillButton btn={style.menuBtn} onClick={() => addContentBlock("text")}><IoTextOutline /></FillButton>
                        <FillButton btn={style.menuBtn} onClick={() => addContentBlock("image")}><IoImageOutline /></FillButton>
                        <FillButton btn={style.menuBtn} onClick={() => addContentBlock("code")}><IoCodeSlashOutline /></FillButton>
                        <FillButton btn={style.menuBtn} onClick={() => addContentBlock("info")}><IoInformationOutline /></FillButton>
                    </div>
                )}
            </BaseStructure>
        </DndProvider>
    );
};

const DraggableBlock = ({ block, index, moveBlock, isEdit, updateContentBlock, updateContentStyle, deleteContentBlock }) => {
    const ref = useRef(null);

    const [, drop] = useDrop({
        accept: 'BLOCK',
        canDrop: () => isEdit,
        hover(item, monitor) {
            if (!isEdit) return
            if (!ref.current) return

            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) return;

            moveBlock(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: 'BLOCK',
        item: { id: block.id, index },
        canDrag: isEdit,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    if (isEdit)
        drag(drop(ref));

    return (
        <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1, cursor: isEdit ? 'move' : 'default' }}>
            {(() => {
                switch (block.type) {
                    case "text":
                        return <ContentTextSection value={block.value} setValue={(val) => updateContentBlock(block.id, val)} isEdit={isEdit} onDelete={() => deleteContentBlock(block.id)} />;
                    case "image":
                        return <ContentImageSection value={block.value} setValue={(val) => updateContentBlock(block.id, val)} isEdit={isEdit} onDelete={() => deleteContentBlock(block.id)} />;
                    case "code":
                        return <ContentCodeSection value={block.value} setValue={(val) => updateContentBlock(block.id, val)} isEdit={isEdit} onDelete={() => deleteContentBlock(block.id)} />;
                    case "info":
                        return <ContentInfoSection value={block.value} styleType={block.style} setValue={(val) => updateContentBlock(block.id, val)} setStyle={(val) => updateContentStyle(block.id, val)} isEdit={isEdit} onDelete={() => deleteContentBlock(block.id)} />;
                    default:
                        return null;
                }
            })()}
        </div>
    );
};

const ContentTextSection = ({ value, setValue, isEdit, onDelete }) => (
    <div className={`${style.contentSection} ${!isEdit ? style.viewMode : ""}`}>
        {isEdit && <FillButton btn={style.contentSectionDelete + " fill-back"} onClick={onDelete}><IoTrashBinOutline /></FillButton>}
        {isEdit ? <TextArea value={value} setValue={setValue} /> : <p className={style.textSection}>{value}</p>}
    </div>
);

const ContentImageSection = ({ value, setValue, isEdit, onDelete }) => {
    const [ preview, setPreview ] = useState(value || "")
    console.log(value);
    
    return (
        <div className={`${style.contentSection} ${!isEdit ? style.viewMode : ""}`}>
            {isEdit && <FillButton btn={style.contentSectionDelete + " fill-back"} onClick={onDelete}><IoTrashBinOutline /></FillButton>}
            {isEdit ? <ImageUploader onChange={(url) => { setPreview(url); setValue(url) }} /> : value && <img src={value} alt="" className={style.imageSection} />}
        </div>
    );
};

const ContentCodeSection = ({ value, setValue, isEdit, onDelete }) => {
    const highlightCSharp = (code) => {
        const escape = (str) =>
            str.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

        const tokenRegex = new RegExp(
            [
                /\/\/[^\n]*/,
                /\/\*[\s\S]*?\*\//,
                /"(?:\\.|[^"\\])*"/,
                /'(?:\\.|[^'\\])*'/,
                /\b\d+(?:\.\d+)?\b/,
                /\b(?:public|private|protected|class|static|namespace|using|return|if|else|for|while|true|false|bool|int|string|void|new|var|async|await|get|set)\b/,
                /\b(?:Console|Math|List|Task)\b/,
                /==|!=|<=|>=|&&|\|\||[+\-*/=<>]/
            ]
                .map(r => r.source)
                .join("|"),
            "g"
        );

        return code.replace(tokenRegex, (match) => {
            const esc = escape(match);

            // Comments
            if (match.startsWith("//") || match.startsWith("/*"))
                return `<span class="${styleContentCode.comment}">${esc}</span>`;

            // Strings
            if (
                (match.startsWith('"') && match.endsWith('"')) ||
                (match.startsWith("'") && match.endsWith("'"))
            ) {
                return `<span class="${styleContentCode.string}">${esc}</span>`;
            }

            // Numbers
            if (/^\d/.test(match))
                return `<span class="${styleContentCode.number}">${esc}</span>`;

            // Keywords
            if (
                /\b(public|private|protected|static|namespace|using|return|if|else|for|while|true|false|bool|int|string|const|void|new|var|async|await|get|set)\b/
                    .test(match)
            )
                return `<span class="${styleContentCode.keyword}">${esc}</span>`;

            if (
                /\b(internal|const)\b/
                    .test(match)
            )
                return `<span class="${styleContentCode.keyword}">${esc}</span>`;

            // class
            if (
                /\b(class)\b/
                    .test(match)
            )
                return `<span class="${styleContentCode.class}">${esc}</span>`;

            // Types
            if (/\b(Console|Math|List|Task)\b/.test(match))
                return `<span class="${styleContentCode.type}">${esc}</span>`;

            // Operators
            if (/==|!=|<=|>=|&&|\|\||[+\-*/=<>]/.test(match))
                return `<span class="${styleContentCode.operator}">${esc}</span>`;

            return esc;
            }
        )
    }

    return (
        <div className={`${styleContentCode.contentSection} ${!isEdit ? style.viewMode : ""}`}>
            {isEdit && <FillButton btn={style.contentSectionDelete + " fill-back"} onClick={onDelete}><IoTrashBinOutline /></FillButton>}
            {isEdit ? <TextArea value={value} setValue={setValue} id={styleContentCode.textarea} /> : <h3 className={style.codeSection} dangerouslySetInnerHTML={{ __html: highlightCSharp(value) }}></h3>}
        </div>
    );
};

const ContentInfoSection = ({ value, setValue, styleType, setStyle, isEdit, onDelete }) => {
    const [typeClass, setTypeClass] = useState("");

    useEffect(() => {
        switch (styleType) {
            case "warn": setTypeClass(style.contentSectionWarn); break;
            case "error": setTypeClass(style.contentSectionError); break;
            default: setTypeClass(style.contentSectionInfo);
        }
    }, [styleType]);

    const handleChangeType = (_type) => {
        let newStyle;
        switch (_type) {
            case "Info": newStyle = "info"; setTypeClass(style.contentSectionInfo); break;
            case "Warn": newStyle = "warn"; setTypeClass(style.contentSectionWarn); break;
            case "Error": newStyle = "error"; setTypeClass(style.contentSectionError); break;
            default: newStyle = "info"; setTypeClass(style.contentSectionInfo);
        }
        setStyle(newStyle);
    };

    return (
        <div className={`${!isEdit ? style.viewMode : ""} ${style.contentSection} ${typeClass}`}>
            {isEdit ? (
                <>
                    <div className={style.contentSectionType}>
                        <FillButton onClick={() => handleChangeType("Info")}><IoInformationOutline /></FillButton>
                        <FillButton onClick={() => handleChangeType("Warn")}><IoWarningOutline /></FillButton>
                        <FillButton onClick={() => handleChangeType("Error")}><MdErrorOutline /></FillButton>
                    </div>
                    <FillButton btn={style.contentSectionDelete + " fill-back"} onClick={onDelete}><IoTrashBinOutline /></FillButton>
                    <TextArea value={value} setValue={setValue} id={style.textarea} />
                </>
            ) : (
                <div className={style.infoSection}><p>{value}</p></div>
            )}
        </div>
    );
};

export default Note;
