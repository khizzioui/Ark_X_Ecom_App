const locationService  = require('../services/locationService');



const locationController = {
    getAllLocation: async (req, res) => {
        const token = req.cookies.accessToken
        const loc = await locationService.getAllLocation(token.accessToken);
        
        res.send(loc);  
    },


    addLocation: async (req,res) => {
        const locationData = {
            name : req.body.name,
            location:req.body.location,
            userid : req.body.userid
        }

       const result = await locationService.addLocation(locationData);
       if(result.error && result.error == 1){
        res.status(404).json({error:"Error saving the location"})
        } else if(result.error && result.error == 2){
        res.status(500).json({error:"server error"})
        } else {
        res.status(201).json({success:result.success,location:result.location});
        }
    },

    updateLocation: async (req, res) => {
        
        
        const locationData = {
            id:req.body.id,
            name : req.body.name,
            location:req.body.location,
            userid : req.body.userid
        }
        console.log(locationData)
        const result=await locationService.updateLocation(locationData)
        if(result.error && result.error == 1)
            res.status(404).json({error:"location not found"})
        else if(result.error && result.error == 2)
            res.status(500).json({error:"server error"})
        else{
            res.status(200).json({success:result.success,location:result.location});
        }
        
    },
    

    deleteLocation: async (req, res) => {
        
        const locationId = req.params.id;
        

        const result=await locationService.deleteLocation(locationId)
        if(result.error && result.error == 1) 
            res.status(404).json({error:"location not found"})
        else if(result.error && result.error == 2)
            res.status(500).json({error:"server error"})
        else{
            res.status(200).json({success:result.success,location:result.location});
        }

    }

}

module.exports = locationController;