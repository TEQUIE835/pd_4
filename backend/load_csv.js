require ('dotenv').config();
const path = require('path')
const fs = require('fs');
const mysql = require('mysql2/promise');
const {parse} = require('csv-parse');
async function main(){
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });
    console.log('Conectado a mysql')

    const carpetaCSV = path.join(__dirname, "csv_data");
    const ordenCarga = [
      'clients.csv',
      'bills.csv',
      'transactions.csv',
      'transaction_bill.csv'
    ];

     const insertadores = {
    'clients.csv': async (row) => {
      const {  identification_number,client_full_name,first_address,second_address,phone,email } = row;
      await connection.execute(
        'INSERT INTO clients (identification_number, client_full_name, first_address, second_address, phone, email) VALUES (?, ?, ?, ?, ?, ?)',
        [identification_number, client_full_name, first_address, second_address , phone , email]
      );
    },
    'bills.csv': async (row) => {
      const { bill_number,bill_period,bill_amount,client_id } = row;
      await connection.execute(
        'INSERT INTO bills (bill_number, bill_period, bill_amount, client_id) VALUES (?, ?, ?, ?)',
        [bill_number,bill_period,bill_amount,client_id]
      );
    },
    'transactions.csv': async (row) => {
      const { id,transaction_timestamp,transaction_amount,transaction_state,transaction_type,client_id,payment_platform,paid_amount } = row;
      await connection.execute(
        'INSERT INTO transactions (id,transaction_timestamp,transaction_amount,transaction_state,transaction_type,client_id,payment_platform,paid_amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [id,transaction_timestamp,transaction_amount,transaction_state,transaction_type,client_id,payment_platform,paid_amount]
      );
    },
    'transaction_bill.csv': async (row) => {
      const { transaction_id,bill_number } = row;
      await connection.execute(
        'INSERT INTO transactions_bills (transaction_id,bill_number) VALUES (?, ?)',
        [transaction_id,bill_number]
      );
    },
  };
   
    for (const archivo of ordenCarga)
    {
        const ruta = path.join(carpetaCSV, archivo);
        const stream = fs.createReadStream(ruta)
        .pipe(parse({columns:true, delimiter: ','}));
        const insertar = insertadores[archivo];
        if (!insertar) {
            console.warn(`⚠️ No hay función para insertar datos desde: ${archivo}`);
            continue;
         }
        for await(const row of stream){
            await insertar(row)
        }
    };
    await connection.end();
};
main();