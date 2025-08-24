import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign(
    { id }, // payload
    process.env.JWT_SECRET, // secret key from .env
    { expiresIn: "30d" } // token expiry
  );
};

export default generateToken;
