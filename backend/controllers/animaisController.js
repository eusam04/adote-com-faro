const fs = require('fs');
const path = require('path');

const connection = require('../database');

const listarAnimais = (req, res) => {

    const sql = 'SELECT * FROM animais';

    connection.query(sql, (err, results) => {

        if (err) {
            console.log(err);
            res.status(500).send('Erro ao buscar animais');
        } else {
            res.json(results);
        }

    });

};


const listarMeusAnimais = (req, res) => {

    const id_ong = req.usuario.id;

    const sql = `
        SELECT *
        FROM animais
        WHERE id_ong = ?
    `;

    connection.query(
        sql,
        [id_ong],
        (err, results) => {

            if (err) {
                console.log(err);

                return res.status(500).send(
                    'Erro ao buscar animais'
                );
            }

            res.json(results);

        }
    );

};

const cadastrarAnimal = (req, res) => {

    const {
        nome,
        idade,
        porte,
        descricao
    } = req.body;

    const foto = req.file
    ? req.file.filename
    : null;

    const id_ong = req.usuario.id;

    const sql = `
        INSERT INTO animais
        (nome, idade, porte, descricao, foto, id_ong)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    connection.query(
        sql,
        [nome, idade, porte, descricao,foto, id_ong],
        (err, results) => {

            if (err) {
                console.log(err);
                res.status(500).send('Erro ao cadastrar animal');
            } else {
                res.status(201).send('Animal cadastrado com sucesso!');
            }

        }
    );

};

const atualizarAnimal = (req, res) => {

    const { id } = req.params;

    const {
        nome,
        idade,
        porte,
        descricao
    } = req.body;

    const foto = req.file
    ? req.file.filename
    : null;

    const verificarSql = `
        SELECT * FROM animais
        WHERE id = ? AND id_ong = ?
    `;

    connection.query(
        verificarSql,
        [id, req.usuario.id],
        (err, results) => {

            if (err) {
                console.log(err);
                return res.status(500).send('Erro no servidor');
            }

            if (results.length === 0) {
                return res.status(403).send(
                    'Você não tem permissão'
                );
            }

            const sql = `
                UPDATE animais
                SET
                    nome = ?,
                    idade = ?,
                    porte = ?,
                    descricao = ?,
                    foto = ?
                WHERE id = ?
            `;

            connection.query(
                sql,
                [nome, idade, porte, descricao, foto, id],
                (err, results) => {

                    if (err) {
                        console.log(err);
                        res.status(500).send('Erro ao atualizar animal');
                    } else {
                        res.send('Animal atualizado com sucesso!');
                    }

                }
            );

        }
    );

};

const deletarAnimal = (req, res) => {

    const { id } = req.params;

    const id_ong = req.usuario.id;

    const verificarSql = `
        SELECT *
        FROM animais
        WHERE id = ?
        AND id_ong = ?
    `;

    connection.query(
        verificarSql,
        [id, id_ong],
        (err, results) => {

            if (err) {
                console.log(err);

                return res.status(500).send(
                    'Erro ao verificar animal'
                );
            }

            if (results.length === 0) {

                return res.status(403).send(
                    'Você não tem permissão'
                );

            }

            const animal = results[0];

            if (animal.foto) {

                const caminhoFoto = path.join(
                    __dirname,
                    '..',
                    'uploads',
                    animal.foto
                );

                fs.unlink(caminhoFoto, (err) => {

                    if (err) {
                        console.log(
                            'Erro ao deletar imagem:',
                            err
                        );
                    }

                });

            }

            const deletarSolicitacoesSql = `
                DELETE FROM solicitacoes
                WHERE id_animal = ?
            `;

            connection.query(
                deletarSolicitacoesSql,
                [id],
                (err) => {

                    if (err) {
                        console.log(err);

                        return res.status(500).send(
                            'Erro ao deletar solicitações'
                        );
                    }

                    const sql = `
                        DELETE FROM animais
                        WHERE id = ?
                    `;

                    connection.query(
                        sql,
                        [id],
                        (err) => {

                            if (err) {
                                console.log(err);

                                return res.status(500).send(
                                    'Erro ao deletar animal'
                                );
                            }

                            res.send(
                                'Animal deletado com sucesso!'
                            );

                        }
                    );

                }
            );

        }
    );

};

module.exports = {
    listarAnimais,
    cadastrarAnimal,
    atualizarAnimal,
    deletarAnimal,
    listarMeusAnimais
};



