const express = require('express');

// Sequielize
const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:@localhost:3306/clase49');

const app = express();

app.use(express.json());


// app.get('/bandas', (req, res) => {
//     const query = 'SELECT * FROM bandas';
    
//     sequelize.query(query, {type: sequelize.QueryTypes.SELECT} )
//         .then((response) => {
//             res.json(response);
//         }).catch((e) => console.log(e));
// });

app.get('/bandas', async (req, res) => {

    const query = 'SELECT * FROM bandas';
    try {
        const bandas = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT} );
        res.json(bandas);

    } catch (e) {
        console.error(e);
    }
});

app.post('/bandas', (req, res) => {

    const query = 'INSERT INTO bandas (nombre, integrantes, fecha_inicio, fecha_separacion, pais) VALUES (?, ?, ?, ?, ?)';

    const {nombre, integrantes, fecha_inicio, fecha_separacion, pais} = req.body;

    sequelize.query(query, {replacements: [nombre, integrantes, fecha_inicio, fecha_separacion, pais] })
        .then((response) => {

            res.json({status: 'Insertado', banda: req.body});

        }).catch((e) => console.error(e));

});

// middleware exist
const bandaExist = (req, res, next) => {

    const nombre = req.query.nombre;
    const exist = 'SELECT * FROM bandas WHERE nombre = ?';

    sequelize.query(exist, {replacements: [nombre], type: sequelize.QueryTypes.SELECT})
        .then(data => {
            if (!data.length) {
                return res.status(404).json({error: 'No se encontro dicha banda'})
            }
            return next();
        }).catch(e => {
            return res.status(404).json({error: 'Algo salio mal..'})
        })
}

app.delete('/bandas', bandaExist, (req, res) => {

    const nombre = req.query.nombre;
    const myQuery = `DELETE FROM bandas WHERE nombre = ?`;

    sequelize.query(myQuery, {replacements: [nombre]})
        .then((data) => {
            res.json({status: 'deleted'});
        }).catch( e => console.error('Algo salio mal', e));

});


app.listen(4000, (req, res) => console.log('Escuchando por el 4000'));