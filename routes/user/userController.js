const User = require("./User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonWebtoken");

module.exports = {
  createUser: async (req, res) => {
    console.clear();

    try {
      const salt = await bcrypt.genSalt(12);
      const realPassword = await bcrypt.hash(req.body.password, salt);

      let foundEmail = await User.findOne({ email: req.body.email });

      if (foundEmail) {
        // res.json({message:'user already exist', status:404})//change the status

        // throw { message:'user al÷ready exist, use different email'}
        res.status(409).send({message:'user exist'})
        // return;
      } 

      if(!foundEmail)
      {
        const newUser = new User({
          email: req.body.email,
          password: realPassword,
        });
        const jwtToken = jwt.sign(
          {
            email: req.body.email,
            // _id: foundEmail._id,
          },
          "bleuSky",
          { expiresIn: "24hr" }
        );

        res.json({ message: `you're in now.`, jwtToken });

        await newUser.save();
      }

      //

      // console.log(foundEmail)

      //
      // res.json({ message: "user created" });
    } catch (e) {
      console.log(e);

      if (e.code === 11000) {
        res.status(409).json({ message: "duplicate user" });
      }
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
