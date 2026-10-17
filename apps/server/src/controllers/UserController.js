import * as UserModel from "../models/UserModel.js";
import * as LoginModel from "../models/LoginModel.js";
import crypto from "node:crypto";

export const register = async (req, res, next) => {
  try {
    const { phone, pwd } = req.body;
    const [err] = await UserModel.create(phone, pwd);
    if (err) {
      return res.json(err);
    }
    res.json({ code: 200 });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { phone, pwd } = req.body;
    const [errPhone, user] = await UserModel.findByPhone(phone);
    if (errPhone) {
      return res.json(errPhone);
    }

    const pwdMd5 = crypto.createHash("md5").update(pwd).digest("hex");
    if (pwdMd5 !== user.pwd) {
      return res.json({
        code: 400,
        message: "password error",
      });
    }

    const [errLogin, resLogin] = await LoginModel.uidToToken(user.id);
    if (errLogin) {
      return res.json(errLogin);
    }

    res.json({
      code: 200,
      data: resLogin,
    });
  } catch (err) {
    next(err);
  }
};

export const info = async (req, res, next) => {
  try {
    const uid = req.authUid;
    if (!uid) {
      return res.json({
        code: 400,
        message: "auth failed",
      });
    }
    const [err, user] = await UserModel.findById(uid);
    if (err) {
      return res.json(err);
    }

    res.json({
      code: 200,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
