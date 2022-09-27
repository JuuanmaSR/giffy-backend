const { Model, DataTypes } = require('sequelize')

module.exports = class FavoriteModel extends Model {
    static setup(sequelizeInstance) {
        FavoriteModel.init({
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                unique: true
            },
            gifId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            userId: {
              type: DataTypes.INTEGER,
              allowNull:false  
            }
        },
        {
            sequelize: sequelizeInstance,
            modelName: 'Favorite',
            tableName: 'Favorites',
            underscored: true,
            paranoid: true,
            timestamps: false
        })
        return FavoriteModel
    }
    /**
     * 
     * @param {typeof import('../../users/model/userModel')} UserModel 
     */
    static setupAssociations(UserModel) {
        UserModel.hasMany(FavoriteModel, {foreignKey:'userId', constraints: false})
        FavoriteModel.belongsTo(UserModel, {foreignKey:'userId', constraints: false})
        
        return FavoriteModel
    }
}