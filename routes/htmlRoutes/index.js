const router = require("express").Router();

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

router.get("/post/:id", (req, res) => {
  //find a post by the primary key
  res.render("post");
});

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

module.exports = router;
