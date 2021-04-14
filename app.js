const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const cheerio = require('cheerio');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/:user/:format', (req, res, next) => {
  const { format, user } = req.params;
  const FORMATS = ['activity', 'count']
  if (typeof user !== 'string') return next ({ 
    status: 400,
    message: 'Invalid type of user ' + typeof user + '. Expected to be of type \'String\'.'
  });
  if (typeof format !== 'string') return next ({ 
    status: 400,
    message: 'Invalid type of format ' + typeof user + '. Expected format to be of type \'String\'.'
  })
  if (!FORMATS.includes(format)) return next ({ 
    status: 400,
    message: 'Invalid format ' + JSON.stringify(format) +'. Expected one of ' + FORMATS.join(' or ') + '.'
  })
  const url = `https://www.github.com/${user}`;

  request.get(url, (err, response, body) => {
    // Return error if request had an error
    if (err) return next(err);

    // Return 404 if user not found
    if (response.statusCode === 404) return next({
      status: 404,
      message: `User '${user}' not found`
    });

    // Parse github profile page
    const $ = cheerio.load(body);
    let final = {};
    $('rect').get().reduce((data, rect) => {
      // Parse contributions value
      const value = (() => {
        const count = $(rect).data('count');
        if (format === 'activity') return count > 0;
        if (format === 'count') return count;
      })();

      // Parse contributions date
      if (!$(rect).data('date')) return;
      const [year, month, day] = $(rect).data('date').split('-').map(dateNum => parseInt(dateNum));
      if (!final[year]) final[year] = {};
      if (!final[year][month]) final[year][month] = {}
      final[year][month][day] = value
    }, {})
    let trimmed = {};
    for (let i = 0; i < Object.keys(final).length; i++) {
      let current = Object.values(final)[i];
      let currentYear = Object.keys(final)[i];
      let values = false;
      for (let [date, value] of Object.entries(Object.values(Object.entries(current)[i])[1])) {
        if (value !== 0 && value !== false) {
          values = true;
          break;
        };
      };

      if (values) trimmed[currentYear] = current;
    }
    res.json(trimmed)
  })
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ message: err.message });
});

function getGithubContributions (user, format) {
  return new Promise((resolve, reject) => {
    const FORMATS = ['activity', 'count']
    if (typeof user !== 'string') reject ('Invalid type of user \'' + typeof user + '\'. Expected to be of type \'String\'.');
    if (typeof format !== 'string') reject ('Invalid type of format \'' + typeof user + '\'. Expected format to be of type \'String\'.')
    if (!FORMATS.includes(format)) reject('Invalid format ' + JSON.stringify(format) +'. Expected one of ' + FORMATS.join(' or '));
    const url = `https://www.github.com/${user}`;

    request.get(url, (err, response, body) => {
      // Return error if request had an error
      if (err) return next(err);
  
      // Return 404 if user not found
      if (response.statusCode === 404) reject({
        status: 404,
        message: `User '${user}' not found`
      });
  
      // Parse github profile page
      const $ = cheerio.load(body);
      let final = {};
      $('rect').get().reduce((data, rect) => {
        // Parse contributions value
        const value = (() => {
          const count = $(rect).data('count');
          if (format === 'activity') return count > 0;
          if (format === 'count') return count;
        })();
  
        // Parse contributions date
        if (!$(rect).data('date')) return;
        const [year, month, day] = $(rect).data('date').split('-').map(dateNum => parseInt(dateNum));
        if (!final[year]) final[year] = {};
        if (!final[year][month]) final[year][month] = {}
        final[year][month][day] = value
      }, {})
      let trimmed = {};
      for (let i = 0; i < Object.keys(final).length; i++) {
        let current = Object.values(final)[i];
        let currentYear = Object.keys(final)[i];
        let values = false;
        for (let [date, value] of Object.entries(Object.values(Object.entries(current)[i])[1])) {
          if (value !== 0 && value !== false) {
            values = true;
            break;
          };
        };

        if (values) trimmed[currentYear] = current;
      }
      resolve(trimmed);
    })
  })
}

module.exports = getGithubContributions;
module.exports.Server = app;
module.exports.getGithubContributions = getGithubContributions;