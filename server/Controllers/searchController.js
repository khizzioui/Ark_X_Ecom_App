const { search } = require("../service/searchService");


async function search(req,res){
    try{
        const lat = parseFloat(req.query.lat);
        const lang = parseFloat(req.query.lang);

        const page = parselnt(req.query.page) - 1 || 0;
        const limit = parselnt(req.query.limit) || 10;
        const search = req.query.q || "";
        let sort = req.query.sort || "favorite";
        let categorie = req.query.categorie || "ALL";
        let categories = [];
        categorie === "ALL"? (categories=[...allgenre]):req.query.categorie.split(",");
        req.query.sort?(sort= req.query.sort.split(",")):(sort=[sort]);
        let sortby={};
        if(sort[1]){
            sortby[sort[0]]=sort[1];
        }
        else{
            sortby[sort[0]]="asc";
        }
        const products = await Product.find({name:{$regex:search,$options:"i"}})
                                     .where("categorie")
                                     .in([...categories])
                                     .sort(sortby)
                                     .skip(page*limit)
                                     .limit(limit).aggregate([
                                        {
                                            $geonear:{
                                                $near:{
                                                    type:"point",
                                                    coordinates:[

                                                    ]
                                                },
                                                distanceField:"distance",
                                                maxDistance: parseInt(req.query.rayon) || 1000 * 1000,
                                                spherical:true
                                            }

                                        }
                                     ]);

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
}


module.exports = {
    search
}