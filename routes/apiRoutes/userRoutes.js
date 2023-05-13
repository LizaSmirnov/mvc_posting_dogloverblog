const router = require("express").Router();
const { User } = require("../../models");
router.get("/", (req, res) => {
  console.log("get users route hit");
  res.json({ message: "get users route hit" });
});

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

router.post("/login", async (req, res) => {
    try {
      console.log("post users login hit");
      console.log(req.body)
      const userData = await User.findOne({where: {email: req.body.email}});
      if(!userData){
        res.status(400).json({message: "Incorrect email or password, please try again"})
        return
      }
      var validPassword = await userData.checkPassword(req.body.password);
      if(!validPassword){
        res.status(400).json({message: "Incorrect email or password, please try again"})
        return
      }
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        res.status(200).json(userData);
      });
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  });

module.exports = router;
