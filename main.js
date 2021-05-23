  
let animalArray = [];

document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById("addAnimal").addEventListener("click", addToArray);
    function addToArray(){
        var animal = new animalObj (document.getElementById("name").value,document.getElementById("color").value,document.getElementById("select-group").value, document.getElementById("select-fluffiness").value);
        if (animal.isValid()){
        animalArray.push(animal);
        document.getElementById("name").value = "";
        document.getElementById("color").value = ""; 
        document.getElementById("select-group").value = "";
        document.getElementById("select-fluffiness").value = ""; 
        }
        else {
            alert("please enter valid fields" ); 
        }
        
    }
    // page before show code *************************************************************************

    $(document).on("pagebeforeshow", "#ListAll", function(event) {
        // have to use jQuery
        printAnimalList();
    });

    $(document).bind("change", "#select-group", function (event, ui) {
        selectedGroup = $('#select-group').val();
    });

    //end of page before show code *************************************************************************

    document.getElementById("buttonSortName").addEventListener("click", function() {
        animalArray.sort(dynamicSort("name"));
        printAnimalList();
        document.location.href = "index.html#ListAll";
      });
  

});
function animalObj(name, color,group, fluffiness) {
    this.name = name;
    this.color = color;
    this.group = group; 
    this.fluffiness = fluffiness;
    this.isValid = function () {
      if ((this.name != "") && (this.color != "") && (this.group != null) && (this.fluffiness >=1)){
        return true
      }
      else{ 
        return false;
      }
    };
    
    this.getAll = function() {
      return name + " " + color + " " + group + " fluffiness: " + fluffiness;
    };
  }

  function printAnimalList() {
    let animalList = document.getElementById("myul");
    animalList.innerHTML="";
    for (let i = 0; i < animalArray.length; i++) {
      let li = document.createElement("li");
      li.innerHTML = animalArray[i].getAll();
      animalList.appendChild(li);
    };
  };
  

/**
 *  https://ourcodeworld.com/articles/read/764/how-to-sort-alphabetically-an-array-of-objects-by-key-in-javascript
* Function to sort alphabetically an array of objects by some specific key.
* 
* @param {String} property Key of the object to sort.
*/
function dynamicSort(property) {
    var sortOrder = 1;

    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a, b) {
        if (sortOrder == -1) {
            return b[property].localeCompare(a[property]);
        } else {
            return a[property].localeCompare(b[property]);
        }
    }
}




