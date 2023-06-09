const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const { post } = require('../routes');

class Comment extends Model {}

Comment.init(
    {
    id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
    },
    body: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type:DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull:false
    }
 },{          
    sequelize: sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
});

module.exports = Comment;