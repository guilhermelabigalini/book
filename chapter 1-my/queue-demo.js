var redis = require("redis");
var client = redis.createClient();
var queue = require("./queue"); // 1
var logsQueue = new queue.Queue("logs", client); // 2
var MAX = 5;

function logMessages() { // 3
    logsQueue.pop(function (err, replies) { // 4
        var queueName = replies[0];
        var message = replies[1];
        console.log("[consumer] Got log: " + message); // 5
        logsQueue.size(function (err, size) { // 6
            console.log(size + " logs left");
        });
        logMessages();
    });
}

var dt = new Date();

for (var i = 0; i < MAX; i++) { // 3
    dt.setSeconds(dt.getSeconds() + i)
    logsQueue.push("Hello world #" + dt); // 4
}

console.log("Created " + MAX + " logs"); // 5

logsQueue.size(function (err, replies) {
    console.log("Got " + replies + " from logs"); // 5
});

logMessages();

//client.quit();