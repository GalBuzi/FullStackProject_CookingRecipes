//class for register/login

var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("./utils/db");

// =======EndPoints=======

//========Register========

router.post("/register", async (req, res, next) => {
  try {
    // parameters exists
    // valid parameters
    // username exists
    const users = await db.getAllUsernamesInDB();

    if (users.find((x) => x.username === req.body.username))
      throw { status: 409, message: "Username taken" };

    // add the new username
    let hash_password = bcrypt.hashSync(
      req.body.password,
      parseInt(process.env.bcrypt_saltRounds)
    );

    await db.insertUser(req.body, hash_password);

    res.status(200).send({ message: "user created", success: true });
  } catch (error) {
    next(error);
  }
});

//========Login========
router.post("/login", async (req, res, next) => {
  try {
    // check that username exists
    const users = await db.getAllUsernamesInDB();
    if (!users.find((x) => x.username === req.body.username))
      throw { status: 401, message: "Username Or Password incorrect" };

    const user = await db.getUserDetailsByUsernameFromDB(req.body.username);

    if (!bcrypt.compareSync(req.body.password, user[0].password)) {
      throw { status: 401, message: "Username Or Password incorrect" };
    }

    // Set cookie
    req.session.user_id = user[0].user_id;
    // req.session.save();
    // res.cookie(session_options.cookieName, user.user_id, cookies_options);

    // return cookie
    res.status(200).send({ message: "login succeeded", success: true });
  } catch (error) {
    next(error);
  }
});

//========Logout========
router.post("/logout", function (req, res) {
  req.session.reset(); // reset the session info --> send cookie when  req.session == undefined!!
  res.send({ success: true, message: "logout succeeded" });
});

module.exports = router;
