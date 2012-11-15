
/*
 * GET home page.
 */

exports.index = function(req, res){
  var sqlite3 = require('sqlite3').verbose()
    , db = new sqlite3.Database('exchange.sqlite');

  db.all('SELECT * FROM person a LEFT JOIN gift_exchange_info b ON b.giver = a.id ORDER BY random()', function(err, row) {
    var year = row[0].year;

    res.render('index', {
      family: row,
      year: year
    });
  });
};