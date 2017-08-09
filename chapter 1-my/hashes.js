/*

$ redis-cli
127.0.0.1:6379> HSET movie "title" "The Godfather"
(integer) 1
127.0.0.1:6379> HMSET movie "year" 1972 "rating" 9.2 "watchers" 10000000
OK
127.0.0.1:6379> HINCRBY movie "watchers" 3
(integer) 10000003

127.0.0.1:6379> HGET movie "title"
"The Godfather"
127.0.0.1:6379> HMGET movie "title" "watchers"
1) "The Godfather"
2) "10000003"

127.0.0.1:6379> HDEL movie "watchers"
(integer) 1

HGETALL movie

127.0.0.1:6379> HKEYS movie
1) "title"
2) "year"
3) "rating"
4) "watchers"

127.0.0.1:6379> HVALS movie
1) "The Godfather"
2) "1972"
3) "9.2"
4) "10000003"

The command HGETALL may be a problem if a Hash has many fields
and uses a lot of memory. It may slow down Redis because it needs to
transfer all of that data through the network. A good alternative in such
a scenario is the command HSCAN.
HSCAN does not return all the fields at once. It returns a cursor and the
Hash fields with their values in chunks. HSCAN needs to be executed
until the returned cursor is 0 in order to retrieve all the fields in a Hash:
$ redis-cli
127.0.0.1:6379> HMSET example "field1" "value1"
"field2" "value2" "field3" "value3"
OK
127.0.0.1:6379> HSCAN example 0
1) "0"
2) 1) "field2"
 2) "value2"
 3) "field1"
 4) "value1"
 5) "field3"
 6) "value3"
 
*/