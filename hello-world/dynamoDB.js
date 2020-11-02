var AWS = require('aws-sdk');

async function getEmail(ddb, params){
   try {
      
       var result = await ddb.getItem(params).promise()
       console.log(result.Item.email.S)
   } catch (error) {
       console.error(error);
   }
 }
 exports.getEmail = getEmail;


 async function insertPayload(ddb, params){
 await ddb.putItem(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
   });
}
exports.insertPayload = insertPayload;


async function updateResponse(ddb, params){
    await ddb.updateItem(params, function(err, data) {
        if (err) console.log(err, err.stack); 
        else     console.log(data);           
});
    }
exports.updateResponse = updateResponse;

 

async function putObjectToS3(data, nameOfFile) {
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
exports.putObjectToS3 = putObjectToS3;


async function updateS3(nameOfFile) {
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
      body += 'xxxxx-sssssssss-vvvvvvvv\n';

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

 exports.updateS3 = updateS3;