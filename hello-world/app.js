const fetch = require('node-fetch');

exports.lambdaHandler = async (event) => {
//exports.lambdaHandler = async function (event, context) {
//exports.handler = function (event, context, callback) {
// console.log(event); 
var receivedCallerSubmittedNumber = event['Details']['Parameters']['callerSubmittedNumber'];
var calculated = receivedCallerSubmittedNumber;
let phNo = event.Details.ContactData.CustomerEndpoint.Address;
var bodyData = {};
console.log(calculated); 


if (calculated == 1){
 bodyData = JSON.stringify({
  "update": {}, 
   "fields": {
     "summary": event.Details.ContactData.InitiationMethod +"***User selected no.-1 : pwd reset***",  
     "issuetype": {
       "id": "10001"
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
               "text": "*****PASSWORD RESET REQUEST*****",
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
    bodyData = `{
      "update": {}, 
       "fields": {
         "summary": "***User selected no.-2 : Others***",  
         "issuetype": {
           "id": "10002"
         },     
         "project": {
           "id": "10002"
         },
         "priority": {
          "id": "2"
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
                   "text": "*****OTHER REQUEST*****",
                   "type": "text"
                 }
               ]
             }
           ]
         }
       
     }
    }`;
}

else {

} 

await (fetch('https://chethanmb.atlassian.net/rest/api/3/issue', {
  method: 'POST',
  headers: {
    'Authorization': `Basic ${Buffer.from('chethan.mb96@gmail.com:LlQF1rrxaY2L5Oddpmyo0DAA').toString('base64')}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: bodyData
})
  .then(response => {
    console.log(
      `Response: ${response.status} ${response.statusText}`
    );
    return response.text();
  })
  .then(text => console.log(text))
  .catch(err => console.error(err))
);

 
 
};
