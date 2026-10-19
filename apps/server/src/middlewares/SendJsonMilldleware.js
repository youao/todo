const sendJson = async (req, res, next) => {
  res.success = (data = true, message = "success") => {
    return res.json({
      code: 200,
      message,
      data,
    });
  };
  res.failed = (message = "request failed", code = 400, data = null) => {
    return res.json({
      code,
      message,
      data,
    });
  };
  next();
};

export default sendJson;
