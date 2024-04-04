const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const saltRounds = 10;

const registerUser = async (userData) => {
  const { firstName, lastName, email, password, confirmPassword } = userData;

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    throw new Error("Please enter all fields");
  }

  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    confirmPassword: hashedPassword,
  });

  try {
    const newUser = await user.save();
    return newUser;
  } catch (err) {
    throw err;
  }
};

const loginUser = async (userData) => {
  try {
    const { email, password } = userData;
    if (!email || !password) {
      throw new Error("Please enter all fields");
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("User does not exist");
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new Error("Invalid credentials");
    }

    const accessToken = jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    return { accessToken, refreshToken };
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

module.exports = { registerUser, loginUser };
