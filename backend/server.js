const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const e = require('express');
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());



const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err)=>{
    if(err){
        
        console.log(`Error connecting to the database: ${err.message}`);
    }
    else{
        console.log('Connected to the database');
    }
})


app.post('/api/signup', (req, res) => {
    const { fullName, email, password } = req.body;
    const checkQuery = "select * from users where email = ?";
    db.query(checkQuery, [email], (err, results) => {
        if(err){
            console.log(err)
            return res.status(500).json({error: 'Database error'});

        }
        if(results.length > 0){
            return res.status(400).json({error: 'Email already exists'});
        }
        else{
            const insertQuery = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
            db.query(insertQuery, [fullName, email, password], (err, results) => {      
                if(err){
                    return res.status(500).json({error: 'Database error'});
                }
                res.status(201).json({message: 'User registered successfully'});
            }
            );
        }
    } );
})
app.post('/api/login', (req,res)=>{
    const {email, password} = req.body;
    const query = "SELECT * FROM users WHERE email = ? AND password = ?";
    db.query(query, [email, password], (err, results) => {
        if(err){
            console.log(err);
            return res.status(500).json({error: 'Database error'});
        }
        if(results.length > 0){
            return res.status(200).json({message: 'Login successful', user: results[0]});
        }
        else{
            return res.status(401).json({error: 'Invalid email or password'});
        }
    });
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});