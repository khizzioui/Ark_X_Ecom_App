const Location = require('../Models/location');
const jwt = require("jsonwebtoken");



const locationService = {
    getAllLocation: async (token) => {
        try {
            
            const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            
            const location = await Location.find({ userId: user.id });
            console.log(location)
            return (location);

        } catch (error) {
            console.error("Error :", error);
            return ("Error :", error);
        }
    },

    addLocation: async (locationData) => {
        try {

            const location = new Location({
                name: locationData.name,
                location: {
                    type: "Point",
                    coordinates: [locationData.location[0], locationData.location[1]] // Replace longitude and latitude with actual coordinates
                  },
                userId:locationData.userid
            });

            const savedLoc = await location.save();
            if(!savedLoc){
                return {error:1};
            }
            return { success: "Location saved successfully", location: savedLoc };
            

        } catch (error) {
            console.error("Error adding location:", error);
            return { error: 2 }

        }
    },

    updateLocation: async (locationData) => {

        try {
            console.log(locationData.id)
            
            const updatedLocation = await Location.findByIdAndUpdate(locationData.id, locationData, { new: true });

            if (!updatedLocation) {
                return ({ error: 1 })
            }
            return { success: "location updated", location: updatedLocation };
        } catch (error) {
            console.error("Error updating location:", error);
            return { error: 2 }
        }
    },


    deleteLocation: async (locationId) => {

        try {
            const location = await Location.findById(locationId);
            if (!location) {
                return ({ error: 1 });
            }
            

            const deletedLocation = await Location.findByIdAndDelete(locationId);

            return { success: "Location deleted successfully", location: deletedLocation };
        } catch (error) {
            console.error("Error deleting location:", error);
            return { error: 2 }
        }
    }


}

module.exports = locationService;