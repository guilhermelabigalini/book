/*

$ redis-cli
127.0.0.1:6379> LPUSH books "Clean Code"
(integer) 1
127.0.0.1:6379> RPUSH books "Code Complete"
(integer) 2
127.0.0.1:6379> LPUSH books "Peopleware"
(integer) 3

$ redis-cli
127.0.0.1:6379> LLEN books
(integer) 3
127.0.0.1:6379> LINDEX books 1
"Clean Code"

$ redis-cli
127.0.0.1:6379> LRANGE books 0 1
1) "Peopleware"
2) "Clean Code"
127.0.0.1:6379> LRANGE books 0 -1
1) "Peopleware"
2) "Clean Code"
3) "Code Complete"


$ redis-cli
127.0.0.1:6379> LPOP books
"Peopleware"
127.0.0.1:6379> RPOP books
"Code Complete"
127.0.0.1:6379> LRANGE books 0 -1
1) "Clean Code"

*/

var redis = require("redis"); // 1
var client = redis.createClient(); // 2