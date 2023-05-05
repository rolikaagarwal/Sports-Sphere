const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const model = require("../model/user");

exports.createUser = async(req,res)=>{
  const hash = bcrypt.hashSync(req.body.password, 5);
  const newUser = new model.User({ ...req.body, password: hash });
  newUser.save() .then((savedUser) => {
    var token = jwt.sign({ id: savedUser._id }, process.env.SECRET);
    savedUser.token = token;
    savedUser.save();
    res.status(200).json({
      message: "saved successfully",
      user: savedUser,
    });
  })
  .catch((err) => {
    res.status(400).json({
      message: "unsuccessful",
      error: err,
    });
  });
}

exports.loginUser = (req, res) => {
  model.User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        res.status(401).json({
          message: "Invalid email",
        });
      } else {
        const isAuth = bcrypt.compareSync(req.body.password, user.password);
        if (isAuth) {
          var token = jwt.sign({ id: user._id }, process.env.SECRET);
          user.token = token;
          user.save()
            .then(() => {
              res.json({ token });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          res.status(401).json({
            message: "Invalid password",
          });
        }
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        message: "An error occurred while logging in",
        error: err.message,
      });
    });
};
