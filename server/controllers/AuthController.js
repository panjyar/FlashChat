// controllers/AuthController.js
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {renameSync , unlinkSync} from "fs";

const maxAge = 3 * 24 * 60 * 60;

const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

export const signup = async (request, response, next) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).send({ message: "Email and Password are required" });
    }

    const user = await User.create({ email, password });

    response.cookie("jwt", createToken(email, user.id), {
      maxAge: maxAge * 1000, // cookie maxAge needs ms
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return response.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
      },
    });
  } catch (error) {
    console.log(error);
    return response.status(500).send({ message: "Internal Server Error" });
  }
};

export const login = async (request, response, next) => {
try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).send({ message: "Email and Password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return response.status(404).send("User not found");
    }

    const auth = await bcrypt.compare(password , user.password);
    if(!auth) {
      return response.status(401).send({ message: "Invalid credentials" });
    }

    response.cookie("jwt", createToken(email, user.id), {
      maxAge: maxAge * 1000, // cookie maxAge needs ms
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return response.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
        color: user.color,
      },
    });
  } catch (error) {
    console.log(error);
    return response.status(500).send({ message: "Internal Server Error" });
  }
};

export const getUserInfo = async (request, response, next) => {
try {
  console.log(request.userId);
  const userData = await User.findById(request.userId);
  if(!userData) {
    return response.status(404).send("User not found");
  }
  return response.status(200).json({
      id: userData.id,
      email: userData.email,
      profileSetup: userData.profileSetup,
      firstName: userData.firstName,
      lastName: userData.lastName,
      image: userData.image,
      color: userData.color,
  
  });
} catch (error) {
  console.log(error);
  return response.status(500).send({ message: "Internal Server Error" });
}
};


export const updateProfile = async (request, response, next) => {
  try {
    const userId = request.userId;
    const {firstName , lastName , color } = request.body;
    if(!firstName || !lastName || color === undefined) {
      return response.status(400).send({ message: "All fields are required" });
    }
    const userData = await User.findByIdAndUpdate(userId, {
      firstName,
      lastName,
      color,
      profileSetup: true,
    }, {new: true , runValidators: true});
  
  return response.status(200).json({
      id: userData.id,
      email: userData.email,
      profileSetup: userData.profileSetup,
      firstName: userData.firstName,
      lastName: userData.lastName,
      image: userData.image,
      color: userData.color,
  
  });
} catch (error) {
    console.log(error);
    return response.status(500).send({ message: "Internal Server Error" });
  }
};

// In AuthController.js - addProfileImage function
export const addProfileImage = async (request, response, next) => {
  try {
    if(!request.file){
      return response.status(400).send({ message: "Image file is required" });
    }
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(request.file.mimetype)) {
      return response.status(400).send({ message: "Invalid file type" });
    }
    
    // Validate file size (5MB max)
    if (request.file.size > 5 * 1024 * 1024) {
      return response.status(400).send({ message: "File too large" });
    }

    const date = Date.now();
    let fileName = "uploads/profiles/" + date + "-" + request.file.originalname;
    renameSync(request.file.path, fileName);

    // ✅ Fix: Use correct variable name
    const updateUser = await User.findByIdAndUpdate(
      request.userId,
      {image: fileName},
      {new: true, runValidators: true}
    );

    return response.status(200).json({
      image: updateUser.image  // ✅ Fix: Use updateUser instead of userData
    });
  } catch (error) {
    console.log(error);
    return response.status(500).send({ message: "Internal Server Error" });
  }
};

export const removeProfileImage = async (request, response, next) => {
  try {
    const {userId }= request;
    const user = await User.findById(userId);
    if(!user) {
      return response.status(404).send("User not found");
    }
    if(user.image){
      unlinkSync(user.image);
    }
    user.image = undefined;
    await user.save();
  return response.status(200).send("Profile image removed successfully");
} catch (error) {
    console.log(error);
    return response.status(500).send({ message: "Internal Server Error" });
  }
};

