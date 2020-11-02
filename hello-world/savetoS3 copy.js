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


 function updateS3( nameOfFile) {
  var s3 = new AWS.S3();
  var params = {
      Bucket : "lamda-json-response-store-safasdvfas",
      Key : nameOfFile
  }
 s3.getObject(params, function(err, data) {
  if (err) {
      console.log(err);
      var message = "Error getting object " + key + " from bucket " + bucket +".";
      console.log(message);
     // context.fail(message);
  } else {
      console.log(params_new);
      console.log('CONTENT TYPE getObject:', data.ContentType);
      var body = data.Body.toString('utf-8');
      body += 'snap-001\n';

      var params_new = {
          Bucket: "lamda-json-response-store-safasdvfas",
          Key: nameOfFile,
          Body: body
      };
      s3.putObject(params_new, function(err, data) {
                  console.log('put here');
                  if (err) {
                      console.log(err);
                      var message = "Error getting object " + key + " from bucket " + bucket +".";
                      console.log(message);
                      context.fail(message);
                  } else {
                      console.log('CONTENT TYPE putObject:', data.ContentType);
                      //context.succeed(data.ContentType);
                  }
      });

  }
});
 }





var consumableData = {  
   "empid":"11111111", "email":"chethan.mb96@gmail.com",  
   "empid":"22222222", "email":"chethan.mb96@outlook.com",
   "empid":"33333333", "email":"chethan.m-b@dxc.com"
}

 
var jsonOutput = JSON.stringify(consumableData);
console.log(jsonOutput);


//putObjectToS3(jsonOutput, "myData");
updateS3("myData-2020-10-29T13:55:35.449Z.json")