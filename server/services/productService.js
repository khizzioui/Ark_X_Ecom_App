const Product = require('../Models/product');
const jwt = require("jsonwebtoken");
const { login } = require('../controllers/userController');

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
            return (product);
        } catch (error) {
            console.error("Error fetching product by ID:", error);
            return ("Error :", error)

        }
    },

    addProduct: async (productData) => {
        try {

            const product = new Product({
                images: productData.images,
                title: productData.title,
                description: productData.description,
                userId: productData.userId,
                tags: productData.tags,
                price: productData.price,
                quantity: productData.quantity
            });

            const savedProd = await product.save();
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
            const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

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
            const product = await Product.findById(productId);
            if (!Product) {
                return ({ error: 1 });
            }
            const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

            if (product.userId != user.id) {
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

module.exports = productService;