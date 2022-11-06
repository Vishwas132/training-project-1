import client from "../models/database.js";

const getUserAddress = async (req, res) => {
  try {
    const name = req.params.name;
    const userId = await client.query(
      `select id from movies.user where name = '${name}';`
    );
    const address = await client.query(
      `select address from movies.user_contact where user_id = '${userId.rows[0].id}';`
    );
    return res.status(200).json(address.rows);
  } catch (error) {
    // console.log("error", error);
    return res.status(500).json({
      error: error,
    });
  }
};

export { getUserAddress };
