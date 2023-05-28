import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    // 只接受三種圖片格式
    if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|PNG)$/)) {
        cb(new Error('Please upload an image'))
    }
    cb(null, true) //當篩選完成時被呼叫 Callback 函式
}

const upload = multer({
    storage: storage,
    limits: {
        // 限制上傳檔案的大小為 1MB
        fileSize: 1000000
    },
    fileFilter: fileFilter
})

export { upload };