const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const { logger } = require('./middleware/eventLogger');
const errorHandler = require('./middleware/errorHandler');
const { rootRouter } = require('./routes/root');
const { employeesRouter } = require('./routes/api/employees');
const corsOptions = require('./config/corsOptions');

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3001;

app.use(logger); // Middleware to log requests to the console and a file

app.use(cors(corsOptions)); // Middleware to enable CORS (Cross-Origin Resource Sharing)

// Serve static files from the public folder in the root directory - Mounts the public folder to the root URL
app.use(express.static(path.join(__dirname, 'public'))); // Middleware to serve static files from the public directory

app.use(express.urlencoded({ extended: false })); // Middleware to parse URL-encoded data (form submissions)

app.use(express.json()); // Middleware to parse JSON data (API requests)

// Router routes

app.use('/', rootRouter);
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
  console.log(`Server is running on http://localhost:${PORT}`);
});
