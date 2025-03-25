module.exports = (req, res, next) => {
  if (!req.body.title || !req.body.status) {
    return res.status(400).json({ error: 'Title and status are required' });
  }
  next();
};
