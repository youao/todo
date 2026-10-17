import { tokenToUid } from "../models/LoginModel.js";

const auth = async (req, res, next) => {
  const token = req.get("X-TOKEN");
  if (!token) {
    return res.json({
      code: 401,
      message: "401",
    });
  }
  const [err, uid] = await tokenToUid(token);
  if (err) {
    return res.json(err);
  }
  req.authUid = uid;
  next();
};

export default auth;
