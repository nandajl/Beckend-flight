const userRepository  = require("../repositories/userRepository")
const cloudinary = require("cloudinary").v2

cloudinary.config({ 
    cloud_name: 'doqt4lhc6', 
    api_key: '748742174275851', 
    api_secret: 'PBysSDfH-HQqoCnehYNh_fQa-7s' 
  });

module.exports = {
    create(requestBody) {
        return userRepository.create(requestBody);
    },
    
    async update(id, body, image) {
        if (image == undefined) {
            return userRepository.update(id, body);
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
                return userRepository.update(id, body);
            } catch (err) {
                return res.status(400).json({
                    status: "FAIL",
                    message: "Upload image failed"
                })
            }
        }
    },

    delete(id) {
        return userRepository.delete(id);
    },

    async list(role) {
        try {
            const users = await userRepository.findAll({role});
            const userCount = await userRepository.getTotalUser({role});

            return {
                data: users,
                count: userCount,
            };
        } catch (err) {
            throw err;
        }
    },

    get(id) {
        const condition = {id: id}
        return userRepository.findUser(condition);
    }
}