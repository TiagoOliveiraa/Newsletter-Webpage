
const express = require('express');
const request = require('request');
const https = require("https");


const app = express();
const apiKey = "f7328656d2f30c23be6f6f15d9bb57fd-us21";

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

app.get("/",function (req,res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/",function (req,res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/b3ff4c51a1";

    const options = {
        method: "POST",
        auth: "toliveira:f7328656d2f30c23be6f6f15d9bb57fd-us21"
    };

    const request = https.request(url,options, function (response) {
        
        const code = response.statusCode;

        if (code === 200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }
        
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    
    //request.write(jsonData);
    request.end();
})

app.post("/failure", function (req, res) {
    res.redirect("/");
})



app.listen(3000, function () {
    console.log("Server is up and running on port 3000!");
})

//API Key
//f7328656d2f30c23be6f6f15d9bb57fd-us21

//list ID
//b3ff4c51a1