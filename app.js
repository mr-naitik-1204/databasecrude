const express = require('express');
const app = express();
const mysql = require('mysql');
app.set('view engine', 'ejs');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "naitikbhai"
});

con.connect((err) => {
    if (err) throw err;
    console.log("Connection successful");
});

var id=null;


app.get('/', (req, res) => {
    const qry = `SELECT * FROM register2`;
    con.query(qry, (error, result) => {
        if (error) throw error;
        res.render('form', { result: result, editdata: null });
    });
});

app.get('/createdata', (req, res) => {
    const data = req.query;

    const hobbies = Array.isArray(data.hobby) ? data.hobby.join(',') : data.hobby;

    if (id) {
        const qry = `UPDATE register2 SET f_name = '${data.f_name}', l_name ='${data.l_name}', gender ='${data.gender}', hobby ='${data.hobbies}', city = '${data.city}' WHERE id = '${data.id}'`;
        con.query(qry,  (err) => {
            if (err) throw err;
            console.log("Data updated successfully");
            res.redirect('/');
        });
        id=null;
    } else {
        const qry = `INSERT INTO register2 (f_name, l_name, gender, hobby, city) VALUES ('${data.f_name}', '${data.l_name}', '${data.gender}', '${hobbies}', '${data.city}')`;
        con.query(qry,  (err) => {
            if (err) throw err;
            console.log("Data inserted successfully");
            res.redirect('/');
        });
    }
});

app.get('/deletedata', (req, res) => {
    const qry = `DELETE FROM register2 WHERE id = ${req.query.delet}`;
    con.query(qry, (err) => {
        if (err) throw err;
        console.log("Data deleted successfully");
        res.redirect('/');
    });
});

app.get('/editdata/:id', (req, res) => {
    const eid = req.params.id;
    id=req.params.id;
    const qry = `SELECT * FROM register2 WHERE id = ${eid}`;
    con.query(qry,  (error, result) => {
        if (error) throw error;
        const allDataQry = `SELECT * FROM register2`;
        con.query(allDataQry, (error, all) => {
            if (error) throw error;
            res.render('form', { editdata: result[0], result: all });
        });
    });
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
