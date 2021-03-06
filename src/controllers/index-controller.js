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
    let ref = request.query.ref || null;
    let option = request.query.option || null;

    if (option == 's') {
        id = sim;
    } else if (option == 'n') {
        id = nao;
    }

     // acertou ?
    if (!id && ref && option == 's') {
        return response.redirect('/acertei')
    }

    // cria novo    
    if (!id && ref && option == 'n') {
        return response.redirect(`/novo-prato?id=${request.query.id}`)
    }

    if (id === null) {
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
                prato: row.prato || null,
                ref: row.ref || null
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
                prato: row.prato || null,
                ref: row.ref || null
            })
        });
    }

}

exports.novoPrato = (request, response) => {
    return response.render('main/novoPrato', {
        layout: 'layouts/default',
        cid: request.query.id
    })
}

exports.novaOpcao = (request, response) => {
    let cid = request.query.cid;

    db.get('SELECT * FROM pratos where id = ?', [cid], (err, row) => {
        if (err) {
            return console.error(err.message);
        }

        return response.render('main/novaOpcao', {
            layout: 'layouts/default',
            cprato: row.prato,
            ref: row.ref,
            optref: row.optref,
            cid: request.query.cid,
            nome_prato: request.query.nome_prato
        });

    });
}

exports.save = (request, response) => {

    let opcao = request.body.opcao;
    let nome_prato = request.body.nome_prato;
    let ref = request.body.ref;
    let optref = request.body.optref;
    let cid = request.body.cid;
    
    db.run('INSERT INTO pratos (prato, n, s, ref, optref) VALUES (?, ?, ?, ?, ?)', [opcao, cid, null, ref, optref], function (err) {
        if (err) {
            return console.log(err.message);
        }

        let idOption = this.lastID;

        db.run('UPDATE pratos SET ref = ?, optref = ? WHERE id = ?', [idOption, 'n', cid]);

        db.run('INSERT INTO pratos (prato, n, s, ref, optref ) VALUES (?, ?, ?, ?, ?)', [nome_prato, null, null, idOption, 's'], function (err) {
            if (err) {
                return console.log(err.message);
            }

            let pratoId = this.lastID;
            db.run('UPDATE pratos SET s = ? WHERE id = ? ', [pratoId, idOption]);

        });

        
        let sql = '';
        if (optref == 's') {
            sql = 'UPDATE pratos SET s = ? WHERE id = ? ';
        } else {
            sql = 'UPDATE pratos SET n = ? WHERE id = ? ';
        }

        db.run(sql, [idOption, ref]);


        return response.redirect('/')
    });

}

exports.acertei = (request, response) => {
    return response.render('main/acertei', {
        layout: 'layouts/default'
    })
}