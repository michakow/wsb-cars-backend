const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    console.log(token, decoded);
    if (decoded.email !== req.body.email) {
      throw 'Błąd autoryzacji';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      message: 'Błąd autoryzacji',
    });
  }
};
