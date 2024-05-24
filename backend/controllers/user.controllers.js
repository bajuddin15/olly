import bcrypt from "bcrypt";
import User from "../models/user.models.js";
import About from "../models/about.model.js";

export const createUser = async (req, res) => {
  const { fullName, email, phone, password } = req.body;

  try {
    // Find if user exist or not
    const user = await User.findOne({
      email,
    });
    if (user) {
      return res.status(200).json({
        success: true,
        message: "User already exist",
        data: {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
        },
      });
    }

    // User not exist

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullName,
      email,
      phone,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created",
      data: {
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        phone: newUser.phone,
      },
    });
  } catch (error) {
    console.log("Error in createUser controller : ", error?.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const createAboutBusiness = async (req, res) => {
  const { id: userId } = req.params;
  try {
    const newAbout = new About({
      ...req.body,
    });

    if (newAbout) {
      const user = await User.findById(userId);
      user.aboutBusiness = newAbout._id;

      await Promise.all([newAbout.save(), user.save()]);

      const findUser = await User.findById(userId)
        .select("-password")
        .populate("aboutBusiness");
      res.status(201).json({
        success: true,
        message: "Congratulations! Your account is ready.",
        data: findUser,
      });
    } else {
      res.status(409).json({
        success: false,
        message: "Please fill all fields",
      });
    }
  } catch (error) {
    console.log("Error in createAboutBusiness controller : ", error?.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getUser = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({
      email,
    })
      .select("-password")
      .populate("aboutBusiness");

    if (user) {
      res.status(200).json({
        success: true,
        message: "User found",
        data: user,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    console.log("Error in getUser controller : ", error?.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
