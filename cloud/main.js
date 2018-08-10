
Parse.Cloud.define('pingReply', function(request, response) {

  var params = request.params;
  var customData = params.customData;

  if (!customData) {
    response.error("Missing customData!")
  }

  var sender = JSON.parse(customData).sender;
  var to = JSON.parse(customData).to;
  var query = new Parse.Query(Parse.Installation);
  query.equalTo("deviceToken", to);

  Parse.Push.send({
  where: query,
  // Parse.Push requires a dictionary, not a string.
  data: {"alert": "The Giants scored!"},
  }, { success: function() {
     console.log("#### PUSH OK");
  }, error: function(error) {
     console.log("#### PUSH ERROR" + error.message);
  }, useMasterKey: true})
  .then(function() {
  	// Push sent!
    console.log("Push to user was successful");
  }, function(error) {
  	// There was a problem :(
    console.log("Error sending push: " + error.code + " - " + error.message);
  });

  response.success('success');

});
