const { Client, Collection, ShardingManager } = require("discord.js");
const config = require("./config.json");
// Create your ShardingManger instance
const manager = new ShardingManager('./index.js', {
    // for ShardingManager options see:
    // https://discord.js.org/#/docs/main/v12/class/ShardingManager
    totalShards: config.totalshardcount,
    token: config.token
});

// Emitted when a shard is created
manager.on('shardCreate', (shard) => console.log(`Shard ${shard.id} launched`));

// Spawn your shards
manager.spawn(manager.totalShards, 10000);