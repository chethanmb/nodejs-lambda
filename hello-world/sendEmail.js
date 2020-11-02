
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});

var params = {
  Message: 'Pass the parameters to the publish method of the AWS.SNS client class. Create a promise for invoking an Amazon SNS service object, passing the parameters object. Then handle the response in the promise callback', /* required */
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
