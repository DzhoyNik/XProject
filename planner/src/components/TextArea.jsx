import { useRef } from "react";

const TextArea = ({ value, setValue, place = "Введите текст...", id = null }) => {
    const textareaRef = useRef(null)

    const handleInput = () => {
        const element = textareaRef.current
        const prevHeight = element.style.height

        element.style.height = "auto"
        const newHeight = element.scrollHeight + "px"

        element.style.height = prevHeight

        requestAnimationFrame(() => {
            element.style.height = newHeight
        })
    }

    return(
        <textarea
            ref={textareaRef}
            onInput={handleInput}
            rows={1}
            id={id}
            style={{
                resize: "none",
                overflow: "hidden",
                transition: "height 0.3s ease-in-out"
            }}
            placeholder={place}
            value={value}
            onChange={e => setValue(e.target.value)}
        />
    )
}

export default TextArea