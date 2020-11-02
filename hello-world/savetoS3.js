const AWS = require('aws-sdk');
//const S3 = new AWS.S3({region: process.env.AWS_REGION, apiVersion: '2012-10-17'});

function putObjectToS3(data, nameOfFile) {
   var s3 = new AWS.S3();
   var params = {
       Bucket : "lamda-json-response-store-safasdvfas",
       Key : nameOfFile + ".json",
       Body : data
   }
   s3.putObject(params, function(err, data) {
     if (err) console.log(err, err.stack); 
     else     console.log("Success: " + data); 
   });
 }

var consumableData = {  
   "empid":"11111111", "email":"chethan.mb96@gmail.com",  
   "empid":"22222222", "email":"chethan.mb96@outlook.com",
   "empid":"33333333", "email":"chethan.m-b@dxc.com"
}

 
var jsonOutput = JSON.stringify(consumableData);
console.log(jsonOutput);


putObjectToS3(jsonOutput, "myData")