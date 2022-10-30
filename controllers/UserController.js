const User = require("../models/User");

const createUser = async (req, res) => {
  const user = new User(req.body);
  const { email } = req.body;
  const existe = await User.findOne({ email });
  if (existe) {
    return res.status(400).json("user with this email already existe");
  }
  const newUser = await user.save();
  return res.status(201).json(newUser);
};

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
  try  {
    const user = await User.findById(req.params.id);
    Object.assign(user,req.body)
    await user.save()
    res.status(200).json("user updated");
  }
  catch (error){
    return res.status(400).json("user not found");
  }
  
};



module.exports = {
  createUser,
  getUsers,
  deleteUser,
  updateUser
};
