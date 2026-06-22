const fs = require('fs');
const path = require('path');

const connection = require('../database');

const listarAnimais = (req, res) => {

    const sql = 'SELECT * FROM animais WHERE ativo = TRUE';

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
        AND ativo = TRUE
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
        [nome, idade, porte, descricao, foto, id_ong],
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

            const fotoAtual = results[0].foto;

            const foto = req.file
                ? req.file.filename
                : fotoAtual;

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
                (err) => {

                    if (err) {
                        console.log(err);
                        return res.status(500).send('Erro ao atualizar animal');
                    }

                    res.send('Animal atualizado com sucesso!');

                }
            );

        }
    );

};

const arquivarAnimal = (req, res) => {

    const { id } = req.params;

    const sql = `
        UPDATE animais
        SET ativo = FALSE
        WHERE id = ?
    `;

    connection.query(
        sql,
        [id],
        (err) => {

            if (err) {
                console.log(err);

                return res.status(500).send(
                    'Erro ao arquivar animal'
                );
            }

            res.send(
                'Animal arquivado com sucesso!'
            );

        }
    );

};

module.exports = {
    listarAnimais,
    cadastrarAnimal,
    atualizarAnimal,
    arquivarAnimal,
    listarMeusAnimais
};



