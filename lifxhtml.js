var csscolours = require('css-color-names');
var convert = require('color-convert');
var lifx = require('lifx');
var lx = lifx.init();

var colours = Object.keys(csscolours);
var colour = colours[Math.floor(Math.random() * colours.length)];

if (process.argv.length === 3) {
  var argColour = process.argv[2];
  if (colours.includes(argColour)) {
    colour = argColour;
  }
  console.log("Setting colour to " + colour);
} else {
  console.log("Random colour: " + colour);
}
var hsl = convert.hex.hsl(csscolours[colour]);
console.log(hsl)

lx.on('bulb', function(b) {
  console.log('Bulb found: ' + b.name + " : " + b.addr.toString("hex"));
  lx.lightsColour((hsl[0] / 360 ) * 0xffff, (hsl[1] / 100 ) * 0xffff, (hsl[2] / 100 ) * 0xffff, 0xffff, 0);
  setTimeout(function(){
    process.exit()
  }, 1000);
});