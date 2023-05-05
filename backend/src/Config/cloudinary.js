import cloudinary from 'cloudinary';
import dotenv from "dotenv-defaults";
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploads = (file, folder) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result) => {
            resolve({
                url: result.url,
                id: result.public_id,
            })
        }, {
            resource_type: "auto",
            folder: folder
        })
    })
}

const destroys = async (publicID) => {
    const result = await cloudinary.uploader.destroy(publicID)
    return result
}

export {
    uploads,
    destroys
}