const ApiError = require("../error/ApiError")
const { PlannerMaterials, PlannerMaterialsChapters, PlannerMaterialsSubchapters, PlannerMaterialsContents } = require("../models/models")

class PlannerController {
    async createChapter (req, res, next) {
        const { titleChapter, userId } = req.body

        try {
            const plannerMaterials = await PlannerMaterials.findOne({ where: { generalUserId: userId } })
            const plannerMaterialsChapter = await PlannerMaterialsChapters.create({ title: titleChapter, plannerMaterialsPersonalId: plannerMaterials.id })
            return res.json(plannerMaterialsChapter)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async createSubchapter (req, res, next) {
        const { chapterId } = req.params
        const { title, desc } = req.body

        try {
            const subchapter = await PlannerMaterialsSubchapters.create({ title, description: desc, plannerMaterialsChapterId: chapterId })
            return res.json(subchapter)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async getAll (req, res, next) {
        const { userId } = req.params

        try {
            const plannerMaterials = await PlannerMaterials.findOne({ where: { generalUserId: userId } })
            const plannerMaterialsChapters = await PlannerMaterialsChapters.findAll({ where: { plannerMaterialsPersonalId: plannerMaterials.id } })

            return res.json(plannerMaterialsChapters)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async getAllSubchapters (req, res, next) {
        const { chapterId } = req.params
        const subchapters = await PlannerMaterialsSubchapters.findAll({ where: { plannerMaterialsChapterId: chapterId } })
        return res.json(subchapters)
    }

    async getOne (req, res, next) {
        const { chapterId } = req.params
        const plannerMaterialsChapter = await PlannerMaterialsChapters.findOne({ where: { id: chapterId } })
        return res.json(plannerMaterialsChapter)
    }

    async getOneNote (req, res, next) {
        try {
            const { chapterId, noteId } = req.params
            const plannerMaterialsNote = await PlannerMaterialsSubchapters.findOne({ where: { id: noteId, plannerMaterialsChapterId: chapterId } })
            const plannerMaterialsContents = await PlannerMaterialsContents.findOne({ where: { plannerMaterialsSubchapterId: noteId } })

            const noteWithContents = {
                ...plannerMaterialsNote.toJSON(),
                contents: plannerMaterialsContents
            }

            return res.json(noteWithContents)
        } catch (err) {
            next(ApiError.badRequest(err))
        }
    }

    async saveContent (req, res, next) {
        const { chapterId, noteId } = req.params
        const payload = req.body

        const [record, created] = await PlannerMaterialsContents.upsert(
        { 
            content: payload, 
            plannerMaterialsSubchapterId: noteId 
        },
        {
            where: { plannerMaterialsSubchapterId: noteId }
        }
    );
        return res.json([record, created])
    }

    async deleteChapter (req, res, next) {
        const { chapterId } = req.params

        try {
            await PlannerMaterialsChapters.destroy({ where: { id: chapterId } })
            return res.json("Success!")
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }

    }
}

module.exports = new PlannerController()