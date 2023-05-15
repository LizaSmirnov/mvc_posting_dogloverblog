const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const bcrypt = require("bcrypt"); 

//find all users 
router.get("/", (req, res) => {
 User.findAll({
  include: [ { model: Post }, { model: Comment } ]
})
.then(dbUserData => res.json(dbUserData))
});

//find one user by id
router.get("/:id", (req, res) => {
  User.findOne({
    where: {
      id: req.params.id
    },
    include: [ { model: Post }, { model: Comment } ]
  }).then(dbUserData => {
    if (!dbUserData) {
      res.status(404).json({ message: "No user found with this id" });
      return;
    } else {
      res.json(dbUserData);
    }
  })
});

//create a new user
router.post("/", async (req, res) => {
  try {
    console.log("post users route hit");
    console.log(req.body)
    const newUser = await User.create(req.body);
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;
      res.status(200).json(newUser);
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});
//sign up a new user
router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

//login a user based on the email and that password matches saved email
router.post("/login", async (req, res) => {
    try {
      console.log("post users login hit");
      console.log(req.body)
      const userData = await User.findOne({where: {email: req.body.email}});
      if(!userData){
        res.status(400).json({message: "Incorrect email or password, please try again"})
        return;
      }
      var validPassword = await userData.checkPassword(req.body.password);
      if(!validPassword){
        res.status(400).json({message: "Incorrect email or password, please try again"})
        return;
      }
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        // send the response back to the client
        res.json({ user: userData, message: 'You are now logged in!' });
      });
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  });
//destroy the session loging out the user
  router.delete('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
      res.status(200).end(); 
      });
    } else {
      res.status(404).end();  
    }
  });

module.exports = router;
