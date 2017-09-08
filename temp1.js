// Session Store Login:
//
// app.get('/login', function(request, response) {
//     var user = {username: request.body.username, password: request.body.password };
//     // Validate somehow
//     validate(user, function(isValid, profile) {
//         // Create session token
//         var token= createSessionToken();
//
//         // Add to a key-value database
//         KeyValueStore.add({token: {userid: profile.id, expiresInMinutes: 60}});
//
//         // The client should save this session token in a cookie
//         response.json({sessionToken: token});
//     });
// }
// Token-Based Login:
//
// var jwt = require('jsonwebtoken');
// app.get('/login', function(request, response) {
//     var user = {username: request.body.username, password: request.body.password };
//     // Validate somehow
//     validate(user, function(isValid, profile) {
//         var token = jwt.sign(profile, 'My Super Secret', {expiresInMinutes: 60});
//         response.json({token: token});
//     });
// }
