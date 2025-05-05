const fsp = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const usersDB = {
  users: require('../model/users.json'),
  setUsers: function (data) { this.users = data; }
}

const createUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ "message": "Username and password are required." });
  // Check for duplicate usernames in the database
  const duplicate = usersDB.users.find(user => user.username === username);
  if (duplicate) return res.sendStatus(409); // Conflict
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Store the new user in the database
    const newUser = { username, password: hashedPassword };
    usersDB.setUsers([...usersDB.users, newUser]);
    await fsp.writeFile(path.join(__dirname, '..', 'model', 'users.json'), JSON.stringify(usersDB.users));
    res.status(201).json({ "success": `New user ${username} created.` });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ "message": err.message });
  }
}

module.exports = {
  createUser
};