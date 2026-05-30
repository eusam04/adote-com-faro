const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {

    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.status(401).send('Token não fornecido');
    }

    const token = authHeader.split(' ')[1];

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.usuario = decoded;

        next();

    } catch (error) {

        return res.status(401).send('Token inválido');

    }

};

module.exports = verificarToken;