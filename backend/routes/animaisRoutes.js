const upload = require('../multerConfig');
const express = require('express');
const verificarToken = require('../middlewares/authMiddleware');

const router = express.Router();

const {
    listarAnimais,
    listarMeusAnimais,
    cadastrarAnimal,
    atualizarAnimal,
    deletarAnimal
} = require('../controllers/animaisController');

router.get('/animais', listarAnimais);

router.get('/meus-animais',verificarToken,listarMeusAnimais);

router.post('/animais', verificarToken, upload.single('foto'), cadastrarAnimal);

router.put('/animais/:id', verificarToken, upload.single('foto'), atualizarAnimal);

router.delete('/animais/:id', verificarToken, deletarAnimal);

module.exports = router;