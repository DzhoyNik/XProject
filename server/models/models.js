const sequelize = require("../db")
const { DataTypes } = require("sequelize")

const Services = sequelize.define("general_services", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    gssId: { type: DataTypes.INTEGER, field: "generalServicesStatusId", allowNull: false, defaultValue: 2 }
})

const ServicesStatus = sequelize.define("general_services_status", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    status: { type: DataTypes.STRING, unique: true, allowNull: false }
})

const Users = sequelize.define("general_users", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    first_name: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    photo: { type: DataTypes.STRING, allowNull: false },
    login: { type: DataTypes.STRING, unique: true, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false }
})

const UsersRoles = sequelize.define("general_users_roles", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    role: { type: DataTypes.STRING, allowNull: false }
})

const UsersAccess = sequelize.define("general_users_access", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

// Planner

const PlannerMaterials = sequelize.define("planner_materials_personals", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

const PlannerMaterialsChapters = sequelize.define("planner_materials_chapters", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false }
})

const PlannerMaterialsSubchapters = sequelize.define("planner_materials_subchapters", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, unique: false, allowNull: false },
    description: { type: DataTypes.TEXT, unique: false, allowNull: true }
})

const PlannerMaterialsContents = sequelize.define("planner_materials_contents", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    content: { type: DataTypes.JSON, allowNull: false },
    plannerMaterialsSubchapterId: {type: DataTypes.INTEGER, allowNull: false, unique: true}
})

const PlannerMaterialsMedia = sequelize.define("planner_materials_media", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false }
})

ServicesStatus.hasMany(Services)
Services.belongsTo(ServicesStatus)

UsersRoles.hasMany(Users)
Users.belongsTo(UsersRoles)

Users.hasMany(UsersAccess)
UsersAccess.belongsTo(Users)

Services.hasMany(UsersAccess)
UsersAccess.belongsTo(Services)

// Planner

Users.hasOne(PlannerMaterials)
PlannerMaterials.belongsTo(Users)

PlannerMaterials.hasMany(PlannerMaterialsChapters, { onDelete: "CASCADE" })
PlannerMaterialsChapters.belongsTo(PlannerMaterials)

PlannerMaterialsChapters.hasMany(PlannerMaterialsSubchapters)
PlannerMaterialsSubchapters.belongsTo(PlannerMaterialsChapters)

PlannerMaterialsSubchapters.hasMany(PlannerMaterialsContents)
PlannerMaterialsContents.belongsTo(PlannerMaterialsSubchapters)

PlannerMaterialsSubchapters.hasMany(PlannerMaterialsMedia)
PlannerMaterialsMedia.belongsTo(PlannerMaterialsSubchapters)

module.exports = {
    Services,
    ServicesStatus,
    Users,
    UsersRoles,
    UsersAccess,
    PlannerMaterials,
    PlannerMaterialsChapters,
    PlannerMaterialsSubchapters,
    PlannerMaterialsContents,
    PlannerMaterialsMedia
}