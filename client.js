var net = require('net');

var HOST = '127.0.0.1';
var PORT = 6969;

var client = new net.Socket();

const readline = require('readline');

client.connect(PORT, HOST, function() {

    console.log('connect successfully');
    
});


client.on('data', function(data) {
    function prompt(question) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        return new Promise(function (resolve) {
            rl.question(question, function (answer) {
                client.write(answer)
                rl.close();
                resolve(answer.trim());
            });
        });
    }
    
    (async function () {

        Number(await prompt(data));
    
    })();
    

});

client.on('destroy', function() {

    console.log('Game Over!');
    
});


