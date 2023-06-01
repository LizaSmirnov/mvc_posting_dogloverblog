const router = require("express").Router();
const {Post, User} = require('../../models');
const withAuth = require('../../utils/auth'); 
const exphbs = require('express-handlebars');


//get homepage
router.get("/home", async (req, res) => {
 try {
  res.render("home", {
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
module.exports = router;