const userService = require("../services/userService");

const register = async (req, res) => {
  try {
    const newUser = await userService.registerUser(req.body);
    res.json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { accessToken, refreshToken } = await userService.loginUser(req.body);
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









// const User = require("../model/user");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// const saltRounds = 10;

// const register = async (req, res) => {
//   const { firstName, lastName, email, password, confirmPassword } = req.body;

//   if (!firstName|| !lastName || !email || !password || !confirmPassword) {
//     return res.status(400).json({ message: "Please enter all fields" });
//   }

//   if (password !== confirmPassword) {
//     return res.status(400).json({ message: "Passwords do not match" });
//   }

//   const existingUser = await User.findOne({ email: email });

//   if (existingUser) {
//     return res.status(400).json({ message: "User already exists" });
//   }

//   const hashedPassword = await bcrypt.hash(password, saltRounds);

//   const user = new User({
//     firstName,
//     lastName, 
//     email,
//     password: hashedPassword,
//     confirmPassword: hashedPassword,
//   });

//   try {
//     const newUser = await user.save();
//     res.json(newUser);
//   } catch (err) {
//     res.status(400).json({ message: err });
//   }
// };

// const login = async (req, res) => {
//     const { email, password } = req.body;
    
//     try {
//         if (!email || !password) {
//             return res.status(400).json({ message: "Please enter all fields" });
//         }
        
//         const user = await User.findOne({ email: email });

//         if (!user) {
//             return res.status(400).json({ message: "User does not exist" });
//         }

//         const validPassword = await bcrypt.compare(password, user.password);

//         if (!validPassword) {
//             return res.status(400).json({ message: "Invalid credentials" });
//         }

//         const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"});
//         const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "7d"});

//         res
//             .cookie("refreshToken", refreshToken, {
//                 httpOnly: true,
//                 sameSite: "strict",
//             })
//             .header("Authorization", `Bearer ${accessToken}`)
//             .send({accessToken})
//     } catch (err) {
//         res.status(400).json({ message: err });
//     }
// };

    
// module.exports = {register, login}

