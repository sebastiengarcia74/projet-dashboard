const Auth = require("../models/auth-model");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  const hashedPwd = await bcrypt.hash(req.body.password, 12);
  const body = {
    email: req.body.email,
    pseudo: req.body.pseudo,
    password: hashedPwd,
  };

  const auth = new Auth(body);

  const resBody = await auth.save();

  res.json(resBody);

  // const auth = new Auth()
};

exports.login = async (req, res) => {
  console.log("in login controller");
  console.log(req.body);

  try {
    const user = await Auth.findOne({ email: req.body.email });

    console.log(user);
    console.log(user.password);

    const isEqual = await bcrypt.compare(req.body.password, user.password);
    // bcrypt
    //   .compare(req.body.password, user.password)
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));

    console.log({isEqual});

    if (!isEqual) res.status(401).json({ message: "wrong credentials" });
    else res.json({ message: "loggedin", _id: user._id });

  } catch (err) {
    console.log(err);
  }
  
};

// bcrypt
//           .compare(password, info.password)
//           .then((doMatch) => {
//             if (doMatch) {
//               req.session.isLoggedIn = true;
//               req.session.save(() => {
//                 res.redirect("/admin/home-config");
//               });
//             } else {
//               req.flash("error", "Invalid email or password");
//               res.redirect("/admin/login");
//             }
