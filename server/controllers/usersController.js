const ApiError = require("../error/ApiError")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { Users, PlannerMaterials } = require("../models/models")
const { Op } = require("sequelize")

const generateJWT = (id, role) => {
    return jwt.sign(
        { id: id, role: role }, 
        process.env.SECRET_KEY,
        { expiresIn: "24h" }
    )
}

class UsersContoller {
    async sign_up (req, res, next) {
        const { firstName, name, lastName, login, email, password } = req.body
        const photo = "favicon.png"

        if (!login || !email || !password) {
            return next(ApiError.badRequest(" Некорректный login, email или пароль"))
        }

        try {
            const candidate = await Users.findOne({ where: { [Op.or]: { login, email } }})

            if (candidate) {
                return next(ApiError.badRequest("Пользователь существует"))
            }

            const hashPassword = await bcrypt.hash(password, 5)
            const user = await Users.create({ first_name: firstName, name, last_name: lastName, photo, login, email, password: hashPassword, generalUsersRoleId: 1 })
            const planner = await PlannerMaterials.create({ generalUserId: user.id })
            const token = generateJWT(user.id, user.generalUsersRoleId)

            return res.json({ token })
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async sign_in (req, res, next) {
        const { login, password } = req.body

        try {
            const user = await Users.findOne({ where: { login } })
        
            if (!user) {
                return next(ApiError.internal("Пользователь не найден"))
            }

            let comparePassword = bcrypt.compareSync(password, user.password)

            if (!comparePassword) {
                return next(ApiError.internal("Введен не правильный пароль"))
            }

            const token = generateJWT(user.id, user.generalUserRoleId)
            return res.json({ token })
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async getAll (req, res, next) {
        res.json({ message: "Good!" })
    }

    async check (req, res, next) {
        const token = generateJWT(req.user.id, req.user.generalUsersRoleId)
        return res.json({ token })
    }
}

module.exports = new UsersContoller()