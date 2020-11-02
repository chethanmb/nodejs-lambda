var AWS = require('aws-sdk');
const putPayload = require('./dynamoDB');
const { v4: uuidv4 } = require('uuid');



module.exports = {
  
send:  async function(fetch, bodyData, ddb, docClient,datetime)  {
  var params = {
    TableName: "test-DDB",
    Item: {
      id: { S: "1" },
      key: { S: "" },
      url: { S: "" },
      creation_date: { S: datetime },
      jsonPayload: { S: bodyData }
    }
  };
  
  putPayload.insertPayload(ddb, params);



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
     jsonResp = await response.json();
     
     console.log("Request Key: " +jsonResp.key);
     console.log("Request ID: " +jsonResp.id);
     console.log("Request URL: " +jsonResp.self);
    // let jsonStringData = bodyData.toString();
   //  console.log(jsonData);
     
 
   var params = {
    ExpressionAttributeNames: {
     //"#id": "id", 
     "#key": "key",
     "#url": "url"
    }, 
    ExpressionAttributeValues: {
     /* ":i": {
       S: jsonResp.id
      },  */
     ":k": {
       S: jsonResp.key
    }, 
     ":u": {
       S: jsonResp.self
    }
  },
    Key: {
     "id": {
       S: "1"
      }
    }, 
    ReturnValues: "ALL_NEW", 
    TableName: "test-DDB", 
    UpdateExpression: "SET  #key = :k, #url = :u"
   };
     
     putPayload.updateResponse(ddb, params);
 

     let str = "-----------------------------------------------------------------------------";
     var paramsEmail = {
      Message: ' \nData sent to JIRA: \n'+bodyData+' \n',
      
      TopicArn: 'arn:aws:sns:us-east-1:329189147377:gmail_email_alerts'
    };
    
    paramsEmail.Message += ''+str+' \nResponse from JIRA: \n ID: '+JSON.stringify(jsonResp.id)+' \n KEY: '+JSON.stringify(jsonResp.key)+'\n  ';

    var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(paramsEmail).promise();
    
    publishTextPromise.then(
      function(data) {
        console.log(`Message ${paramsEmail.Message} sent to the topic ${paramsEmail.TopicArn}`);
        console.log("MessageID is " + data.MessageId);
      }).catch(
        function(err) {
        console.error(err, err.stack);
      });


     
   } 
   catch (e) {
     console.error(e)
   }

  
   
}



 } 