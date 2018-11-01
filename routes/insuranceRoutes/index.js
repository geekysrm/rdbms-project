const express = require('express');
const path = require("path");

const pg = require("pg");
const DBconfig = require('../../helper/DBconfig');

const pool = new pg.Pool(DBconfig);

const jwt = require("jsonwebtoken");
const SECRET = require('../../helper/JWTsecret');

const getAuthToken = require("../../middleware/authToken");

const router = express.Router();

router.get("/api/has-insurance", getAuthToken, (req,res) => {

    jwt.verify(req.token, SECRET, (err, authData) => {
        
        if(err)
        {
            res.sendStatus(403);
        }
        else
        {
            const id = authData.id;

            pool.query(`
                SELECT * FROM "Users" WHERE id = $1
            `,
            [id],
            (err,result) => {

                if(err)
                {
                    res.status(500).send(err.toString());
                }
                else
                {
                    if(result.rows.length === 0)
                    {
                      res.status(404).send("User not found!");
                    }
                    else
                    {
                        const hasInsurance = result.rows[0].hasInsurance;
                        res.status(200).send(hasInsurance);
                    }
                }

            })
        }

    });

});

router.post("/api/insurance", getAuthToken, (req,res) => {

    jwt.verify(req.token, SECRET, (err, authData) => {
        
        if(err)
        {
            res.sendStatus(403);
        }
        else
        {
            const id = authData.id;

            const {
                name,
                dl_number,
                car_model,
                car_company,
                car_number,
                car_year,
                car_price
            } = req.body;

            const d = new Date();
            const current_year = Number(d.getFullYear());
            const current_date = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();

            const yearDiff = current_year - Number(car_year);
            const current_price = car_price - ((Number(car_price) * 0.2) * yearDiff);

            pool.query(`
            UPDATE "Users" SET
            "hasInsurance" = true,
            "name" = $1,
            "dl" = $2,
            "car_model" = $3,
            "car_company" = $4,
            "car_number" = $5,
            "car_year" = $6,
            "car_price" = $7,
            "car_currentPrice" = $8,
            "date" = $9
            WHERE "id" = $10;
            `,
            [name,dl_number,car_model,car_company,car_number,car_year,car_price,current_price,current_date,id],
            (err, result) => {
                if(err)
                {
                    res.status(500).send(err.toString());
                }
                else
                {
                    res.status(200).send('Insurance registration succesfully');
                }
            });
        }

    });

});

router.get("/api/insurance", getAuthToken, (req,res) => {
    
        jwt.verify(req.token, SECRET, (err, authData) => {
            
            if(err)
            {
                res.sendStatus(403);
            }
            else
            {
                const id = authData.id;
    
                pool.query(`
                    SELECT * FROM "Users" WHERE id = $1
                `,
                [id],
                (err,result) => {
    
                    if(err)
                    {
                        res.status(500).send(err.toString());
                    }
                    else
                    {
                        if(result.rows.length === 0)
                        {
                          res.status(404).send("User not found!");
                        }
                        else
                        {
                            const {
                                name,
                                dl,
                                car_model,
                                car_company,
                                car_number,
                                car_year,
                                car_price,
                                car_currentPrice,
                                date
                            } = result.rows[0];

                            res.status(200).json({
                                id,
                                name,
                                dl,
                                car_model,
                                car_company,
                                car_number,
                                car_year,
                                car_price,
                                car_currentPrice,
                                date
                            });
                        }
                    }
    
                })
            }
    
        });
    
    });

router.get('/py',(req,res) => {
    
    let out = '';

    const imagePath = path.join( __dirname, "../../public/images/0010.JPEG" );
    const modelPath = path.join( __dirname, "../../ML/model.h5");
    
    var spawn = require("child_process").spawn;
    var process = spawn('python',["./ML/predict.py", imagePath, modelPath]);
    
    process.stdout.on("data", function(data){
      console.log(data.toString());
      out = out + data.toString();
    });

    process.stderr.on('data', function(data){
        console.log("Error: " + data);
      });
    
    process.stdout.on('end', function(){
      res.send(out);
    });
   
});

module.exports = router;
