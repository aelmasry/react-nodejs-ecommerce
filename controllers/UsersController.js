const UserModel = require("../models/User");

// User SignIn
exports.signIn = (req, res) => {
    // Validate request
    if (!req.body.email || !req.body.password) {
      res.status(400).send({ message: "field is required" });
      return;
    }
  
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) return res.status(500).send('Error on the server.');
      if (!user) return res.status(404).send('No user found.');
  
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) return res.status(401).send({ auth: false });
  
      res.status(200).send({ auth: true});
    });
};
  
// User SignUp
exports.signUp = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({ message: "content is required" });
        return;
    }

    let password = bcrypt.hashSync(req.body.password, 10);

    User.create({
        name: req.body.name,
        email: req.body.email,
        password: password
    })
    .then(data => {
        res.status(200).send({ message: "User registration success" });
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the user."
        });
    });

};

exports.logout = (req, res) => {
    if (req.session) {
        // delete session object
        req.session.destroy(function(err) {
            if(err) {
            return next(err);
            } else {
            return res.redirect('/');
            }
        });
    }
};