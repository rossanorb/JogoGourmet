var sqlite3 = require('sqlite3').verbose()
const db = require("./../database")


exports.index = (request, response) => {
    
    return response.render('main/start', {
        title: "Start",
        layout: 'layouts/default'        
    })    
    
}

exports.proximo = (request, response) => {

    let id = request.query.id || null;
    let sim = request.query.sim || null;
    let nao = request.query.nao || null;

    console.log(`id: ${id}`);

    const option = request.query.option || null;

    if(option == 's'){
        id = sim;
    } else if(option == 'n') {
        id = nao;
    }
    
    if(id === null ){
        db.get('SELECT * FROM pratos order by id limit 1', [], (err, row) => {
            if (err) {
                return console.error(err.message);        
            }
            
            return response.render('main/proximo', {
                title: "Start",
                layout: 'layouts/default',
                id: row.id || null,
                sim: row.s || null,
                nao: row.n || null,
                prato: row.prato || null
            })        
        });
    } else {
        db.get('SELECT * FROM pratos where id = ?', [id], (err, row) => {
            if (err) {
                return console.error(err.message);        
            }
            
            return response.render('main/proximo', {
                title: "Start",
                layout: 'layouts/default',
                id: row.id || null,
                sim: row.s || null,
                nao: row.n || null,
                prato: row.prato || null
            })        
        });

    }
    
 
}