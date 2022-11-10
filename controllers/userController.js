import getUserById from "./../service/getUser.js";
import createNewUser from "./../service/createUser.js";
import deleteUserById from "./../service/deleteUser.js";
import signInUser from "./../service/signInUser.js";
import signOutUser from "./../service/signOutUser.js";

const getUser = async (req, res) => {
  try {
    const { email } = req.body;
    const userObj = await getUserById(email);
    return res.status(200).json({
      user: userObj.rows[0],
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      error: error,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const token = await createNewUser(req);
    res.status(200).json({ token });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ error: error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { email } = req.body;
    const name = await deleteUserById(email);
    return res.status(200).json(`User ${name} with email ${email} deleted`);
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      error: error,
    });
  }
};

const signIn = async (req, res) => {
  try {
    const token = await signInUser(req);

    return res.status(200).json({ token });
  } catch (error) {
    console.log("error", error);
    return res.status(400).json({
      error,
    });
  }
};

const signOut = async (req, res) => {
  try {
    const { email } = req.body;
    const name = await signOutUser(email);
    return res.status(200).json(`User ${name} with email ${email} signed out`);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export { getUser, createUser, signIn, deleteUser, signOut };
