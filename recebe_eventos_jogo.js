var five = require("johnny-five");
var board = new five.Board();

var qtdLeds = 0;

var pubnub = require("pubnub")({
    ssl           : true,  // <- enable TLS Tunneling over TCP
    publish_key   : "pub-c-128c8884-d4b7-4c72-bfd5-273a0a73c35c",
    subscribe_key : "sub-c-c5dee452-6049-11e7-b272-02ee2ddab7fe"
});

board.on("ready", function() {
  var led2 = new five.Led(2);
  var led3 = new five.Led(3);
  var led4 = new five.Led(4);
  var led5 = new five.Led(5);

  pubnub.subscribe({

    channel : 'jogo_bis14',
    message : function(m){
        console.log(m)

        if (m == 1){
        	if (qtdLeds < 4){
        		qtdLeds++;
        	}
        } else {
        	if (qtdLeds > 0){
        		qtdLeds--;
        	}
        }

        led2.off();
        led3.off();
        led4.off();
        led5.off();

        if (qtdLeds > 3){
        	led2.on();
	        led3.on();
	        led4.on();
	        led5.on();
        } else if (qtdLeds > 2){
        	led2.on();
	        led3.on();
	        led4.on();
        } else if (qtdLeds > 1){
        	led2.on();
	        led3.on();
        } else if (qtdLeds > 0){
        	led2.on();
        }
    },
    error : function (error) {
        console.log(JSON.stringify(error));
    }
  });
});