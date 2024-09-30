let animation = function(a) {
  let parentList; 
  let positions = [];
  let data;
  
  let height;
  a.preload = function() {
    data = a.loadJSON('assets/data.json');
    console.log(data);
  }
  
  a.setup = function() {
    a.createCanvas(a.windowWidth, a.windowHeight);
    a.background(250);
    parentList = parents(data.data, "parent");
    
    height = a.windowHeight / parentList.length;
    
    parentList.forEach((p, i) => {
      positions.push({
        item: p,
        y: i * height
      });
    });
    
    a.frameRate(60);
  }
  
  a.draw = function() {
    a.background(250, 1);
    a.noStroke();
    h = a.windowHeight / data.data.length;
    
    let currentTime = a.millis();
    a.filter(a.BLUR, 0.1);
    
    //text("Current Time (ms): " + currentTime, 10, 20);
    data.data.forEach((d) => {
      let y = positions.find(pos => pos.item === d.identifier);
      
      if((currentTime >= d.intervalBeginMs && currentTime <= d.intervalEndMs)) {
        a.fill(categoryColor(d.category));
        a.textAlign(a.RIGHT);
        a.textSize(15);
        a.textStyle("bold");
        a.textFont("Helvetica");
        a.text(d.category, a.windowWidth - 10, y.y + 5 + height / 2);
      }
    });
  }

  a.windowResized = function() {
    a.resizeCanvas(a.windowWidth, a.windowHeight);
  }
}

let grid = function(g) {
  let parentList; 
  let positions = [];
  let data;
  
  let height;
  g.preload = function() {
    data = g.loadJSON('assets/data.json');
    console.log(data);
  }
  
  g.setup = function() {
    g.createCanvas(g.windowWidth, g.windowHeight);
    g.background(254, 0);
    
    parentList = parents(data.data, "parent");
    
    height = g.windowHeight / parentList.length;
    
    parentList.forEach((p, i) => {
      positions.push({
        item: p,
        y: i * height
      });
    });

    positions.forEach(d => {
      console.log(d);
      let y = positions.find(pos => pos.item === d.identifier);
      g.push();
      g.textSize(15);
      g.fill(220);
      g.textFont("Helvetica");
      g.text(d.item, 10, d.y + 5 + height / 2);
      g.stroke(220);
      g.line(10, d.y, g.windowWidth - 10, d.y);
      g.pop();
    })
  }

  g.windowResized = function() {
    g.resizeCanvas(g.windowWidth, g.windowHeight);
  }
}

let layer1 = new p5(animation);
let layer2 = new p5(grid);

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
};

function categoryColor(category) {
  let palette = ["#6350C6",
    "#39AF9D",
    "#F6946E",
    "#BCD148",
    "#D87FB0",
    "#64A0D7"];
    
    switch (category) {
      case "location":
      return palette[0]; // Example: purple for "location"
      case "camera":
      return palette[1];  // Example: red for "camera"
      case "contacts":
      return palette[2];  // Example: green for "contacts"
      case "microphone":
      return palette[3];  // Example: dark purple for "microphone"
      case "photos":
      return palette[4]; // Example: teal for "photos"
      case "mediaLibrary":
      return palette[5];  // Example: blue for "mediaLibrary"
      default:
      return color(255); // White for unknown categories
    }
  }
  
  function parents(json) {
    // Use a Set to store unique identifiers
    const uniqueIdentifiers = new Set();
    
    // Loop through the JSON array
    json.forEach(item => {
      if (item.hasOwnProperty('identifier')) {
        uniqueIdentifiers.add(item['identifier']); // Add the identifier to the Set
      }
    });
    
    // Convert the Set back to an array and return it
    return Array.from(uniqueIdentifiers).sort((a, b) => a.localeCompare(b));
  }
  
  /*
  
  devo avere un array di posizioni verticali che poi assegno allo switch
  
  */