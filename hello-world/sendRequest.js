const putPayload = require('./dynamoDB');

module.exports = {
send:  async(fetch, bodyData, ddb, docClient) => {
  
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
    // let jsonStringData = bodyData.toString();
   //  console.log(jsonData);
     var datetime = new Date().toISOString();
     console.log(datetime);
 
     var params = {
       TableName: "test-DDB",
       Item: {
         id: { S: jsonResp.id },
         key: { S: jsonResp.key },
         url: { S: jsonResp.self },
         creation_date: { S: datetime },
         jsonPayload: { S: bodyData }
       }
     };
     
     putPayload.insertPayload(ddb, params);
 
     //var msg = JSON.stringify(jsonResp);
     /* var params = {
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
       }); */
     
 
 
   } catch (e) {
    
     console.error(e)
   }
   
}


 } 