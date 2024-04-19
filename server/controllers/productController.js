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
            userId:req.body.userId,
            locationId : req.body.locationId,
            tags : req.body.tags || '',
            price : req.body.price,
            quantity : req.body.quantity || 1
        }

        const result = await productService.addProduct(productData);
        if(result.error && result.error == 1){
        res.status(404).json({error:"Error saving the Product"})
        } else if(result.error && result.error == 2){
        res.status(500).json({error:"server error"})
        } else {
        res.status(201).json({success:result.success,product:result.product});
        }
    },

    updateProduct: async (req, res) => {
        const token = req.cookies.accessToken
        
        const productData = {
            id : req.body.id,
            images : req.body.images,
            title : req.body.title,
            description : req.body.description || '',
            tags : req.body.tags || '',
            price : req.body.price,
            quantity : req.body.quantity || 1
        }
        const result=await productService.updateProduct(productData,token)
        if(result.error && result.error == 1)
            res.status(404).json({error:"product not found"})
        else if(result.error && result.error == 2)
            res.status(500).json({error:"server error"})
        else if(result.error && result.error == 3){
            res.status(401).json({error:"you don't have the permision to update this product"}) 
        }else{
            res.status(200).json({success:result.success,product:result.product});
        }
            
        
    },
    

    deleteProduct: async (req, res) => {
        const token = req.cookies.accessToken
        const productId = req.params.id;
        

        const result=await productService.deleteProduct(productId,token)
        if(result.error && result.error == 1) 
            res.status(404).json({error:"product not found"})
        else if(result.error && result.error == 2)
            res.status(500).json({error:"server error"})
        else if(result.error && result.error == 3){
            res.status(401).json({error:"you don't have the permision to delete this product"}) 
        }else{
            res.status(200).json({success:result.success,product:result.product});
        }
           

    }

}

module.exports = productController;