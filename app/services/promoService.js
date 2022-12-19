const promoRepository = require('../repositories/promoRepository');
const cloudinary = require("cloudinary").v2

cloudinary.config({ 
    cloud_name: 'doqt4lhc6', 
    api_key: '748742174275851', 
    api_secret: 'PBysSDfH-HQqoCnehYNh_fQa-7s' 
  });


module.exports = {
  async create(body, image) {
    if (image == undefined) {
      return promoRepository.create(body);
    }
    else{
        const fileBase64 = image.buffer.toString("base64");
        const file = `data:${image.mimetype};base64,${fileBase64}`;
        try {
            const result = await cloudinary.uploader.upload(file, {
                folder: "image"
            })
            body.photo = result.url
            return promoRepository.create(body);
        } catch (err) {
            return res.status(400).json({
                status: "FAIL",
                message: "Upload image failed"
            })
        }
    }
  },

  getAll() {
    return promoRepository.getAll();
  },

  async update(body, id, image) {
    if (image == undefined) {
      return promoRepository.update(body, id);
    }
    else{
        const fileBase64 = image.buffer.toString("base64");
        const file = `data:${image.mimetype};base64,${fileBase64}`;
        try {
            const result = await cloudinary.uploader.upload(file, {
                folder: "image"
            })
            body.photo = result.url
            return promoRepository.update(body, id);
        } catch (err) {
            return res.status(400).json({
                status: "FAIL",
                message: "Upload image failed"
            })
        }
    }
  },
  getById(id) {
    return promoRepository.findById(id);
  },
  delete(id) {
    return promoRepository.delete(id);
  },
};
