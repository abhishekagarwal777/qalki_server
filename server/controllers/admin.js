const Admin = require("../models/authAdmin");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const getAllAdmin = async (req, res) => {
  const user = await Admin.find({});
  res.status(StatusCodes.OK).json({ user, count: user.length });
};

const deleteAdmin = async (req, res) => {
  const {
    params: { id: AdminId },
  } = req;
  const user = await Admin.findByIdAndRemove({ _id: AdminId });
  if (!user) {
    throw new NotFoundError(`No job with id ${UserId}`);
  }
  res.status(StatusCodes.OK).send("user deleted");
};

module.exports = { getAllAdmin, deleteAdmin };
