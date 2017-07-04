var five = require("johnny-five");
var board = new five.Board();

var qtdLeds = 0;
var last = 0;

var pubnub = require("pubnub")({
    ssl           : true,  // <- enable TLS Tunneling over TCP
    publish_key   : "pub-c-128c8884-d4b7-4c72-bfd5-273a0a73c35c",
    subscribe_key : "sub-c-c5dee452-6049-11e7-b272-02ee2ddab7fe"
});

board.on("ready", function() {
  var light = new five.Light("A0");
  light.on("change", function() {
    if (last != this.level){
        console.log(this.level);
        last = this.level;

        pubnub.publish({
                channel   : 'luzes_arduino',
                message   : last,
                callback  : function(e) {
                    console.log( "SUCCESS!", e );
                },
                error     : function(e) {
                    console.log( "FAILED! RETRY PUBLISH!", e );
                }
        });
    }    
  });
});