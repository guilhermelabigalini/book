/*

$ redis-cli
127.0.0.1:6379> SADD user:max:favorite_artists "Arcade Fire" "Arctic Monkeys" "Belle & Sebastian" "Lenine"
(integer) 4
127.0.0.1:6379> SADD user:hugo:favorite_artists "Daft Punk" "The Kooks" "Arctic Monkeys"
(integer) 3

127.0.0.1:6379> SINTER user:max:favorite_artists user:hugo:favorite_artists
1) "Arctic Monkeys"

127.0.0.1:6379> SDIFF user:max:favorite_artists user:hugo:favorite_artists
1) "Belle & Sebastian"
2) "Arcade Fire"
3) "Lenine"

127.0.0.1:6379> SUNION user:max:favorite_artists user:hugo:favorite_artists
1) "Lenine"
2) "Daft Punk"
3) "Belle & Sebastian"
4) "Arctic Monkeys"
5) "Arcade Fire"

The command SRANDMEMBER returns random members from a Set. Because Sets
are unordered, it is not possible to retrieve elements from a given position:
127.0.0.1:6379> SRANDMEMBER user:max:favorite_artists
"Arcade Fire"
127.0.0.1:6379> SRANDMEMBER user:max:favorite_artists
"Lenine"

127.0.0.1:6379> SISMEMBER user:max:favorite_artists "Arctic Monkeys"
(integer) 1
127.0.0.1:6379> SISMEMBER user:max:favorite_artists "dont exists"
(integer) 0
127.0.0.1:6379> SREM user:max:favorite_artists "Arctic Monkeys"
(integer) 1
127.0.0.1:6379> SISMEMBER user:max:favorite_artists "Arctic Monkeys"
(integer) 0
127.0.0.1:6379> SCARD user:max:favorite_artists
(integer) 3

127.0.0.1:6379> SMEMBERS user:max:favorite_artists
1) "Belle & Sebastian"
2) "Arcade Fire"
3) "Lenine"

*/