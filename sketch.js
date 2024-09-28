let table;
let categories = []; // Array to store unique categories
let categoryColors = {}; // Object to store colors assigned to each category
let sortedRows;
let parentList; 
let positions = [];

let height;

function preload() {
  data = loadJSON('assets/data-240918.json');
  console.log(data);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  parentList = parents(data.data, "parent");

  height = windowHeight / parentList.length;

  parentList.forEach((p, i) => {
    positions.push({
      item: p,
      y: i * height
    });
  });

  frameRate(60);
}

function draw() {
  background(254, 5);
  noStroke();
  h = windowHeight / data.data.length;

  let currentTime = millis();

  //text("Current Time (ms): " + currentTime, 10, 20);
  data.data.forEach((d) => {
    let y = positions.find(pos => pos.item === d.identifier);

    if((currentTime >= d.intervalBeginMs && currentTime <= d.intervalEndMs)) {
      fill(categoryColor(d.category));
      textAlign(CENTER);
      textFont("Helvetica");
      filter(BLUR, 2);
      text(d.identifier, windowWidth / 2, y.y + 5 + height / 2);
    }
  })
}

function categoryColor(category) {
  let palette = ["#fe98a1",
    "#139d1b",
    "#ec1660",
    "#02b9cb",
    "#bc7200",
    "#86aeff"]

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