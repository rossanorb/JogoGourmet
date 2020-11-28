var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "gourmet.db" 

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      console.error(err.message)
      throw err
    } else {
        console.log('Connected to the SQlite database.')
        db.run(`CREATE TABLE pratos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            prato text,
            n INTEGER,
            s INTEGER,            
            ref INTEGER,
            optref text
            )`,(err) => {
                if (err) {
                    console.error(err.message)
                } else {
                    let insert = 'INSERT INTO pratos (prato, n, s, ref, optref) VALUES (?, ?, ?, ?, ?)'
                    db.run(insert, ["massa", 2, 3, null, ''],function(err){
                        db.run(insert, ["bolo de chocolate", null, null, 1, 'n'], function(err){
                            db.run(insert, ["lasanha", null, null, 1, 's'])
                        })
                    })
                }
            })  
    }
})


module.exports = db

