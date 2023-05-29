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
        if ( folder === 'Avatars') {
            console.log('wtf')
            cloudinary.image(file, {transformation: [
                {aspect_ratio: "1.0", gravity: "face", width: "0.6", zoom: "0.7", crop: "thumb"},
                {radius: "max"},
                {color: "brown", effect: "outline"},
                {color: "lightgray", effect: "shadow", x: 25, y: 35}
                ]})
        }
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