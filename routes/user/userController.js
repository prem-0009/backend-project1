const User = require("./User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonWebtoken");

module.exports = {
  createUser: async (req, res) => {
    console.log(req.body)
    return;
    try {
      const salt = bcrypt.genSaltSync(12);
      const realPassword = bcrypt.hashSync(req.body.password, salt);

      const newUser = await new User({
        email: req.body.email,
        password: realPassword,
      });
      console.log(realPassword);
      await newUser.save();

      res.json({ message: "user created" });

      console.log(newUser);
    } catch (e) {
      console.log(e);
    }
  },

  signIn: async (req, res) => {
    // const token = jwt.
    console.clear();

    try {
      let foundEmail = await User.findOne({ email: req.body.email });
      if (!foundEmail) {
        //   res.json({message:'no user found'})
        throw { message: "no user found" };
      } else {
        const comparePassword = await bcrypt.compare(
          req.body.password,
          foundEmail.password
        );
        // console.log(comparePassword);
        if (!comparePassword) {
          throw { message: `password didn't matched.` };
        } else {
          const jwtToken = await jwt.sign(
            {
              email: foundEmail.email,
              _id: foundEmail._id,
            },
            "bleuSky",
            { expiresIn: "24hr" }
          );
          res.json({ message: `you're in now.`, jwtToken });
        }
      }
    } catch (e) {
      console.log(e);
    }
  },
};
