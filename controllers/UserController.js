const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../Utiles/generateToken");

const createUser = async (req, res) => {
  const user = new User(req.body);
  const { email } = req.body;
  const { password } = req.body;

  const existe = await User.findOne({ email });
  if (existe) {
    return res.status(400).json("user with this email already existe");
  }
  const hashPsw = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name: user.name,
    email: user.email,
    age: user.age,
    password: hashPsw,

  });
  return res.status(201).json(newUser);
};

const login = async (req, res) => {
  try {
    const email = req.body.email
    const user = await User.findOne({email});
    const isMatch = await bcrypt.compare(req.body.password, user.password)
    console.log(user)
    if (user && isMatch) {
      res.json({
        name: user.name,
        email: user.email,
        age: user.age,
        token: generateToken(user._id)
      })
      console.log("login")
    }
    else {
      res.status(400).json("user not found")
    }

  }
  catch (error) {
    res.status(400).json({ error: error.msg })

  }
}

const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};


const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.status(200).json("user removed");
  } else {
    return res.status(400).json("user not found");
  }
};

const updateUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body,
      user.email = req.body,
      user.age = req.body
    if (req.body.password) {
      user.password = await bcrypt.hash(password, 10)

    }
    const updateUser = await user.save()
    res.json(updateUser.name,
      updateUser.email)

  }
  else {
    res.status(400).json("user not found");
  }
  res.status(200).json("user updated");
}

module.exports = {
  createUser,
  getUsers,
  deleteUser,
  updateUser,
  login
};
