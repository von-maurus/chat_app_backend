const { generateToken } = require("../helpers/jwt");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.body.uid } }).sort('-online');
    res.status(200).json({ ok: true, users, msg: "" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: error.message });
  }
};

const getUserById = (req, res) => {
  try {
    // const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res = response) => {
  try {
    const { email, password } = req.body
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ ok: false, msg: "Email already exists..." })
    }
    const user = new User(req.body);
    // Encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    // Save user
    await user.save();

    // Generate JWT
    const token = await generateToken(user.id)
    res.json({ ok: true, user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: "[CreateUserError] Please contact admin..." })
  }
}

const deleteUser = async (req, res) => {
  try {
    // const deletedUser = await userService.deleteUser(req.params.id);
    // if (!deletedUser) {
    //   return res.status(404).json({ message: 'User not found' });
    // }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser
};