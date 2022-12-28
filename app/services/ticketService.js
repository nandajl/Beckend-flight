const ticketRepository = require("../repositories/ticketRepository")
const cloudinary = require("cloudinary").v2

cloudinary.config({ 
    cloud_name: 'doqt4lhc6', 
    api_key: '748742174275851', 
    api_secret: 'PBysSDfH-HQqoCnehYNh_fQa-7s' 
  });

module.exports = {
    async create(body, image){
        if (image == undefined) {
            return ticketRepository.create(body)
        }
        else{
            const fileBase64 = image.buffer.toString("base64");
            const file = `data:${image.mimetype};base64,${fileBase64}`;
            try {
                console.log("body : ", body)
                const result = await cloudinary.uploader.upload(file, {
                    folder: "image"
                })
                body.photo = result.url
                return ticketRepository.create(body);
            } catch (err) {
                return err.message
            }
        }
    },

    async update(id, body, image){
        if (image == undefined) {
            return ticketRepository.update(id, body)
        }
        else{
            const fileBase64 = image.buffer.toString("base64");
            const file = `data:${image.mimetype};base64,${fileBase64}`;
            try {
                const result = await cloudinary.uploader.upload(file, {
                    folder: "image"
                })
                body.photo = result.url
                return ticketRepository.update(id, body)
            } catch (err) {
                return res.status(400).json({
                    status: "FAIL",
                    message: "Upload image failed"
                })
            }
        }
    },

    delete(id){
        return ticketRepository.delete(id)
    },

    getTicket(id){
        return ticketRepository.getTicket(id)
    },

    async getAllTicket(){
        try {
            const tickets = await ticketRepository.getAllTicket()
            const count = await ticketRepository.getTotalCount()
            return{
                data: tickets,
                count: count
            }
        } catch (err) {
            throw err
        }
    }


    
}