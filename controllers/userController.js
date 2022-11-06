import client from "../models/database.js";

const getUser = async (req, res) => {
  try {
    const name = req.params.name;
    const user = await client.query(
      `select name, active, phone_no from movies.user where name = '${name}';`
    );
    return res.status(200).json(user.rows);
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      error: error,
    });
  }
};


export { getUser };
