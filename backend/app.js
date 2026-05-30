require('dotenv').config();

const express = require('express');
const cors = require('cors');

require('./database');

const animaisRoutes = require('./routes/animaisRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');
const solicitacoesRoutes = require('./routes/solicitacoesRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use(animaisRoutes);
app.use(usuariosRoutes);
app.use(solicitacoesRoutes);

app.use('/uploads', express.static('uploads'));

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});