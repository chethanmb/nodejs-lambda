

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
 ddb.putItem(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
   });
}
exports.insertPayload = insertPayload;

async function updateDB(ddb, params){
    console.log("Updating the item...");
    docClient.update(params, function(err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
        }
    });   
}

 