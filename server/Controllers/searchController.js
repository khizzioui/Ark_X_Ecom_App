const { searchService } = require("../Services/searchService");


async function search(req,res){
    try{
        const data = {
            lat : parseFloat(req.query.lat),
            lang : parseFloat(req.query.lang),
            page : parselnt(req.query.page) - 1 || 0,
            limit : parselnt(req.query.limit) || 10,
            search : req.query.q,
            rayan: req.rayan  || 10
            

        }
        
        
        
        

        const response = searchService(data);
       
        res.status(200).json(response);
    }
    catch (e){
        console.log(err);
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
}


module.exports = {
    search
}