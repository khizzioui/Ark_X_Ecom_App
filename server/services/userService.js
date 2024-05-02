require("dotenv").config();
const User = require("../Models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("../config/cloudinary");
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
    profileImagePath: "http://res.cloudinary.com/dpr8zbpid/image/upload/v1714650385/bmzoe7lxiuuduiwqlgmg.webp",
    password: hashedPassword,
  });

  try {
    const newUser = await user.save();
    return newUser;
  } catch (err) {
    throw err;
  }
};

const loginUser = async (userData) => {
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
    { expiresIn: "1d" } 
  );
  // const refreshToken = jwt.sign(
  //   { id: user._id },
  //   process.env.REFRESH_TOKEN_SECRET,
  //   { expiresIn: "7d" }
  // );

  return { accessToken };
};

// const updateUserProfile = async(userId, userData) => {
//   const user = await User.findById(userId);
//   if (!user) {
//     throw new Error("User does not exist");
//   }

//   //update dateOfBirth, address, city, phoneNumber
//   user.dateOfBirth = userData.dateOfBirth || user.dateOfBirth;
//   user.address = userData.address || user.address;
//   user.city = userData.city || user.city;
//   user.phoneNumber = userData.phoneNumber || user.phoneNumber;
//   try{
//     const updatedUser = await user.save();
//     return updatedUser;
//   }catch(err){
//     throw err;
//   }
// };

// const uploadProfileImage = async (userId, image) => {
//   await cloudinary.uploader.upload(image, {
//     allowed_formats: ['jpg', 'png', 'jpeg', 'jfif'],
//   })
//   .then(result => {
//     return User.findById(userId)
//     .then(user => {
//       if (!user) {
//         throw new Error("User does not exist");
//       }
//       user.profileImagePath = result.url;
//       return user.save();
//     })
//     .the(() => {
//       return result;
//     });
//   })
//   .catch(err => {
//     throw new Error(err.message);
//   });
// }

const updateUserProfile = async (userId, userData, image) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User does not exist");
  }

  user.dateOfBirth = userData.dateOfBirth || user.dateOfBirth;
  user.address = userData.address || user.address;
  user.city = userData.city || user.city;
  user.phoneNumber = userData.phoneNumber || user.phoneNumber;

  if (image) {
      console.log("image");
      
      await cloudinary.uploader.upload(image)
      .then((result) => {
        console.log(result.url);
        user.profileImagePath = result.url;
        
        
      }).then(()=>{
        console.log(user.profileImagePath);
        const updatedUser =  user.save();
        return updatedUser;
      });
      
  }else{
    const updatedUser = await user.save();
    console.log(updatedUser);
    return updatedUser;
  }
};


module.exports = { registerUser, loginUser, updateUserProfile };
