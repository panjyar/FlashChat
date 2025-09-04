// controllers/AuthController.js
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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
