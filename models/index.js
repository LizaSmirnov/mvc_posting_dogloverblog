const User = require('./User');
const Comment = require('./Comment');
const Post = require('./Post')
//but we are in a continuos development environment

// User.hasMany(this.Post, {
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE'
// });

// Post.belongsTo(User, {
//   foreignKey: 'user_id'
// });

module.exports = { User , Comment, Post  }
