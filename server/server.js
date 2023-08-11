const express = require('express');
const app = express();
const port = 3001;
const mysql = require('mysql');

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'employeeSytstem'
});

app.post('/create', (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;

    db.query(
        'INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)', 
        [name, age, country, position, wage], 
        
        (err, result) => {
            if(err){
                console.log(err);
            } else {
                res.send('Values Inserted');
            }
        }
    )
    
})



app.get('/', (req, res) => {
    res.send('Hello World!')
})





app.listen(3001, () => {
    console.log(`***** Server is running on port ${port} *****`)
})
