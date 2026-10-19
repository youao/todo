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
    res.success();
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
      return res.failed("password error");
    }

    const [errLogin, resLogin] = await LoginModel.uidToToken(user.id);
    if (errLogin) {
      return res.json(errLogin);
    }

    res.success(resLogin);
  } catch (err) {
    next(err);
  }
};

export const info = async (req, res, next) => {
  try {
    const uid = req.authUid;
    if (!uid) {
      return res.failed("auth failed");
    }
    const [err, user] = await UserModel.findById(uid);
    if (err) {
      return res.json(err);
    }

    res.success(user);
  } catch (err) {
    next(err);
  }
};

export const updateNickname = async (req, res, next) => {
  try {
    const uid = req.authUid;
    if (!uid) {
      return res.failed("auth failed");
    }
    const { nickname } = req.body;
    if (!nickname) {
      return res.failed("miss nickname");
    }
    const [err, data] = await UserModel.update(uid, "nickname", nickname);
    if (err) {
      return res.json(err);
    }

    res.success(data);
  } catch (err) {
    next(err);
  }
};

export const updateAvatar = async (req, res, next) => {
  try {
    const uid = req.authUid;
    if (!uid) {
      return res.failed("auth failed");
    }
    const { avatar } = req.body;
    if (!avatar) {
      return res.failed("miss avatar");
    }
    const [err, data] = await UserModel.update(uid, "avatar", avatar);
    if (err) {
      return res.json(err);
    }

    res.success(data);
  } catch (err) {
    next(err);
  }
};
