const express = require('express');

const router = express.Router();

const {
    cadastrarUsuario,
    loginUsuario
} = require('../controllers/usuariosController');

router.post('/usuarios', cadastrarUsuario);
router.post('/login', loginUsuario);

module.exports = router;