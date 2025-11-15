import { $authHost } from ".";

export const createChapter = async (payload) => {
    const { data } = await $authHost.post("/planner/chapter", payload)
    return data
}

export const createSubchapter = async (chapterId, payload) => {
    const { data } = await $authHost.post(`/planner/chapter/${chapterId}`, payload)
    return data
}

export const fetchChapters = async (userId) => {
    const { data } = await $authHost.get(`/planner/chapters/${userId}`)
    return data
}

export const fetchSubchapters = async (chapterId) => {
    const { data } = await $authHost.get(`/planner/chapter/${chapterId}/subchapters`)
    return data
}

export const fetchNote = async (chapterId, noteId) => {
    const { data } = await $authHost.get(`/planner/chapter/${chapterId}/${noteId}`)
    return data
}

export const fetchChapter = async (chapterId) => {
    const { data } = await $authHost.get(`/planner/chapter/${chapterId}`)
    return data
}

export const deleteChapter = async (chapterId) => {
    const { data } = await $authHost.delete(`/planner/chapter/${chapterId}`)
    return data
}

export const saveContent = async (chapterId, noteId, payload) => {
    const { data } = await $authHost.put(`/planner/chapter/${chapterId}/${noteId}`, payload)
    return data
}