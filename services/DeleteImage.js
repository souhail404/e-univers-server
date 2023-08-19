const cloudinary = require('cloudinary').v2;

const deleteImage = async(publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
        throw error;
    }
};

module.exports = deleteImage;