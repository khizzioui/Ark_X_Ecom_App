require('dotenv').config();
const Product = require('../Models/product');
const axios = require('axios');


const callback = function(loc){
    
    return loc;
}


const searchService = {
    search : async (data) => {
        
        if (!data.location.lat || !data.location.lang){
            const location = await axios.get("https://ipapi.co/"+data.ip+"/json/");
            console.log(location.data.latitude);
        }
        
        console.log(data.ip)
        const products = await Product.aggregate([
            {
                $geoNear: {
                  near: { type: "Point", coordinates: [
                    31.6319, -7.998
                ]},
                  distanceField: "dist.calculated", // Field to store calculated distance
                  maxDistance: Number(data.radius) * 1000, // Include maxDistance here
                  spherical: true
                }
              },
              {
                $match: {
                   title: { $regex: data.search, $options: "i" }, 
                }
              }
        ])
        .skip(data.page*data.limit)
        .limit(data.limit);
        
        const total=products.length
        const response={
            error:false,
            total:total,
            page:data.page+1,
            limit : data.limit,
            products:products,
            radius:data.radius
        }
        
        return response;
    }
}

module.exports = searchService
