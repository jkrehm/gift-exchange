
/*
 * GET home page.
 */

exports.index = function(req, res){
  var sqlite3 = require('sqlite3').verbose()
    , db = new sqlite3.Database('exchange.sqlite')
    , year = new Date().getFullYear();

  db.all('SELECT * FROM person a LEFT JOIN gift_exchange_info b ON year = ? AND b.giver = a.id WHERE a.active = 1 ORDER BY random()', year, function(err, row) {
    res.render('index', {
      family: row,
      year: year
    });
  });
};