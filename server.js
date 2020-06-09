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



app.listen(4000, (req, res) => console.log('Escuchando por el 4000'));