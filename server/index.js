const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const verifyJWT = require('./middleware/verifyJWT');
const { logger } = require('./middleware/eventLogger');
const credentials = require('./middleware/credentials');
const errorHandler = require('./middleware/errorHandler');
const corsOptions = require('./config/corsOptions');
const { rootRouter } = require('./routes/root');
const { employeesRouter } = require('./routes/api/employees');
const { registerRouter } = require('./routes/register');
const { authRouter } = require('./routes/auth');
const { refreshRouter } = require('./routes/refresh');
const { logoutRouter } = require('./routes/logout');

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3001;

app.use(logger); // Middleware to log requests to the console and a file

app.use(credentials); // Middleware to set CORS credentials

app.use(cors(corsOptions)); // Middleware to enable CORS (Cross-Origin Resource Sharing)

// Serve static files from the public folder in the root directory - Mounts the public folder to the root URL
app.use(express.static(path.join(__dirname, 'public'))); // Middleware to serve static files from the public directory

app.use(express.urlencoded({ extended: false })); // Middleware to parse URL-encoded data (form submissions)

app.use(express.json()); // Middleware to parse JSON data (API requests)

app.use(cookieParser()); // Middleware to parse cookies from the request headers

// Router routes

app.use('/', rootRouter);
app.use('/register', registerRouter);
app.use('/auth', authRouter);
app.use('/refresh', refreshRouter);
app.use('/logout', logoutRouter);
app.use(verifyJWT); // Middleware to verify JWT tokens for protected routes
app.use('/employees', employeesRouter);

// Universal route handler for all other routes

app.all('*splat', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ "error": "404 Not Found" });
  } else {
    res.type('txt').send("404 Not Found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
