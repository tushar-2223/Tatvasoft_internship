const express = require('express');
const router = express.Router();

require('../db/conn');
const User = require('../model/userSchema');

const cookieParser = require('cookie-parser');
router.use(cookieParser());

router.get('/', (req, res) => {
  res.send('MERN Auth Project Backend Port No : 5000');
});

router.post('/register', async (req, res) => {
  const { firstname, lastname, email, roles, password, cpassword } = req.body;

  if (!firstname || !lastname || !email || !roles || !password || !cpassword) {
    return res.status(422).json({ error: 'fill the proper details' });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: 'Email alredy Exist' });
    }

    const user = new User({
      firstname,
      lastname,
      email,
      roles,
      password,
      cpassword,
    });

    const userRegister = await user.save();

    if (userRegister) {
      res.status(201).json({ message: 'user register successfuly' });
    } else {
      res.status(500).json({ error: 'failed to register' });
    }
  } catch (err) {
    console.log(err);
  }

  res.json({ message: req.body });
});

// login auth/validation
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'filled the proper data' });
    }

    const userLogin = await User.findOne({ email: email });

    // console.log(userLogin); //get all data

    if (userLogin) {
      if (password == userLogin.password) {
        res.status(400).json({ error: 'Invalid Credientials' });
      } else {
        res.json({ message: 'user signin successfully' });
      }
    } else {
      res.status(400).json({ error: 'Invalid Credientials' });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get('/getdata', (req, res) => {
  res.send(req.rootUser);
});

module.exports = router;
