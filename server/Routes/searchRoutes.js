const { Router } = require("express");

const router = require("express").Router();









router.get("/search",async (rep,res)=>{
    try{
        const page = parselnt(req.query.page) - 1 || O;
        const limit = parselnt(req.query.limit) || 5;
        const search = req.query.q || "";
        let sort = req.query.sort || "favorite";
        let categorie = req.query.categorie || "ALL";
        let categories = [];
        categorie === "ALL"? (categories=[...allgenre]):req.query.genre.split(",");
        req.query.sort?(sort= req.query.sort.split(",")):(sort=[sort]);
        let sortby={};
        if(sort[1]){
            sortby[sort[0]]=sort[1];
        }
        else{
            sortby[sort[0]]="asc";
        }
        const products = await Product.find({name:{$regex:search,$options:"i"}})
                                     .where("genre")
                                     .in([...categories])
                                     .sort(sortby)
                                     .skip(page*limit)
                                     .limit(limit);
        
        const total = await Product.counDocuments({
            genre:{$in:[...categories]},
            name:{$regex:search,$options:"i"}
        });
        const response={
            error:false,
            total,
            page:page+1,
            limit,
            categories:categories,
            products
        }
        res.status(200).json(response);
    }
    catch (e){
        console.log(err);
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
})


module.exports = router;