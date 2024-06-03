const searchService  = require('../services/searchService');


async function search(req,res){
    
        const data = {
            location : {
                lat : parseFloat(req.query.lat) || '',
                lang:parseFloat(req.query.lang) || ''
            },
            page : parseInt(req.query.page) - 1 || 0,
            limit : parseInt(req.query.limit) || 9,
            search : req.query.q,
            radius: !req.query.radius || req.query.radius == 0 ? Infinity : req.query.radius,
            ip:req.ip=='::1'?'196.117.236.26':req.ip,
            maxprice: req.query.maxprice,
            minprice: req.query.minprice
        }
        console.log(req.ip)
        await searchService.search(data).then((response) => {
            res.status(200).json(response);
        }).catch((error) => {
            console.log(error);
            res.status(500).json(error);
        });
        
       
        
    
}


module.exports = {
    search
}