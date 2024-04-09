const Product = require('../Models/product');

const productService = {
    getAllProducts: async () => {
        try {
            const products = await Product.find();
            return ( products);
            
        } catch (error) {
            console.error("Error :", error);
            return("Error :", error);
        }
    },

    getProductById: async (productId) => {
        try {
            const product = await Product.findById(productId);
            if (!product) {
                return('Produt not found');
            }
            return(product);
        } catch (error) {
            console.error("Error fetching product by ID:", error);
            return("Error :", error)
            
        }
    },

    addProduct: async (productData) => {
        try {
    
            const product = new Product({
                images: productData.images,
                title: productData.title,
                description: productData.description,
                tags: productData.tags,
                price: productData.price,
                quantity: productData.quantity
            });
    
            await product.save();
            return(product);
            
        } catch (error) {
            console.error("Error adding product:", error);
            return("error :", error);
            
        }
    },

    updateProduct: async (productData) => {

        try {
            const updatedProduct = await Product.findByIdAndUpdate(productData.id, productData, { new: true });
            if (!updatedProduct) {
                return('Product not found');
            }
            return(updatedProduct);
        } catch (error) {
            console.error("Error updating product:", error);
            return("Error : ",error);
        }
    },
    

    deleteProduct: async (productId) => {

        try {
            const deletedProduct = await Product.findByIdAndDelete(productId);
            if (!deletedProduct) {
                return('Product not found');
            }
            return('Product deleted successfully');
        } catch (error) {
            console.error("Error deleting product:", error);
            return("error :", error);
        }
    }

}

module.exports = productService;