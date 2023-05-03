import multer from 'multer';

const upload = multer({
    fileFilter(_, file, cb) {
        limit: {
            // 限制上傳檔案的大小為 1MB
            fileSize: 1000000
        }
        // 只接受三種圖片格式
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            cb(new Error('Please upload an image'))
        }
        cb(null, true) //當篩選完成時被呼叫 Callback 函式
    }

})

export { upload };