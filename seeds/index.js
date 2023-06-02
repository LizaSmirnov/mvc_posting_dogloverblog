const userData = require('./user-seeds');
const postData = require('./post-seeds');
const commentData = require('./comment-seeds');
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const seedAll = async () => {
  await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
  
  await User.bulkCreate(userData, {
    individualHooks: true,
  });
    console.log('\n----- USERS SEEDED -----\n');
  
  await Post.bulkCreate(postData);
    console.log('\n----- POSTS SEEDED -----\n');

  await Comment.bulkCreate(commentData);
    console.log('\n----- COMMENTS SEEDED -----\n');

  process.exit(0);
};

seedAll();