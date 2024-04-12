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
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { accessToken, refreshToken } = await userService.loginUser({ email, password });

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
      })
      .header("Authorization", `Bearer ${accessToken}`)
      .send({ accessToken });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



module.exports = { register, login };