import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone"

const ImageUploader = ({ onChange }) => {
    const [ preview, setPreview ] = useState(null)

    const onDrop = useCallback(async (acceptedFiles) => {
        const file = acceptedFiles[0]
        if (!file) return

        const reader = new FileReader()
        reader.onloadend = () => setPreview(reader.result)
        reader.readAsDataURL(file)

        const formData = new FormData()
        formData.append("image", file)

        try {
            const res = await fetch("http://api.xproject.local:5000/upload/image", {
                method: "POST",
                body: formData
            })

            const data = await res.json()

            if (data.path) {
                onChange(`http://localhost:5000${data.path}`)
            } else {
                console.error("Ошибка при загрузке: ", data)
            }
        } catch (err) {
            console.error("Ошибка при загрузке файла: ", err);
        }
    }, [onChange])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [] },
        multiple: false
    })

    return (
        <div
            {...getRootProps()}
            style={{
                border: "2px dashed #888",
                borderRadius: "10px",
                padding: "20px",
                textAlign: "center",
                cursor: "pointer",
                background: isDragActive ? "#eef2ff" : "#fafafa"
            }}
        >
            <input {...getInputProps()} />
            {preview ? (
                <img src={preview} alt="preview" style={{ width: "100%", borderRadius: "8px", objectFit: "cover" }} />
            ): (
                <p>Перетащите изображение или нажмите для выбора файла</p>
            )}
        </div>
    )
}

export default ImageUploader