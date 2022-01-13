const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
// jwt
const jwt = require('jsonwebtoken');
// REGISTER
router.post('/register', async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    // hash password
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
  });
  try {
    // lưu usẻ lại ở trên moggo
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});
// LOGIN
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(401).json('Wrong password or username!');

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    originalPassword !== req.body.password &&
      res.status(401).json('Wrong password or username!');

    // accessToken
    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: '5d' }
    );

    // user._doc ở đây là dữ liệu từ mongo trả về
    // í ở dưới là che đi password
    const { password, ...info } = user._doc;

    // nếu dữ liệu trùng thì trả ra
    res.status(200).json({ ...info, accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
