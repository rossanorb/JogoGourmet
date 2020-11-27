var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "gourmet.db" 

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQlite database.')
        db.run(`CREATE TABLE pratos (
            id INTEGER,
            prato text, 
            S INTEGER, 
            N INTEGER
            )`,(err) => {
        if (err) {
            console.error(err.message)
        }
    })  
    }
})


module.exports = db

