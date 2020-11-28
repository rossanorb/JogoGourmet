var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "gourmet.db" 

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQlite database.')
        db.run(`CREATE TABLE pratos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            prato text,
            n INTEGER,
            s INTEGER,
            ref INTEGER
            )`,(err) => {
        if (err) {
            console.error(err.message)
        } else {
            let insert = 'INSERT INTO pratos (prato, n, s, ref) VALUES (?,?,?,?)'
            db.run(insert, ["massa", 2, 3, null])
            db.run(insert, ["bolo de chocolate", null, null, 1])
            db.run(insert, ["lasanha", null, null, 1])
        }
    })  
    }
})


module.exports = db

