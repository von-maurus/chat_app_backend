const { generateToken } = require("../helpers/jwt");
const User = require("../models/user");
const bcrypt = require("bcryptjs");


// User login
const loginUser = async (req, res = response) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ ok: false, msg: "User doesn't exist..." })
    }

    // Confirm password
    const validPassword = bcrypt.compareSync(password, userExist.password);
    if (!validPassword) {
      return res.status(400).json({ ok: false, msg: "Password is incorrect..." })
    }

    // Generate JWT
    const token = await generateToken(userExist.id)

    res.json({ ok: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: "[LoginError] Please contact admin..." })
  }
}

// User registration
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

// Validate a session token
const refresh = async (req, res = response) => {
  try {
    const { email, password, uid } = req.body
    // generate a new jwt token
    const token = await generateToken(uid)

    const user = await User.findById(uid);
    if (!user) {
      return res.status(400).json({ ok: false, msg: "User doesn't exist..." })
    }
    res.json({ ok: true, user, token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: "[TokenValidationError] Please contact admin..." })
  }
}

module.exports = {
  createUser, loginUser, refresh
}