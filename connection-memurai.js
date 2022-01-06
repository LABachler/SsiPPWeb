
const memuraiDB = require('redis');
const clientDB = memuraiDB.createClient({
    host: '127.0.0.1',
    port: 6379
});

 clientDB.on('ready',() => {
    console.log('ready');
});
let key = 'ado';
let value = 10;
clientDB.set(key, value, async function (err, result) {

    if (err) {
        console.log(err);
        callback(err, null);
        return;
    }

    if (!isNaN(expire) && expire > 0) {
        await clientDB.expire(key, parseInt(expire));
    }

    callback(null, result)
})
