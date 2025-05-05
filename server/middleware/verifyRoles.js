const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) {
      return res.status(401).json({ message: 'Unauthorized to perform this action.' });
    }

    const rolesArray = [...allowedRoles];
    const result = req.roles
      .map(role => rolesArray.includes(role))
      .find(val => val === true);

    if (!result) {
      return res.status(401).json({ message: 'Unauthorized to perform this action.' });
    }
    next();
  };
}

module.exports = verifyRoles;
