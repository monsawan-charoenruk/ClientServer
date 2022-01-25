var net = require('net');

var HOST = '127.0.0.1';
var PORT = 6969;

net.createServer(function(sock) {
    var state = 0;
    var score = 0;
    var round = 0;
    const answer = ["8", "5", "14"];
    sock.write('Enter Your Username:')
    sock.on('data', function(data) {
        switch(state){
            case 0: //wait for username
                sock.write('Hello' + data + ', Are you ready? (Yes/No)')
                state = 1;
                break

            case 1: //wait for user start
                if(data = 'Yes'){
                    state = 2;
                    break
                }
                if(data = 'No'){
                    state = 3;
                    break
                }
                else{
                    sock.write('Please enter correct answer.')
                    state = 1;
                    break
                }

            case 2: //wait for answer
                while(round < 3){
                    if(round = 0){
                        sock.write('10 / 2 = ?')
                        sock.on('data', function(data) {
                            if(data = answer[round]){
                                score++;
                            }
                            else{
                                score+=0;
                            }
                        })
                    }

                    if(round = 1){
                        sock.write('7 + 1 = ?')
                        sock.on('data', function(data) {
                            if(data = answer[round]){
                                score++;
                            }
                            else{
                                score+=0;
                            }
                        })
                    }
                    if(round = 2){
                        sock.write('2 + 4 x 3 = ?')
                        sock.on('data', function(data) {
                            if(data = answer[round]){
                                score++;
                            }
                            else{
                                score+=0;
                            }
                        })
                    }
                    round++;
                }
                sock.write('You score = ' + score)
                sock.write('Game Over!')
                state = 3;

            case 3: //End
                sock.close()
                }
        })
    }).listen(PORT, HOST);
console.log('Server listening on ' + HOST +':'+ PORT);