const fetch = require('node-fetch');
const fs = require('fs');
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
var ddb = new AWS.DynamoDB();



//exports.lambdaHandler = async (event, context, callback) => {
//exports.lambdaHandler = async function (event, context) {
exports.lambdaHandler = function (event, context, callback) {
// console.log(event); 
//var receivedCallerSubmittedNumber = event['Details']['Parameters']['callerSubmittedNumber'];
var receivedCallerSubmittedNumber = event.Details.Parameters.callerSubmittedNumber;
var calculated = receivedCallerSubmittedNumber;
let phNo = event.Details.ContactData.CustomerEndpoint.Address;
var initMethod = event.Details.ContactData.InitiationMethod;
var instanceARN = event.Details.ContactData.InstanceARN;


var bodyData = {};
console.log(calculated); 
console.log(initMethod);
console.log(instanceARN);

if (calculated == 1){
 bodyData = JSON.stringify({
  "update": {}, 
   "fields": {
     "summary": "I-CreatedBy : "+initMethod+ ", user selected no-1", 
     "issuetype": {
       "id": "10001"
     },     
     "project": {
       "id": "10002"
     },
     "priority": {
      "id": "1"
     },
     "reporter": {
      "name": "Jira API"
    },
     "description": {
       "type": "doc",
       "version": 1,
       "content": [
         {
           "type": "paragraph",
           "content": [
             {
               "text": "PhNo: "+phNo+",  " +instanceARN+ ",***INCIDENT***",
               "type": "text"
             }
           ]
         }
       ]
     }
   
 }
});
}

else if (calculated == 2){
    bodyData = JSON.stringify({
      "update": {}, 
       "fields": {
         "summary": "S-CreatedBy : "+initMethod+ ", user selected no-2",  
         "issuetype": {
           "id": "10002"
         },     
         "project": {
           "id": "10002"
         },
         "priority": {
          "id": "4"
         },
         "reporter": {
          "name": "Jira API"
        },
         "description": {
           "type": "doc",
           "version": 1,
           "content": [
             {
               "type": "paragraph",
               "content": [
                 {
                   "text": "PhNo: "+phNo+",  " +instanceARN+ ",***SERVICE REQUEST***",
                   "type": "text"
                 }
               ]
             }
           ]
         }
       
     }
    });
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


sendReq = async() => {

  try {
    var response = await fetch('https://chethanmb.atlassian.net/rest/api/3/issue', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from('chethan.mb96@gmail.com:LlQF1rrxaY2L5Oddpmyo0DAA').toString('base64')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: bodyData
    })
    let jsonResp = await response.json();
    
    console.log("Request Key: " +jsonResp.key);
    console.log("Request ID: " +jsonResp.id);
    console.log("Request URL: " +jsonResp.self);
  //  let jsonData = JSON.stringify(jsonResp);
  //  console.log(jsonData);
    var datetime = new Date().toISOString();
    console.log(datetime);

    var params = {
      TableName: "test-DDB",
      Item: {
        id: { S: jsonResp.id },
        key: { S: jsonResp.key },
        url: { S: jsonResp.self },
        creation_date: { S: datetime }
      }
    };
     ddb.putItem(params, function(err, data) {
     if (err) {
       console.log("Error", err);
     } else {
       console.log("Success", data);
     }
    });
    


  } catch (e) {
   
    console.error(e)
  }
} 
sendReq();


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