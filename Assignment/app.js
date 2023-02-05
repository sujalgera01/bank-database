const express = require('express');
const app = express();

// Just a first page to display
app.get('/', (req, res) => {
  res.send('Hello There!! Here you can search for the banks');
});
app.listen(3000);

// Database Connection
const { createPool } = require('mysql');
const pool = createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "indian_banks",
    connectionLimit: 10
});


// To retreive the list of all banks
app.get('/banks', (req, res) => {
    const bankList = pool.query(`select * from banks`,(err,result,fields)=>{
        if(err){
            return console.log(err);

        }
        else{
            return console.log(result);
        }
    });
    res.json(bankList);
  });

  app.get('/branch', (req, res) => {
    const branchList = pool.query(`select banks.id,banks.name,branches.branch,branches.address,branches.ifsc from banks where banks.id=
    branches.bank_id order by branch`,(err,result,fields)=>{
        if(err){
            return console.log(err);

        }
        else{
            return console.log(result);
        }
    });
    res.json(branchList);
  });

  // To retrieve the details

Bank.findAll().then(banks => {
    res.json(banks);
  });
  
//To retrieve the details of specific branch 
  Branch.findOne({ where: { ifsc } }).then(branch => {
    res.json(branch);
  });
  
  // To get details for specific branch we can search it in url
  app.get('/banks/:name', (req, res) => {
    const itemName = req.params.name;
    pool.query(`select banks.id,banks.name,branches.branch,branches.ifsc from banks where banks.id=
    branches.bank_id and banks.name` + {itemName} + "order by banks.name",(err,result,fields)=>{
        if(err){
            return console.log(err);

        }
        else{
            return console.log(result);
        }
    })
    res.json(itemDetails);
  });
  
  