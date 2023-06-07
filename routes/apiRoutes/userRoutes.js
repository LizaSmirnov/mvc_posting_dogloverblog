const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const bcrypt = require("bcrypt");

//login user
router.post("/login", async (req, res) => {
  try {
    console.log("post users login hit");
    const userData = await User.findOne({ where: { email: req.body.email } });
    console.log(userData)
    if (!userData) {
      res.status(400).json({ message: "err" });
      return;
    }
    var validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: "err2" });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      // send the response back to the client
      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});
  //sign up a new user
  router.post("/signup", async (req, res) => {
    try {
      console.log("get users signup hit");      
      
      const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id
      req.session.logged_in = true;
      res.status(200).json(userData);
  })
} catch (error) {
  console.log(error);
  res.status(400).json(error);
}
});


router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});




module.exports = router;
