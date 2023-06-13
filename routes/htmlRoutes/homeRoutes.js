const router = require("express").Router();
const { log } = require("handlebars");
const {Post, User, Comment} = require('../../models');
const withAuth = require('../../utils/auth'); 
const exphbs = require('express-handlebars');

//if req.session.logged_in is true, redirect to profile
//if req.session.logged_in is false, render login page


//get homepage
router.get("/", async (req, res) => {
  res.redirect("/home");
  
 try {
  //get all posts
  const postData = await Post.findAll({
    include: [User, Comment],
  });
  const posts = postData.map((post) => post.get({ plain: true }));
  console.log(posts)


  //render all post body and title
  res.render("home", {
    posts,
    logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(404).json(err);
  }
});

//get login routes

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }
  res.render("login");
});
//get signup
router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }
  res.render("signup");
});

//get profile
router.get("/profile", withAuth, async (req, res) => {
  console.log('bacon')
  try {
    const userData = await User.findByPk(req.session.user_id, {
      include: [{ model: Post }],
      attributes: { exclude: ["password"] },
    });
    const user = userData.get({ plain: true });

    console.log('made it to here');
    console.log(user);

    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(404).json(err);
  }
});

router.get("/post/:id",async (req,res) =>{
 
  const postData = await Post.findByPk(req.params.id, {
    include: [{ model: User }],
  })
  const post = postData.get({ plain: true });
  console.log(post)
  const canEdit = req.session.user_id === post.user_id;
  res.render("single-post",{
    canEdit,
    ...post,
    logged_in: true,
  })

})

router.get("/comment/:id",async (req,res) =>{
   if (!req.session.logged_in) {
    res.redirect("/login");
    return;
   }
  const postData = await Post.findByPk(req.params.id, {
    include: [{ model: User }],
  })
  const post = postData.get({ plain: true });
  console.log(post)
  const canEdit = req.session.user_id === post.user_id;
  res.render("comment",{
    canEdit,
    ...post,
    logged_in: true,
  })

}
);




module.exports = router;