const router = require('express').Router()
const upload = require('../config/multer')
const indexController = require('../controllers/index')


router.post('/images', upload.single('image'), indexController.uploadImage);
router.get('/images', indexController.getImages)

module.exports = router;