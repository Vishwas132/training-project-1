import getUserAddress from "../service/getUserAddress.js";

const getAddress = async (req, res) => {
  try {
    const { email } = req.body;
    const address = await getUserAddress(email);
    return res.status(200).json(address.rows);
  } catch (error) {
    // console.log("error", error);
    return res.status(500).json({
      error: error,
    });
  }
};

export default getAddress;
