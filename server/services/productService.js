const Product = require('../Models/product');
const Location = require('../Models/location');
const User = require('../Models/user');
const jwt = require("jsonwebtoken");
const cloudinary = require("../config/cloudinary");


const productService = {
    getAllProducts: async () => {
        try {
            const products = await Product.find();
            return (products);

        } catch (error) {
            console.error("Error :", error);
            return ("Error :", error);
        }
    },

    getProductById: async (productId) => {
        try {
            const product = await Product.findById(productId);
            if (!product) {
                return ('Produt not found');
            }
            
            const Nuser = await User.findById(product.toJSON().user);
            // console.log(Nuser);
            
            return {product,Nuser};
           
        } catch (error) {
            console.error("Error fetching product by ID:", error);
            return ("Error :", error)

        }
    },

    getUserProducts: async (userId) => {
        try {
            const user=await User.findById(userId)
            if(!user){
                return ('User not found');
            }
            const products = await Product.where('user').equals(userId);
            console.log(userId);
            return { products: products };
        } catch (error) {
            console.error("Error :", error);
            return ("Error :", error)
        }
    },

    addProduct: async (productData,images) => {
        try {
            const location = await Location.findById(productData.locationId)
            const product = new Product({
                title: productData.title,
                description: productData.description,
                user: productData.userId,
                locationName:location.name,
                location: { // Embedding location object with coordinates
                    type: "Point",
                    coordinates: location.location.coordinates
                },
                tags: productData.tags.split(','),
                price: productData.price,
                quantity: productData.quantity
            });

            if (images) {
                
                await Promise.all(images.map(async (image) => {
                    try {
                        const result = await cloudinary.uploader.upload(image.path);
                        console.log(result.url);
                        product.images.push(result.url);
                        return result.url;
                    } catch (error) {
                        console.error(error);
                        throw error;
                    }
                }));
                
                
            }else{
                product.images.push(process.env.DEFAULT_PRODUCT_IMAGE)
            }

            const savedProd =  await product.save();
            if(!savedProd){
                return {error:1};
            }
            return { success: "Product saved successfully", product: savedProd };
            

        } catch (error) {
            console.error("Error adding product:", error);
            return { error: 2 }

        }
    },

    updateProduct: async (productData, token) => {

        try {
            const product = await Product.findById(productData.id)
            const user = jwt.verify(token.accessToken, process.env.ACCESS_TOKEN_SECRET)

            if (product.userId != user.id) {
                return { error: 3 }
            }

            const updatedProduct = await Product.findByIdAndUpdate(productData.id, productData, { new: true });

            if (!updatedProduct) {
                return ({ error: 1 })
            }
            return { success: "product updated", product: updatedProduct };
        } catch (error) {
            console.error("Error updating product:", error);
            return { error: 2 }
        }
    },


    deleteProduct: async (productId, token) => {

        try {
            console.log(token)
            const product = await Product.findById(productId);
            if (!Product) {
                return ({ error: 1 });
            }
            const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            console.log(product.user.toString())
            if (product.user.toString() != user.id) {
                return { error: 3 }
            }

            const deletedProduct = await Product.findByIdAndDelete(productId);

            return { success: "Product deleted successfully", product: deletedProduct };
        } catch (error) {
            console.error("Error deleting product:", error);
            return { error: 2 }
        }
    }


}

module.exports = productService