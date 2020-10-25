

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

 