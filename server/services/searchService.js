require("dotenv").config();
const Product = require("../Models/product");
const axios = require("axios");



const searchService = {
  search: async (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        let location;
        if (!data.location.lat || !data.location.lang) {
          console.log("location not found");
          const response = await axios.get(`https://ipapi.co/${data.ip}/json/`);
          location = response.data;
        } else {
          location = data.location;
        }
        //console.log(location);
        const products = await Product.aggregate([
          {
            $geoNear: {
              near: { type: "Point", coordinates: [Number(location.latitude),Number(location.longitude)] },
              distanceField: "dist.calculated",
              maxDistance: Number(data.radius) * 1000,
              spherical: true,
            },
          },
          {
            $match: {
              title: { $regex: data.search, $options: "i" },
              price: {
                $gte: parseInt(data.minprice) || 0,
                $lte: parseInt(data.maxprice) || Infinity,
              }
            },
            
          },
        ])
          .skip(data.page * data.limit)
          .limit(data.limit);
          
        const total = products.length;
        const response = {
          error: false,
          total,
          page: data.page + 1,
          limit: data.limit,
          products,
          radius: data.radius,
        };

        resolve(response);
      } catch (error) {
        reject({ error: true, message: error.message });
      }
    });
  },
};

module.exports = searchService;
