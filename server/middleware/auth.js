const jwt = require("jsonwebtoken");


exports.auth = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Token is missing or invalid',
    });
  }
  const token = authHeader.split('Bearer ')[1];

  try {
    const user = jwt.verify(token, process.env.SECRET);
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({
      message: 'Token is not valid',
      error: err,
    });
  }  
};
