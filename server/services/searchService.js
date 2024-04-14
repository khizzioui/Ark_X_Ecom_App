require('dotenv').config();
const Product = require('../Models/product');
const ipipi = require('ipapi.co');


const callback = function(loc){
    console.log(loc)
    return loc;
}


const searchService = {
    search : async (data) => {
        console.log(data.ip)
        if (!data.location.lat || !data.location.lang){
            const location = ipipi.location(callback,data.ip)
            console.log(JSON.stringify(location));
        }
        const products = await Product.find({
            title: {
                $regex: data.search,
                $options: "i"
            }
        }).exec();
        
        
        const ProductIds = products.map(product => product._id);
        
        
        const geospatialResults = await Product.aggregate([
            {
                $geoNear: {
                    near: {
                        type: "Point",
                        coordinates: [
                            31.633891, -8.032572
                        ]
                    },
                    distanceField: "dist.calculated",
                    maxDistance: Number(data.radius) * 1000, // Include maxDistance here
                    spherical: true
                }
            },
            {
                $facet: {
                    totalCount: [
                        {
                            $match: {
                                _id: { $in: ProductIds } 
                            }
                        },
                        {
                            $count: "total"
                        }
                    ],
                    paginatedResults: [
                        {
                            $match: {
                                _id: { $in: ProductIds } 
                            }
                        },
                        {
                            $skip: data.page * data.limit
                        },
                        {
                            $limit: data.limit
                        }
                    ]
                }
            }
        ]).exec();
        

        const total = geospatialResults[0] || 0;
        const response={
            error:false,
            total:total,
            page:data.page+1,
            limit : data.limit,
            products:geospatialResults
        }
        
        return response;
    }
}

module.exports = searchService
