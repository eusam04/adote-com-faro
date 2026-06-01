const connection = require('../database');

const criarSolicitacao = (req, res) => {

    const { id_animal, telefone, mensagem } = req.body;

    const id_usuario = req.usuario.id;

    if (
        req.usuario.tipo === 'ong' ||
        req.usuario.tipo === 'cuidador'
    ) {
    
        return res.status(403).send(
            'Apenas usuários comuns podem solicitar adoção'
        );
    
    }

    const verificarAnimalSql = `
        SELECT status
        FROM animais
        WHERE id = ?
    `;

    connection.query(
        verificarAnimalSql,
        [id_animal],
        (err, results) => {

            if (err) {
                console.log(err);

                return res.status(500).send(
                    'Erro ao verificar animal'
                );
            }

            if (results.length === 0) {
                return res.status(404).send(
                    'Animal não encontrado'
                );
            }

            if (results[0].status === 'adotado') {
                return res.status(400).send(
                    'Animal já foi adotado'
                );
            }

            const verificarSolicitacaoSql = `
                SELECT *
                FROM solicitacoes
                WHERE id_usuario = ?
                AND id_animal = ?
            `;

            connection.query(
                verificarSolicitacaoSql,
                [id_usuario, id_animal],
                (err, results) => {

                    if (err) {
                        console.log(err);

                        return res.status(500).send(
                            'Erro ao verificar solicitação'
                        );
                    }

                    if (results.length > 0) {
                        return res.status(400).send(
                            'Você já solicitou este animal'
                        );
                    }

                    const sql = `
                    INSERT INTO solicitacoes
                    (id_usuario, id_animal, telefone, mensagem)
                    VALUES (?, ?, ?, ?)
                `;

                    connection.query(
                        sql,
                        [id_usuario, id_animal, telefone, mensagem],
                        (err, results) => {

                            if (err) {
                                console.log(err);

                                return res.status(500).send(
                                    'Erro ao criar solicitação'
                                );
                            }

                            res.status(201).send(
                                'Solicitação enviada com sucesso!'
                            );

                        }
                    );

                }
            );

        }
    );

};


const listarSolicitacoes = (req, res) => {

    const sql = `
        SELECT
            solicitacoes.id,
            usuarios.nome AS usuario,
            animais.nome AS animal,
            solicitacoes.status,
            solicitacoes.data_solicitacao

        FROM solicitacoes

        JOIN usuarios
        ON solicitacoes.id_usuario = usuarios.id

        JOIN animais
        ON solicitacoes.id_animal = animais.id
    `;

    connection.query(sql, (err, results) => {

        if (err) {
            console.log(err);

            return res.status(500).send(
                'Erro ao buscar solicitações'
            );
        }

        res.json(results);

    });

};

const listarMinhasSolicitacoes = (req, res) => {

    const id_ong = req.usuario.id;

    const sql = `
        SELECT
            solicitacoes.id,
            usuarios.nome AS usuario,
            animais.nome AS animal,
            solicitacoes.status,
            solicitacoes.data_solicitacao

        FROM solicitacoes

        JOIN usuarios
        ON solicitacoes.id_usuario = usuarios.id

        JOIN animais
        ON solicitacoes.id_animal = animais.id

        WHERE animais.id_ong = ?
    `;

    connection.query(
        sql,
        [id_ong],
        (err, results) => {

            if (err) {
                console.log(err);

                return res.status(500).send(
                    'Erro ao buscar solicitações'
                );
            }

            res.json(results);

        }
    );

};

const atualizarStatusSolicitacao = (req, res) => {

    const { id } = req.params;

    const { status } = req.body;

    const sql = `
        UPDATE solicitacoes
        SET status = ?
        WHERE id = ?
    `;

    connection.query(
        sql,
        [status, id],
        (err, results) => {

            if (err) {
                console.log(err);

                return res.status(500).send(
                    'Erro ao atualizar status'
                );
            }

            if (status === 'aprovado') {

                const buscarAnimalSql = `
                    SELECT id_animal
                    FROM solicitacoes
                    WHERE id = ?
                `;

                connection.query(
                    buscarAnimalSql,
                    [id],
                    (err, results) => {

                        if (err) {
                            console.log(err);

                            return res.status(500).send(
                                'Erro ao buscar animal'
                            );
                        }

                        const id_animal =
                            results[0].id_animal;

                        const atualizarAnimalSql = `
                            UPDATE animais
                            SET status = 'adotado'
                            WHERE id = ?
                        `;

                        connection.query(
                            atualizarAnimalSql,
                            [id_animal],
                            (err) => {

                                if (err) {
                                    console.log(err);

                                    return res.status(500).send(
                                        'Erro ao atualizar animal'
                                    );
                                }

                                res.send(
                                    'Solicitação aprovada e animal adotado!'
                                );

                            }
                        );

                    }
                );

            } else {

                res.send(
                    'Status atualizado com sucesso!'
                );

            }

        }
    );

};

module.exports = {
    criarSolicitacao,
    listarSolicitacoes,
    listarMinhasSolicitacoes,
    atualizarStatusSolicitacao
};