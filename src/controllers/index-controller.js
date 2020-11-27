

exports.index = (request, response) => {    

    return response.render('main/start', {
        title: "Start",
        layout: 'layouts/default'        
    })    
    
}