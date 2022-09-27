const { Model, DataTypes } = require('sequelize')

module.exports = class UserModel extends Model {
    static setup(sequelizeInstance) {
        UserModel.init({
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                unique: true
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
            {
                sequelize: sequelizeInstance,
                modelName: 'User',
                tableName: 'Users',
                underscored: true,
                timestamps: true,
                updatedAt: false
            })
        return UserModel
    }
}