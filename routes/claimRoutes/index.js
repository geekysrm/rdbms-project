const express = require('express');
const path = require("path");
const multer = require("multer");

const pg = require("pg");
const DBconfig = require('../../helper/DBconfig');

const pool = new pg.Pool(DBconfig);

const jwt = require("jsonwebtoken");
const SECRET = require('../../helper/JWTsecret');

const getAuthToken = require("../../middleware/authToken");

const router = express.Router();

let counter = 0;

const storage = multer.diskStorage({
    destination: './public/images/',
    filename: function(req, file, cb){
        cb(null, file.fieldname + counter.toString() + path.extname(file.originalname));
    }
});

function checkFileType(file, cb)
{
    const filetypes = /jpeg|jpg|png|JPEG/;

    const extname = filetypes.test(path.extname(file.originalname));
    const mimetype = filetypes.test(file.mimetype);

    if(extname && mimetype)
    {
        return cb(null, true);
    }
    else
    {
        cb("Error: only images!!"); 
    }
}

const upload = multer({
    storage: storage,
    limit: {
        fileSize: 10000000
    },
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    }
}).single('image');


router.post("/api/claim", (req,res)=>{
    
        upload(req, res, (err) => {
            if(err)
            {
                res.status(500).send(err);
            }
            else
            {
                if(req.file == undefined)
                {
                    res.status(404).send("No file selected");
                }
                else
                {
                    const name = req.body.name;
                    const token = req.body.token.toString().split(" ")[1];

                    jwt.verify(token, SECRET, (err, authData) => {
                        
                        if(err)
                        {
                            res.sendStatus(403);
                        }
                        else
                        {
                            const id = authData.id;

                            const fileName = req.file.fieldname + counter.toString() + path.extname(req.file.originalname)
                            counter++;
        
                            let out = '';
        
                            const imagePath = path.join( __dirname, "../../public/images/", fileName );
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
        
                                const lvl1 = Number(out.charAt(2));
                                const lvl2 = Number(out.charAt(5));
                                const lvl3 = Number(out.charAt(8));
        
                                let damage;
        
                                if(lvl1 === 1)
                                {
                                    damage = 1;
                                }
                                else if(lvl2 === 1)
                                {
                                    damage = 2;
                                }
                                else if(lvl3 === 1)
                                {
                                    damage = 3;
                                }

                                pool.query(`
                                    SELECT * FROM "user" WHERE id = $1
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
                                            const carPrice = result.rows[0].car_currentPrice;

                                            let refund;

                                            if(damage === 1)
                                            {
                                                refund = (carPrice*0.1).toString() + "-" + (carPrice*0.2).toString();
                                            }
                                            else if(damage === 2)
                                            {
                                                refund = (carPrice*0.3).toString() + "-" + (carPrice*0.4).toString();
                                            }
                                            else if(damage === 3)
                                            {
                                                refund = (carPrice*0.5).toString() + "-" + (carPrice*0.6).toString();
                                            }
                                            
                                            pool.query(`
                                                INSERT INTO "claim" ("user_id", "name", "image_url", "status", "damage", "refund")
                                                VALUES ($1, $2, $3, $4, $5, $6);
                                            `,
                                            [id, name, fileName, "pending", damage, refund],
                                            (err,result) => {
    
                                                if(err)
                                                {
                                                    res.status(500).send(err.toString());
                                                }
                                                else
                                                {
                                                    res.status(200).redirect('/home');
                                                }
                                            });
                                        }   
                                    }
                                });
        
                                
                            });
                        }

                    });

                }
            }
        })
    });

router.get("/api/claim", getAuthToken, (req,res) => {

    jwt.verify(req.token, SECRET, (err, authData) => {
        
        if(err)
        {
            res.sendStatus(403);
        }
        else
        {
            const id = authData.id;

            pool.query(`
                SELECT * FROM "claim" WHERE user_id = $1
            `,
            [id],
            (err,result) => {

                if(err)
                {
                    res.status(500).send(err.toString());
                }
                else
                {
                   res.status(200).json(result.rows);
                }

            })
        }

    });

});

module.exports = router;
