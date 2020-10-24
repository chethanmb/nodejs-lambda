const fetch = require('node-fetch');
const fs = require('fs');
var AWS = require('aws-sdk');
var sendReq = require('./sendRequest');
var ddbRequest = require('./dynamoDB');
AWS.config.update({region: 'us-east-1'});
var ddb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();




//exports.lambdaHandler = async (event, context, callback) => {
//exports.lambdaHandler = async function (event, context) {
exports.lambdaHandler = function (event, context, callback) {
// console.log(event); 
//var receivedCallerSubmittedNumber = event['Details']['Parameters']['callerSubmittedNumber'];
var receivedCallerSubmittedNumber = event.Details.Parameters.callerSubmittedNumber;
var enteredEmpid = event.Details.Parameters.enteredEmpid;
var calculated = receivedCallerSubmittedNumber;

let phNo = event.Details.ContactData.CustomerEndpoint.Address;
var initMethod = event.Details.ContactData.InitiationMethod;
var instanceARN = event.Details.ContactData.InstanceARN;


var bodyData = {};
console.log(calculated); 
console.log(initMethod);
console.log(instanceARN);
console.log(enteredEmpid);

var params = {
  Key: {
   "empid": {"S": enteredEmpid}
  }, 
  TableName: "test-users"
};



ddbRequest.getEmail(ddb, params);


/* docClient.get(params, function(err, data) {
  if (err) {
     console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
 } else {
    var recvdEmail = data.Item.email;
     console.log(data.Item.email);
 }
}); */

if (calculated == 1){
  let rawdata = fs.readFileSync('dataSet_1.json');
  let ds_1 = JSON.parse(rawdata);
  bodyData = JSON.stringify(ds_1);
}

else if (calculated == 2){
  let rawdata = fs.readFileSync('dataSet_2.json');
  let ds_2 = JSON.parse(rawdata);
  bodyData = JSON.stringify(ds_2);
}

else {
 
   callback(new Error(" Invalid user input - "+calculated+""));

} 

 /* await (fetch('https://chethanmb.atlassian.net/rest/api/3/issue', {
  method: 'POST',
  headers: {
    'Authorization': `Basic ${Buffer.from('chethan.mb96@gmail.com:LlQF1rrxaY2L5Oddpmyo0DAA').toString('base64')}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: bodyData
})
  .then(response => {
    console.log(`Response: ${response.status} ${response.statusText}`);
    return response.text();
  })
  .then(text => console.log(text))
  .catch(err => console.error(err))
);

const b = a.map(a =>a.id);
console.log(b);
console.log('Remaining time: ', context.getRemainingTimeInMillis());

}; */


//= async() =>

sendReq.send(fetch,bodyData,ddb,docClient);




};















/* // Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'us-east-1'});

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

var params = {
  TableName: "test-DDB",
  Item: {
    'id' : {S: '10001'},
    'key' : {S: 'TEST-01'},
    'url' : {S: 'dce de dce dedcdimcwedcmjwedcw'}
  }
};

// Call DynamoDB to add the item to the table
ddb.putItem(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
}); */