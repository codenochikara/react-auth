const bcrypt = require('bcrypt');
const UserModel = require('../models/User');

const createUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ "message": "Username and password are required." });

  // Check for duplicate usernames in the database
  const duplicate = await UserModel.findOne({ username });
  if (duplicate) return res.sendStatus(409); // Conflict
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and store the new user in the database - simultaneously creates the user and saves it to the database
    const newUser = await UserModel.create({
      username,
      password: hashedPassword,
      // roles: { user: 2309 }
    });

    // Create the new user first and then save it to the database (alternative method)
    /* const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save(); */

    res.status(201).json({ "success": `New user ${username} created.` });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ "message": err.message });
  }
}

module.exports = {
  createUser
};