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

const createUser = async (req, res) => {
  try {
    const { name, phone_no, active, address } = req.body;
    const userId = await client.query(
      `insert into movies.user (name, active, phone_no) values ('${name}', ${active}, ${phone_no}) returning id;`
    );
    await client.query(
      `insert into movies.user_contact (user_id, address) values (${userId.rows[0].id}, '${address}');`
    );
    return res.status(200).json(`User ${name} created.`);
  } catch (error) {
    // console.log("error", error);
    return res.status(500).json({
      error: error,
    });
  }
};

export { getUser, createUser };
