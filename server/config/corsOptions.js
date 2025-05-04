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

/* const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers in requests
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
}; */

module.exports = corsOptions;
