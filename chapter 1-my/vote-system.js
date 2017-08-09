/*

$ redis-cli
127.0.0.1:6379> SET article:12345:headline "Google Wants to Turn Your Clothes Into a Computer"
OK
127.0.0.1:6379> SET article:10001:headline "For Millennials, the End of the TV Viewing Party"
OK
127.0.0.1:6379> SET article:60056:headline "Alicia Vikander, Who Portrayed Denmark's Queen, Is Screen Royalty"
OK

*/

var redis = require("redis"); // 1
var client = redis.createClient(); // 2

function upVote(id) { // 3
    var key = "article:" + id + ":votes"; // 4
    // uses INCR
    client.incr(key); // 5
}

function downVote(id) { // 1
    var key = "article:" + id + ":votes"; // 2
    // uses DECR
    client.decr(key); // 3
}

function showResults(id) {
    var headlineKey = "article:" + id + ":headline";
    var voteKey = "article:" + id + ":votes";
    client.mget([headlineKey, voteKey], function (err, replies) { // 1
        console.log('The article "' + replies[0] + '" has', replies[1], 'votes'); // 2
    });
}

upVote(12345); // article:12345 has 1 vote
upVote(12345); // article:12345 has 2 votes
upVote(12345); // article:12345 has 3 votes
upVote(10001); // article:10001 has 1 vote
upVote(10001); // article:10001 has 2 votes
downVote(10001); // article:10001 has 1 vote
upVote(60056); // article:60056 has 1 vote
showResults(12345);
showResults(10001);
showResults(60056);
client.quit();