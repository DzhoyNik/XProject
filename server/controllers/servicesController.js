const { Services } = require("../models/models")
const ApiError = require("../error/ApiError")

class ServicesController {
    async create (req, res, next) {
        const { name } = req.body
        const service = await Services.create({ name })
        return res.json(service)
    }

    async update (req, res, next) {

    }

    async getAll (req, res, next) {
        const services = await Services.findAll()
        return res.json(services)
    }

    async delete (req, res, next) {
        const { serviceId } = req.params
        const service = await Services.destroy({ where: { id: serviceId } })
        return res.json(service)
    }
}

module.exports = new ServicesController()