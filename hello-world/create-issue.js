const fetch = require('node-fetch');

const bodyData = `{
  "update": {}, 
   "fields": {
     "summary": "***Incident JSD help via REST***",  
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
               "text": "*****Order entry fails when selecting supplier.*****",
               "type": "text"
             }
           ]
         }
       ]
     }
   
 }
}`;

fetch('https://chethanmb.atlassian.net/rest/api/3/issue', {
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
  .catch(err => console.error(err));


  /* async function getBlock() {
    let jsonBlocks;  
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
      jsonBlocks = await response.json();
      console.log(jsonBlocks.key);
      console.log(jsonBlocks)
      
    } catch (e) {
      // handle error
      console.error(e)
    }
  } 
  getBlock() */