const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const { logger } = require('./middleware/eventLogger');
const errorHandler = require('./middleware/errorHandler');
const { subviewsRouter } = require('./routes/subview');
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
app.use('/subview', express.static(path.join(__dirname, 'public'))); // Middleware to serve static files from the public directory

/* Serve static files from the 'css' directory - Mounts the 'css' directory to the root URL
So that you can access files in the 'css' directory directly from the root URL (e.g., http://localhost:3001/style.css)
In the HTML file, you can link to the CSS file using a relative path (e.g., <link rel="stylesheet" href="/style.css">)
This is useful for serving static assets like CSS, JavaScript, images, etc.
You can also use it to serve files from other directories by changing the path in the join method. */
// app.use(express.static(path.join(__dirname, 'css')));

app.use(express.urlencoded({ extended: false })); // Middleware to parse URL-encoded data (form submissions)

app.use(express.json()); // Middleware to parse JSON data (API requests)

// Router routes

app.use('/', rootRouter);
app.use('/subview', subviewsRouter);
app.use('/employees', employeesRouter);

// Route handlers

app.get('/api', (req, res, next) => {
  console.log('API route handler');
  next(); // Call the next middleware or route handler
}, (req, res) => {
  res.json({ message: 'Hello from the API!' });
  // res.send('Hello from the API!');
});

// Chaining route handlers

const one = (req, res, next) => {
  console.log('one');
  next();
}

const two = (req, res, next) => {
  console.log('two');
  next();
}

const three = (req, res) => {
  console.log('three');
  res.send('Finished!');
}

app.get('/chain', [one, two, three]);

// Universal route handler for all other routes

/* app.get('/*splat', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
}); */

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
