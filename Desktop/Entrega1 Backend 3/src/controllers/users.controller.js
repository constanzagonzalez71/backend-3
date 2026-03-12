import { usersService } from "../services/index.js";
import { createHash } from "../utils/password.utils.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await usersService.getAll();

    res.send({
      status: "success",
      payload: users,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      error: error.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.params.uid;

    const user = await usersService.getUserById(userId);

    if (!user) {
      return res.status(404).send({
        status: "error",
        error: "User not found",
      });
    }

    res.send({
      status: "success",
      payload: user,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      error: error.message,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { password, ...userData } = req.body;

    const hashedPassword = await createHash(password);

    const newUser = {
      ...userData,
      password: hashedPassword,
    };

    const result = await usersService.create(newUser);

    res.status(201).send({
      status: "success",
      payload: result,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.uid;
    const updateBody = req.body;

    const user = await usersService.getUserById(userId);

    if (!user) {
      return res.status(404).send({
        status: "error",
        error: "User not found",
      });
    }

    await usersService.update(userId, updateBody);

    res.send({
      status: "success",
      message: "User updated",
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.uid;

    const user = await usersService.getUserById(userId);

    if (!user) {
      return res.status(404).send({
        status: "error",
        error: "User not found",
      });
    }

    await usersService.delete(userId);

    res.send({
      status: "success",
      message: "User deleted",
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      error: error.message,
    });
  }
};

export default {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
