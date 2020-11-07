//Jake Cardillo
//GUI Design - In Class 5
//jacob_cardillo@student.uml.edu


var listParent = document.getElementsByTagName("ul")[0];

// ADD NEW ITEM TO END OF LIST
var cream = document.createElement("LI");
var ctext = document.createTextNode("cream");
cream.appendChild(ctext);

listParent.appendChild(cream);

// ADD NEW ITEM START OF LIST
var kale = document.createElement("LI");
var ktext = document.createTextNode("kale");
kale.appendChild(ktext);

listParent.insertBefore(kale, listParent.childNodes[0]);

// ADD A CLASS OF COOL TO ALL LIST ITEMS
for (var i = 0; i < 6; i++)
  listParent.getElementsByTagName("li")[i].className = "cool";

// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
var header = document.getElementsByTagName("h2")[0];
var items = " - " + listParent.childElementCount;
header.appendChild(document.createTextNode(items));
