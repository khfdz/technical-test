const User = require('../models/userModels');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY);
};

const registerUser = async (req, res) => {
  const { us_name, us_email, us_password, us_phone_number, us_address, us_id } = req.body;

  try {
    const userExists = await User.findOne({ us_email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      us_id,
      us_name,
      us_email,
      us_password,
      us_phone_number,
      us_address,
    });

    res.status(201).json({ message: 'User REGISTER successful', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { us_email, us_password } = req.body;

  try {
    const user = await User.findOne({ us_email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await user.matchPassword(us_password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Password or email is incorrect' });
    }

    const token = generateToken(user.us_id);

    res.status(200).json({ message: 'User LOGIN successfully', user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const findUser = async (req, res) => {
  const userId = req.params.us_id;

  try {
    const user = await User.findOne({ us_id: userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User found', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.us_id;
  const { us_name, us_email, us_password, us_phone_number, us_address } = req.body;

  try {
    const user = await User.findOne({ us_id: userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.us_name = us_name;
    user.us_email = us_email;
    user.us_password = us_password;
    user.us_phone_number = us_phone_number;
    user.us_address = us_address;

    await user.save();

    res.status(200).json({ message: 'User UPDATED successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.us_id;

  try {
    const user = await User.findOne({ us_id: userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await User.deleteOne({ us_id: userId });

    res.status(200).json({ message: 'User DELETED successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  generateToken,
  findUser,
  updateUser,
  deleteUser
};
