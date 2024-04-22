const express = require('express');
const router = express.Router();
const uploadImage = require('../middlewares/multer-config');
const auth = require('../middlewares/auth');
const checkWork = require('../middlewares/checkWork');
const workCtrl = require('../controllers/works.controller');

router.post('/', auth, uploadImage.single('image'), checkWork, workCtrl.create);
router.get('/', workCtrl.findAll);
router.delete('/:id', auth, workCtrl.delete);

module.exports = router;
