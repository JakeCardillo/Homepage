

function createTable() {
  //get numbers
  var minX = document.forms["minMax"]["minX"].value;
  var maxX = document.forms["minMax"]["maxX"].value;
  var minY = document.forms["minMax"]["minY"].value;
  var maxY = document.forms["minMax"]["maxY"].value;

  var errors = document.getElementById("errors");

  if (minX > maxX)
  {
    var temp = minX;
    minX = maxX;
    maxX = temp;
    errors.innerHTML = "Warning! Min value larger than max value. Values have been switched";
  }

  if (minY > maxY)
  {
    var temp = minY;
    minY = maxY;
    maxY = temp;
    errors.innerHTML = "Warning! Min value larger than max value. Values have been switched";
  }

  var oldTable = document.getElementById('myTable');
  if( oldTable != null){
    oldTable.parentNode.removeChild(oldTable);
  }

  //create the table, if it doesn't exist
  var table = document.createElement('table')
  table.id = "myTable";

  //create the sides
  var thead = table.createTHead();
  var row = thead.insertRow();

  //0 origin
  var th = document.createElement('th');
  var text = document.createTextNode("x");
  th.appendChild(text);
  row.appendChild(th);

  //headings for x axis
  for (var i = minX; i <= maxX; i++)
  {
    var th = document.createElement('th');
    var text = document.createTextNode(i);
    th.appendChild(text);
    row.appendChild(th);
  }

  //fill out rows
  for (var i = minY; i <= maxY; i++)
  {
    //create a row
    var tr = document.createElement('tr');

    //create the header for that row
    var th = document.createElement('th');
    var text = document.createTextNode(i);
    th.appendChild(text);
    tr.appendChild(th);

    //fill out the cells in each row
    for (var j = minX; j <= maxX; j++)
    {
      var product = i * j;

      var td = document.createElement('td');
      var text = document.createTextNode(product);
      td.appendChild(text);
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  document.body.appendChild(table);
}
