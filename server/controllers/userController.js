const { getMaxListeners } = require("../Models/product");
const userService = require("../services/userService");

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    const newUser = await userService.registerUser({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    });
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { accessToken, refreshToken } = await userService.loginUser({
      email,
      password,
    });

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge : 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge :  15 * 60 * 1000, // 15 minutes

      })
      .send("Logged in");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const logout = async (req, res) => {
  res.clearCookie("refreshToken").clearCookie("accessToken").send("Logged out");
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // from authMiddleware
    const updateUserData = {
      dateOfBirth: req.body.dateOfBirth,
      address: req.body.address,
      city: req.body.city,
      phoneNumber: req.body.phoneNumber,
    };
    const updatedUser = await userService.updateUserProfile(userId, updateUserData);
    res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { register, login, logout, updateProfile };
