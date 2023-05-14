const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

//create a new post
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newPost);
        res.json({message:'Post has been created!'})
    } catch (err) {
        res.status(404).json(err)
    }
});

//delete post with authenticated id and verified post id
router.delete('/:id', withAuth, async (req,res) => {
    try {
        const postData = await Post.destroy({
            where:{
                id:req.params.id,
                user_id:req.session.user_id
            },
        });
        if(!postData){
            res.status(404).json({message: 'No post found with this id bro...'});
            return; //lets users try again also so not left hanging
        }
        res.status(200).json(postData);
    } catch (err){
        res.status(404).json(err)
    }
});

// update post
router.put('/:id', (req, res) => {
    // update product data
    Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
      .then((post) => {
        // find all associated tags from ProductTag
        return Post.findAll({ where: { post_id: req.params.id } });
      })
      .then((postData) => {
        // get list of current tag_ids
        const postDataIds = postData.map(({ post_id }) => post_id);
        // create filtered list of new tag_ids
        const newPosts = req.body.postIds
          .filter((post_id) => !postDataIds.includes(post_id))
          .map((post_id) => {
            return {
              post_id: req.params.id,
              post_id,
            };
          });
        // find the tag to remove
        const postToRemove = postData
          .filter(({ post_id }) => !req.body.postId.includes(post_id))
          .map(({ id }) => id);
  
        //destroy and create to compete update
        return Promise.all([
          Post.destroy({ where: { id: postToRemove } }),
          Post.bulkCreate(newPosts),
        ]);
      })
      .then((updatedPost) => res.json(updatedPost))
      .catch((err) => {
        // console.log(err);
        res.status(400).json(err);
      });
  }),

module.exports = router;