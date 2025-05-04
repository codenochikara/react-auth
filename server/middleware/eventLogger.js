const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');

// Custom middleware logger

const logEvents = async (message, logName) => {
  const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
      await fsp.mkdir(path.join(__dirname, '..', 'logs'));
    }

    await fsp.appendFile(path.join(__dirname, '..', 'logs', logName), logItem);
  } catch (err) {
    console.log(err);
  }
}

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'requestLog.txt'); // Log the request method and URL to a file
  console.log(req.method, req.url);
  next(); // Call the next middleware or route handler
}

module.exports = { logEvents, logger };
