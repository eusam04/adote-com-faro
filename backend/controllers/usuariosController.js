const connection = require('../database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const cadastrarUsuario = async (req, res) => {

    const {
        nome,
        email,
        senha,
        tipo
    } = req.body;

    try {

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const sql = `
            INSERT INTO usuarios
            (nome, email, senha, tipo)
            VALUES (?, ?, ?, ?)
        `;

        connection.query(
            sql,
            [nome, email, senhaCriptografada, tipo],
            (err, results) => {

                if (err) {
                    console.log(err);
                    res.status(500).send('Erro ao cadastrar usuário');
                } else {
                    res.status(201).send('Usuário cadastrado com sucesso!');
                }

            }
        );

    } catch (error) {

        console.log(error);
        res.status(500).send('Erro interno do servidor');

    }

};

const loginUsuario = (req, res) => {

    const { email, senha } = req.body;

    const sql = 'SELECT * FROM usuarios WHERE email = ?';

    connection.query(sql, [email], async (err, results) => {

        if (err) {
            console.log(err);
            return res.status(500).send('Erro no servidor');
        }

        if (results.length === 0) {
            return res.status(401).send('Usuário não encontrado');
        }

        const usuario = results[0];

        const senhaCorreta = await bcrypt.compare(
            senha,
            usuario.senha
        );

        if (!senhaCorreta) {
            return res.status(401).send('Senha incorreta');
        }

        const token = jwt.sign(
            {
                id: usuario.id,
                email: usuario.email,
                tipo: usuario.tipo
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            }
        );
        
        res.json({
            mensagem: 'Login realizado com sucesso!',
            token: token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                tipo: usuario.tipo
            }
        });

    });
    
}


module.exports = {
    cadastrarUsuario,
    loginUsuario
};
