var mysql = require('mysql');


const express = require('express');
const app = express();
var port = 1212;
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log('Example app listening on port port!', port);
});

//Run app, then load http://localhost:port in a browser to see the output.
const con = mysql.createConnection({

    host: "localhost",
    port: "3306",
    user: 'root',
    password: "",
    database: "ums"


});
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});
app.get('/users', function(req, res) {
    con.query('SELECT * FROM user', function(error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'users list.' });
    });
});
app.get('/user/:id', function(req, res) {
    let user_id = req.param('id');
    if (!user_id) {
        return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }

    con.query('SELECT * FROM user where id=?', user_id, function(error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'users list.' });
    });
    /**/
    console.log('Request URL:', req.originalUrl, ' id :   ', user_id);
});
app.delete('/delete/:id', function(req, res) {
    let user_id = req.param('id');
    if (!user_id) {
        return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }

    con.query('delete   FROM user where id=?', user_id, function(error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'users list.' });
    });
    /**/
    console.log('Request URL:', req.originalUrl, ' id :   ', user_id);
});
app.put('/delete/:user', function(req, res) {
    let id = req.body('id');
    let name = req.body('name');
    let dep = req.body('departement');
    if (!user_id) {
        return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }

    con.query('UPDATE user SET name = ?,departement=? WHERE id = ?', [name, dep, id], function(error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'users list.' });
    });
    /**/
    console.log('Request URL:', req.originalUrl, ' id :   ', user_id);
});