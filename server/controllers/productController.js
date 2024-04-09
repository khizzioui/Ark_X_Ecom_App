const productService  = require('../services/productService');

const productController = {
    getAllProducts: async (req, res) => {
        const prod = await productService.getAllProducts();
        // console.log(prod);
        res.send(prod);
        
    },

    getProductById: async (req, res) => {
        const productId = req.params.id;
        res.json( await productService.getProductById(productId));
    },

    addProduct: async (req,res) => {
        
            const productData = {
                images : req.body.images,
                title : req.body.title,
                description : req.body.description || '',
                tags : req.body.tags || '',
                price : req.body.price,
                quantity : req.body.quantity || 1
            }

           res.json( await productService.addProduct(productData));
    },

    updateProduct: async (req, res) => {

        const productData = {
            id : req.body.id,
            images : req.body.images,
            title : req.body.title,
            description : req.body.description || '',
            tags : req.body.tags || '',
            price : req.body.price,
            quantity : req.body.quantity || 1
        }
        res.json( await productService.updateProduct(productData));
    },
    

    deleteProduct: async (req, res) => {

        const productId = req.params.id;
        res.json(await productService.deleteProduct(productId));

    }

}

module.exports = productController;