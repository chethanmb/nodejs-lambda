const fetch = require('node-fetch');
const fs = require('fs');
var AWS = require('aws-sdk');
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
  TableName: "test-users",
  Key:{
      "empid": enteredEmpid   
  }
};

docClient.get(params, function(err, data) {
  if (err) {
     console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
 } else {
    var recvdEmail = data.Item.email;
     console.log(data.Item.email);
 }
});

if (calculated == 1){
 bodyData = JSON.stringify({
  "update": {}, 
   "fields": {
     "summary": "I-CreatedBy : "+initMethod+ "", 
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
               "text": "PhNo: "+phNo+", " +instanceARN+ ",***INCIDENT***",
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
         "summary": "S-CreatedBy : "+initMethod+ " ",  
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

    //var msg = JSON.stringify(jsonResp);
    var params = {
      Message: JSON.stringify(jsonResp),
      TopicArn: 'arn:aws:sns:us-east-1:329189147377:gmail_email_alerts'
    };
    
    var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();
    
    publishTextPromise.then(
      function(data) {
        console.log(`Message ${params.Message} sent to the topic ${params.TopicArn}`);
        console.log("MessageID is " + data.MessageId);
      }).catch(
        function(err) {
        console.error(err, err.stack);
      });
    


  } catch (e) {
   
    console.error(e)
  }
} 

sendReq()




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