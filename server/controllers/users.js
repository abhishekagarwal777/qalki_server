const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const getAllUser = async (req, res) => {
  const user = await User.find({});
  res.status(StatusCodes.OK).json({ user, count: user.length });
};

const getSingleUser = async (req, res) => {
  const {
    params: { id: UserId },
  } = req;
  const user = await User.findOne({ _id: UserId });
  res.status(StatusCodes.OK).json({ user, count: user.length });
};

const deleteUser = async (req, res) => {
  const {
    params: { id: UserId },
  } = req;
  const user = await User.findByIdAndRemove({ _id: UserId });
  if (!user) {
    throw new NotFoundError(`No job with id ${UserId}`);
  }
  res.status(StatusCodes.OK).send("user deleted");
};

module.exports = { getAllUser, getSingleUser, deleteUser };
