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


app.listen(4000, (req, res) => console.log('Escuchando por el 4000'));