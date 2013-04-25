/*
 * POST drawing.
 */

var draw = {
  year: new Date().getFullYear(),

  drawName: function(data) {
    var rand = Math.floor(Math.random() * 8);

    if (rand != data.giver) {
      data.receiver = rand;
      draw.nameAvailable(data);
    }
    else {
      draw.drawName(data);
    }
  },

  nameAvailable: function(data) {
    var params = {
      $year: draw.year,
      $id: data.receiver
    };

    data.db.all('SELECT * FROM exchange WHERE year = $year AND receiver = $id', params, function(err, row) {
      if (row.length === 0) {
        draw.isSpouse(data);
      }
      else {
        draw.drawName(data);
      }
    });
  },

  isSpouse: function(data) {
    var params = {
      $giver: data.giver,
      $receiver: data.receiver
    };

    data.db.all('SELECT * FROM person WHERE id = $giver AND spouse = $receiver', params, function(err, row) {
      if (row.length === 0) {
        draw.storeName(data);
      }
      else {
        draw.drawName(data);
      }
    });
  },

  storeName: function(data) {
    data.db.run('INSERT INTO exchange VALUES($year, $giver, $receiver)', {
      $year: draw.year,
      $giver: data.giver,
      $receiver: data.receiver
    });

    data.db.all('SELECT * FROM person WHERE id = $id', { $id: data.receiver }, function(err, row) {
      draw.showPerson(data.res, row[0]);
    });
  },

  showPerson: function(res, person) {
    res.json(person);
  }
};


exports.draw = function(req, res) {
  var sqlite3 = require('sqlite3').verbose()
    , db = new sqlite3.Database('exchange.sqlite')
    , id = Number(req.body.person)
    , params = {
      $id: id,
      $year: draw.year
    };

  db.all('SELECT b.* FROM exchange a, person b WHERE a.year = $year AND a.giver = $id AND b.id = a.receiver', params, function(err, row) {
    if (row.length > 0) {
      draw.showPerson(res, row[0]);
    }
    else {
      draw.drawName({ res: res, db: db, giver: id });
    };
  });
};