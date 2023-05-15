const router = require("express").Router();
const {Post, User} = require('../../models');
const withAuth = require('../../utils/auth'); 


//get homepage
router.get("/", async (req, res) => {
 try {
  const postData = await Post.findAll({
    include: [{
      model:User,
      attributes:['name'],
    }],
  });
 
  const posts = postData.map((post) => post.get({plain: true}));

  res.render("home", {
    posts,
    logged_id: req.session.logged_in,
  });
} catch (err) {
  res.status(404).json(err);
}
});
router.get("/", (req, res) => {

  // read your database
  //use a findAll
  // you will receive an array of data

  const posts = [
    { id: 1, title: "Post 1", body: "This is post 1" },
    { id: 2, title: "Post 2", body: "This is post 2" },
  ];
  res.render("home", {
    posts,
    logged_id: req.session.logged_in,
  });
});

//get posts 
router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include : [
        {
          model: User,
          attributes: ['name'],
        },
      ]
    });

    const posts = postData.get({ plain :true });
    res.render('post', {
      ...this.post,
      logged_in:req.session.logged_in
    });
  } catch (err) {
    res.status(404).json(err)
  }
});


//when clicked on post grab
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render('post', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


//get signup
router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

//use withAuth middlewar to prevent access to route unless true to profile
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
