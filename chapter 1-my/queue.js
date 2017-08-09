
function Queue(queueName, redisClient) { // 1
    this.queueName = queueName; // 2
    this.redisClient = redisClient; // 3
    this.queueKey = 'queues:' + queueName; // 4
    // zero means no timeout
    this.timeout = 0; // 5
}

Queue.prototype.size = function (callback) { // 1
    this.redisClient.llen(this.queueKey, callback); // 2
};

Queue.prototype.size = function (callback) { // 1
    this.redisClient.llen(this.queueKey, callback); // 2
};

Queue.prototype.push = function (data) { // 1
    this.redisClient.lpush(this.queueKey, data); // 2
};

/*
The command BRPOP removes the last element of a Redis List. If the List is empty,
it waits until there is something to remove. BRPOP is a blocking version of RPOP.
However, RPOP is not ideal. If the List is empty, we would need to implement some
kind of polling by ourselves to make sure that items are handled as soon as they are
added to the queue. It is better to take advantage of BRPOP and not worry about
empty lists.
*/
Queue.prototype.pop = function (callback) { // 1
    this.redisClient.brpop(this.queueKey, this.timeout, callback); // 2
};

exports.Queue = Queue; // 1