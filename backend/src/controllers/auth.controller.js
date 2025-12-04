const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const foodPartnerModel = require("../models/foodpartner.model");
const bcrypt = require("bcryptjs");

async function registerUser(req, res) {
  const { fullName, email, password } = req.body;

  const isUseraAlreadyExists = await userModel.findOne({ email });

  if (isUseraAlreadyExists) {
    return res.status(400).json({
      message: "user already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    fullName,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("userToken", token,{
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

  res.status(201).json({
    message: "user registered successfully",
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
  });
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "invalid email or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "invalid email or password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("userToken", token,{
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

  res.status(200).json({
    message: "user logged in successfully",
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
  });
}

function logoutUser(req, res) {
  res.clearCookie("userToken");
  res.status(200).json({
    message: " user logged out successfully",
  });
}

async function registeredFoodPartner(req, res) {
  const { name, email, contact, password, address } = req.body;

  const isAccountAlreadyExists = await foodPartnerModel.findOne({
    email,
  });

  if (isAccountAlreadyExists) {
    return res.status(400).json({
      message: "Food partner account already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const foodPartner = await foodPartnerModel.create({
    name,
    email,
    contact,
    password: hashedPassword,
    address,
  });

  const token = jwt.sign(
    {
      id: foodPartner._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("foodPartnerToken", token,{
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

  res.status(201).json({
    message: "Food partner registered successfully",
    foodPartner: {
      _id: foodPartner._id,
      email: foodPartner.email,
      name: foodPartner.name,
    },
  });
}

async function loginFoodPartner(req, res) {
  const { email, password } = req.body;

  const foodPartner = await foodPartnerModel.findOne({ email });
  if (!foodPartner) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, foodPartner.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign(
    {
      id: foodPartner._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("foodPartnerToken", token,{
      maxAge: 7 * 24 * 60 * 60 * 1000
    }
  );
  res.status(200).json({
    message: "foodpartner Login successful",
    foodPartner: {
      _id: foodPartner._id,
      email: foodPartner.email,
      name: foodPartner.name,
    },
  });
}

async function logoutFoodPartner(req, res) {
  res.clearCookie("foodPartnerToken");
  res.status(200).json({
    message: "Food partner logged out successfully",
  });
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  registeredFoodPartner,
  loginFoodPartner,
  logoutFoodPartner,
};
