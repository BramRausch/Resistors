/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');
var Vibe = require('ui/vibe');

var resColors = ['#000000', '#AA5500', '#FF0000', '#FFAA00', '#FFFF00', '#00AA00', '#00AAFF', '#AA00AA', '#555555', '#FFFFFF'];
var tolColors = ['#AAAA00', '#AAAAAA'];
var tol = ["5", "10"];
var zeros = [" ", "0 ", "00 ", " k", "0 k", "00 k", " M", "0 M"];

var ring1color = 0;
var ring2color = 0;
var ring3color = 0;
var ring4color = 0;
var ringSelect = 0;

var ringWidth = 31;
var borderWidth = 4;

var joinedResistance = "";

var wind = new UI.Window({
    backgroundColor: '#000000'
});

var trackBall = new UI.Circle({
  position: new Vector2(ringWidth/2+4, 144/2 + 56),
  radius: 4,
  backgroundColor: 'white',
});

function draw(){
  var base = new UI.Rect({
    position: new Vector2(0, 144/2-4),
    size: new Vector2(168, 54),
    backgroundColor: '#FFFFFF'
  });
  var ring1 = new UI.Rect({
    position: new Vector2(4, 144/2),
    size: new Vector2(ringWidth, 46),
    backgroundColor: resColors[ring1color]
  });
  var ring2 = new UI.Rect({
    position: new Vector2(8+ringWidth, 144/2),
    size: new Vector2(ringWidth, 46),
    backgroundColor: resColors[ring2color]
  });
  var ring3 = new UI.Rect({
    position: new Vector2(12+ringWidth*2, 144/2),
    size: new Vector2(ringWidth, 46),
    backgroundColor: resColors[ring3color]
  });
  var ring4 = new UI.Rect({
    position: new Vector2(16+ringWidth*3, 144/2),
    size: new Vector2(ringWidth, 46),
    backgroundColor: tolColors[ring4color]
  });

  joinedResistance = String(ring1color) + String(ring2color) + zeros[ring3color] + "Ohm " + tol[ring4color] + "%";
  var resistanceText = new UI.Text({
    position: new Vector2(4, 15),
    size: new Vector2(136, 24),
    text: joinedResistance,
    font: 'gothic-24-bold',
    color:'white',
    backgroundColor: 'black',
    textAlign: 'center'  
  });

  wind.add(base);
  wind.add(ring1);
  wind.add(ring2);
  wind.add(ring3);
  wind.add(ring4);
  wind.add(trackBall);
  wind.add(resistanceText);
  wind.show();
}
draw();

wind.on('click', 'up', function(e) {
  switch(ringSelect){
    case 0:
      if(ring1color < 9){
        ring1color++;
      } else{
        ring1color = 0;
      }
    break;
    case 1:
      if(ring2color < 9){
        ring2color++;
      } else{
        ring2color = 0;
      }
    break;
    case 2:
      if(ring3color < 7){
        ring3color++;
      } else{
        ring3color = 0;
      }
    break;
    case 3:
      if(ring4color == 1){
        ring4color = 0;
      } else{
        ring4color = 1;
      }
    break;
  }
  draw();
});

wind.on('click', 'select', function(e) {
  if(ringSelect < 3){
    ringSelect++;
    var pos = trackBall.position();
    pos.x += ringWidth+4;
    trackBall.animate('position', pos, 200);
  } else if(ringSelect == 3){
    ringSelect = 0;
    var pos = trackBall.position();
    pos.x = ringWidth/2+4;
    trackBall.animate('position', pos, 200);
  }
});

wind.on('click', 'down', function(e) {
  switch(ringSelect){
    case 0:
      if(ring1color > 0){
        ring1color--;
      } else{
        ring1color = 9;
      }
    break;
    case 1:
      if(ring2color > 0){
        ring2color--;
      } else{
        ring2color = 9;
      }
    break;
    case 2:
      if(ring3color > 0){
        ring3color--;
      } else{
        ring3color = 7;
      }
    break;
    case 3:
      if(ring4color == 0){
        ring4color = 1;
      } else{
        ring4color = 0;
      }
    break;
  }
  draw();
});
