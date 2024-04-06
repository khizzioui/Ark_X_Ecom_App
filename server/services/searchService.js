const Product = require('../Models/product');





const searchService = {
    search : async (data) => {
        const products = await Product.find({name:{$regex:search,$options:"i"}})
                                        .skip(data.page*data.limit)
                                        .limit(data.limit).aggregate([
                                        {
                                            $geonear:{
                                                $near:{
                                                    type:"point",
                                                    coordinates:[

                                                    ]
                                                },
                                                distanceField:"distance",
                                                maxDistance: data.rayon * 1000,
                                                spherical:true
                                            }

                                        }
                                        ]);

                    const total = await Product.counDocuments({
                            genre:{$in:[...categories]},
                            name:{$regex:data.search,$options:"i"}
                    });
                    const response={
                        error:false,
                        total,
                        page:data.page+1,
                        limit : data.limit,
                        products
                    }
                    return response;
    }
}
