const searchService  = require('../services/searchService');


async function search(req,res){
    try{
        const data = {
            location : {
                lat : parseFloat(req.query.lat) || '',
                lang:parseFloat(req.query.lang) || ''
            },
            page : parseInt(req.query.page) - 1 || 0,
            limit : parseInt(req.query.limit) || 10,
            search : req.query.q,
            radius: req.radius  || 10,
            ip:req.ip=='::1'?'105.191.26.154':req.ip
        }
        
        

        const response = await searchService.search(data);
        
       
        res.status(200).json(response);
    }
    catch (e){
        console.log(e);
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
}


module.exports = {
    search
}