/*
127.0.0.1:6379> SETBIT visits:2015-01-01 10 1
(integer) 0
127.0.0.1:6379> SETBIT visits:2015-01-01 15 1
(integer) 0
127.0.0.1:6379> SETBIT visits:2015-01-02 10 1
(integer) 0
127.0.0.1:6379> SETBIT visits:2015-01-02 11 1
(integer) 0

127.0.0.1:6379> GETBIT visits:2015-01-01 10
(integer) 1
127.0.0.1:6379> GETBIT visits:2015-01-02 15
(integer) 0

127.0.0.1:6379> BITCOUNT visits:2015-01-01
(integer) 2
127.0.0.1:6379> BITCOUNT visits:2015-01-02
(integer) 2

//  OR, AND, XOR, and NOT
127.0.0.1:6379> BITOP OR total_users visits:2015-01-01 visits:2015-01-02
(integer) 2
127.0.0.1:6379> BITCOUNT total_users
(integer) 3

*/

var redis = require("redis");
var client = redis.createClient({ return_buffers: true }); // 1

function storeDailyVisit(date, userId) { // 2
    var key = 'visits:daily:' + date; // 3
    client.setbit(key, userId, 1, function (err, reply) { // 4
        console.log("User", userId, "visited on", date); // 5
    });
}

function countVisits(date) { // 1
    var key = 'visits:daily:' + date; // 2
    client.bitcount(key, function (err, reply) { // 3
        console.log(date, "had", reply, "visits."); // 4
    });
}

function showUserIdsFromVisit(date) { // 1
    var key = 'visits:daily:' + date; // 2
    client.get(key, function (err, bitmapValue) { // 3
        var userIds = []; // 4
        var data = bitmapValue.toJSON().data; // 5
        data.forEach(function (byte, byteIndex) { // 6
            for (var bitIndex = 7; bitIndex >= 0; bitIndex--) { // 7
                var visited = byte >> bitIndex & 1; // 8
                if (visited === 1) { // 9
                    var userId = byteIndex * 8 + (7 - bitIndex); // 10
                    userIds.push(userId); // 11
                }
            }
        });
        console.log("Users " + userIds + " visited on " + date); // 12
    });
}

storeDailyVisit('2015-01-01', '1');
storeDailyVisit('2015-01-01', '2');
storeDailyVisit('2015-01-01', '10');
storeDailyVisit('2015-01-01', '55');
countVisits('2015-01-01');
showUserIdsFromVisit('2015-01-01');
client.quit();