
Parse.Cloud.define('nearby', function(request, response) {

  var params = request.params;
  var customData = params.customData;

  if (!customData) {
    response.error("Missing customData!")
  }

  var sender = JSON.parse(customData).sender;
  var toToken = JSON.parse(customData).toToken;
  var  message = JSON.parse(customData).message;
  var query = new Parse.Query(Parse.Installation);
  query.equalTo("deviceToken", toToken);

  Parse.Push.send({
  where: query,
  // Parse.Push requires a dictionary, not a string.
  data: {"alert": message},
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



Parse.Cloud.define('like', function(request, response) {

  var params = request.params;
  var likeData = params.likeData;

  if (!likeData) {
    response.error("Missing customData!")
  }

  var sender = JSON.parse(likeData).sender;
  var toToken = JSON.parse(likeData).toToken;
  var  message = JSON.parse(likeData).message;
  var likeQuery = new Parse.Query(Parse.Installation);
  likeQuery.equalTo("deviceToken", toToken);

  Parse.Push.send({
  where: likeQuery,
  // Parse.Push requires a dictionary, not a string.
  data: {"alert": message},
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
