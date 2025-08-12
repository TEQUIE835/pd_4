require('dotenv').config()
const mysql = require('mysql2')
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

const connection = mysql.createConnection({
    host : process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

connection.connect((err) => {
    if(err) throw err
    console.log('Connected to database')
})


app.get("/bills", (req, res) =>{
    connection.query('SELECT * FROM bills', (err, results) =>{
        if (err) throw err;
        res.send(results);
    });
});
app.post("/bills", (req,res) =>{
    const { bill_number,bill_period,bill_amount,client_id } = req.body;
    connection.query('INSERT INTO bills (bill_number,bill_period,bill_amount,client_id) VALUES (?, ?, ?, ?)', 
        [bill_number,bill_period,bill_amount,client_id], 
        (err, results) =>{
        if (err) throw err;
        res.send(bill_number,bill_period,bill_amount,client_id);
    });
});
app.put("/bills/:bill_number", (req, res) => {
    const {bill_number} = req.params;
    const {bill_period,bill_amount,client_id} = req.body;
    connection.query("UPDATE bills SET bill_period = ?, bill_amount = ?, client_id = ? WHERE bill_number = ?",
        [bill_period,bill_amount,client_id,bill_number],
        (err, results) =>{
            if (err) throw err;
            res.send(bill_period,bill_amount,client_id,bill_number);
        }
    );
});

app.delete("/bills/:bill_number", (req, res) =>{
    const {bill_number} = req.params;
    connection.query("DELETE FROM bills WHERE bill_number = ?", 
        [bill_number],
        (err, results) =>{
            if (err) throw err;
            res.send({message: "Bill deleted succesfully", bill_number});
        }
    );
});

app.get("/total_cliente", (req, res) =>{
    connection.query("SELECT c.client_full_name AS client , SUM(paid_amount) AS total_paid FROM transactions t JOIN clients c ON c.identification_number = t.client_id GROUP BY c.client_full_name",
        (err, results) =>{
            if (err) throw err;
            res.send(results);
        }
    );
});

app.get("/pending_bills", (req, res) => {
    connection.query("SELECT c.* , b.*, t.* FROM transactions t JOIN transactions_bills tb ON tb.transaction_id = t.id JOIN bills b ON b.bill_number = tb.bill_number JOIN clients c ON t.client_id = c.identification_number WHERE transaction_state = 'Pending'",
        (err, results) => {
            if (err) throw err;
            res.send(results);
        }
    );
});


app.listen(3000, () =>
    {
        console.log('Server is running');
    });