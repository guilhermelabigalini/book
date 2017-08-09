/*
$ redis-cli
127.0.0.1:6379> ZADD leaders 100 "Alice"
(integer) 1
127.0.0.1:6379> ZADD leaders 100 "Zed"
(integer) 1
127.0.0.1:6379> ZADD leaders 102 "Hugo"
(integer) 1
127.0.0.1:6379> ZADD leaders 101 "Max"
(integer) 1

127.0.0.1:6379> ZRANGE leaders 0 -1
1) "Alice"
2) "Zed"
3) "Max"
4) "Hugo"
127.0.0.1:6379>  ZREVRANGE leaders 0 -1
1) "Hugo"
2) "Max"
3) "Zed"
4) "Alice"

127.0.0.1:6379> ZREVRANGE leaders 0 -1 WITHSCORES
1) "Hugo"
2) "102"
3) "Max"
4) "101"
5) "Zed"
6) "100"
7) "Alice"
8) "100"

127.0.0.1:6379> ZSCORE leaders "Max"
"101"
127.0.0.1:6379> ZRANK leaders "Max"
(integer) 2
127.0.0.1:6379> ZREVRANK leaders "Max"
(integer) 0

*/