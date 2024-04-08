const Product = require('../Models/product');

const productController = {
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.find();
            res.json(products);
        } catch (error) {
            console.error("Error fetching all posts:", error);
            res.status(500).json({ message: err.message });
        }
    },

    getProductById: async (req, res) => {
        const productId = req.params.id;
        try {
            const product = await Product.findById(productId);
            if (!product) {
                res.status(404).send('Produt not found');
                return;
            }
            res.json(product);
        } catch (error) {
            console.error("Error fetching product by ID:", error);
            res.status(500).send("Internal Server Error");
        }
    },

    addProduct: async (req,res) => {
        try {
            const { images, title, description, tags, price, quantity } = req.body;
    
            const product = new Product({
                images,
                title,
                description,
                tags,
                price,
                quantity
            });
    
            await product.save();
            res.status(201).json(product); 
        } catch (error) {
            console.error("Error adding product:", error);
            res.status(500).send("Internal Server Error");
        }
    },

    updateProduct: async (req, res) => {

        const productId = req.params.id;
        try {
            const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });
            if (!updatedProduct) {
                res.status(404).send('Product not found');
                return;
            }
            res.json(updatedProduct);
        } catch (error) {
            console.error("Error updating product:", error);
            res.status(500).send("Internal Server Error");
        }
    },
    

    deleteProduct: async (req, res) => {

        const productId = req.params.id;
        try {
            const deletedProduct = await Product.findByIdAndDelete(productId);
            if (!deletedProduct) {
                res.status(404).send('Product not found');
                return;
            }
            res.send('Product deleted successfully');
        } catch (error) {
            console.error("Error deleting product:", error);
            res.status(500).send("Internal Server Error");
        }
    }

}

module.exports = productController;