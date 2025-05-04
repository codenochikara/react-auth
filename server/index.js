const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const { logger } = require('./middleware/eventLogger');
const errorHandler = require('./middleware/errorHandler');

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3001;

app.use(logger); // Middleware to log requests to the console and a file

// Middleware to enable CORS (Cross-Origin Resource Sharing)
const whitelist = ['http://127.0.0.1:5500', 'http://localhost:5173'];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) { // Allow requests from the whitelist or no origin (e.g., Postman)
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Access blocked by CORS')); // Block the request
    }
  },
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

// Serve static files from the public folder in the root directory - Mounts the public folder to the root URL
app.use(express.static(path.join(__dirname, 'public'))); // Middleware to serve static files from the public directory

app.use(express.urlencoded({ extended: false })); // Middleware to parse URL-encoded data (form submissions)

app.use(express.json()); // Middleware to parse JSON data (API requests)

/* Serve static files from the 'css' directory - Mounts the 'css' directory to the root URL
So that you can access files in the 'css' directory directly from the root URL (e.g., http://localhost:3001/style.css)
In the HTML file, you can link to the CSS file using a relative path (e.g., <link rel="stylesheet" href="/style.css">)
This is useful for serving static assets like CSS, JavaScript, images, etc.
You can also use it to serve files from other directories by changing the path in the join method. */
// app.use(express.static(path.join(__dirname, 'css')));

const indexRouteRegex = /^\/$|\/index(.html)?/; // '^/$|/index(.html)?' - Matches both '/' and '/index' or '/index.html'
const newPageRouteRegex = /^\/new-page(.html)?/; // '/new-page(.html)?' - Matches both '/new-page' and '/new-page.html'

// Routes

app.get(indexRouteRegex, (req, res) => {
  // res.send('Hello World!');
  // res.sendFile('./views/index.html', { root: __dirname });
  // res.sendFile(path.join(__dirname, '/views/index.html'));
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get(newPageRouteRegex, (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

app.get('/old-page', (req, res) => {
  res.redirect(301, '/new-page'); // 302 - Temporary redirect (by default), 301 - Permanent redirect (saved in browser cache)
});

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
