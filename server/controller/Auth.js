const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password ) {
      return res.status(403).send({
        status: false,
        message: "All Fields are required",
      });
    }

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: "User already exists. Please sign in to continue.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(200).json({
      status: true,
      user,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "User cannot be registered. Please try again.",
    });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: `Please Fill up All the Required Fields`,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        status: false,
        message: `User is not Registered with Us Please SignUp to Continue`,
      });
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        {
          email: user.email,
          id: user._id,
          role: user.role,
        },

        process.env.JWT_SECRET,

        { expiresIn: "24h" }
      );

      user.token = token;
      user.password = undefined;

      // const options = {
      //   expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      //   httpOnly: true
        
      // };

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
        sameSite: "None"
        
      };

      res.cookie("authToken", token, options).status(200).json({
        status: true,
        token,
        user,
        message: `User Login Success`,
      });
    } else {
      return res.status(401).json({
        status: false,
        message: `Password is incorrect`,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: `Login Failure Please Try Again`,
    });
  }
};
