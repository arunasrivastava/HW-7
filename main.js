  
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
    $(document).bind("change", "#select-group", function (event, ui) {
        selectedGroup = $('#select-group').val();
    });

    $(document).on("pagebeforeshow", "#ListAll", function(event) {
        printAnimalList();
    });
        
    $(document).on("pagebeforeshow", "#details", function (event) {   
        let localID = document.getElementById("IDparmHere").innerHTML;
        let arrayPointer = GetArrayPointer(localID);
        document.getElementById("oneName").innerHTML = "The Animal: " + animalArray[arrayPointer].name;
        document.getElementById("oneColor").innerHTML = "Animal Color: " + animalArray[arrayPointer].color;
        document.getElementById("oneGroup").innerHTML = "Animal Group: " + animalArray[arrayPointer].group;
        document.getElementById("oneFluffiness").innerHTML = "Fluffiness Rating: " + animalArray[arrayPointer].fluffiness;
    });
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
        // clear prior data
        var divMovieList = document.getElementById("divMovieList");
        while (divMovieList.firstChild) {    // remove old data to cycle through only newly added data
            divMovieList.removeChild(divMovieList.firstChild);
        };
    
        var ul = document.createElement('ul');
    
        animalArray.forEach(function (element,) {   
            var li = document.createElement('li');
            li.classList.add('oneMovie'); 
            li.setAttribute("data-parm", element.name);
            li.innerHTML = element.getAll();
            ul.appendChild(li);
        });
        divMovieList.appendChild(ul)
     
        var liArray = document.getElementsByClassName("oneMovie");
        Array.from(liArray).forEach(function (element) {
            element.addEventListener('click', function () {
            var parm = this.getAttribute("data-parm"); 
            document.getElementById("IDparmHere").innerHTML = parm;
            console.log(parm);
            document.location.href = "index.html#details";
            });
        });
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
function GetArrayPointer(localID) {
    for (let i = 0; i < animalArray.length; i++) {
        if (localID === animalArray[i].name) {
            return i;
        }
    }
}



