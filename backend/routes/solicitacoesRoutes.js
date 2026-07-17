const express = require('express');

const router = express.Router();

const verificarToken = require('../middlewares/authMiddleware');

const {
    criarSolicitacao,
    listarSolicitacoes,
    listarMinhasSolicitacoes,
    listarSolicitacoesUsuario,
    listarIdsAnimaisSolicitados,
    atualizarStatusSolicitacao
} = require('../controllers/solicitacoesController');

router.post(
    '/solicitacoes',
    verificarToken,
    criarSolicitacao,
);

router.get(
    '/solicitacoes',
    verificarToken,
    listarSolicitacoes
);

router.get(
    '/minhas-solicitacoes',
    verificarToken,
    listarMinhasSolicitacoes
);

router.put(
    '/solicitacoes/:id',
    verificarToken,
    atualizarStatusSolicitacao
);

router.get(
    '/minhas-solicitacoes-usuario',
    verificarToken,
    listarSolicitacoesUsuario
);

router.get(
    '/meus-animais-solicitados',
    verificarToken,
    listarIdsAnimaisSolicitados
);

module.exports = router;