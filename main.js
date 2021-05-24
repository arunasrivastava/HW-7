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

    document.getElementById("buttonSortName").addEventListener("click", function() {
        animalArray.sort(dynamicSort("name"));
        printAnimalList();
        document.location.href = "index.html#ListAll";
    });
    document.getElementById("buttonSubsetReptiles").addEventListener("click", function () {
        printAnimalList();
        printAnimalListSubset("Reptile");  // recreate li list after removing one
    });
    document.getElementById("buttonSubsetMammals").addEventListener("click", function () {
        printAnimalListSubset("Mammal");  // recreate li list after removing one 
    });
    document.getElementById("buttonSubsetBirds").addEventListener("click", function () {
        printAnimalListSubset("Bird");  // recreate li list after removing one
    });
    document.getElementById("buttonSubsetFish").addEventListener("click", function () {
       
        printAnimalListSubset("Fish");  // recreate li list after removing one  // go back to movie list 
    });
    document.getElementById("buttonSubsetAmphibians").addEventListener("click", function () {
       printAnimalListSubset("Amphibian");  // recreate li list after removing one
          // go back to movie list 
    });
     document.getElementById("buttonSubsetInsects").addEventListener("click", function () {
        printAnimalListSubset("Insect");  // recreate li list after removing one // go back to movie list 
    });

    $(document).on("pagebeforeshow", "#ListAll", function(event) {
        printAnimalList();
    });
    $(document).on("pagebeforeshow", "#page4", function (event) {   // have to use jQuery 
        // clear prior data
        var divAnimalList = document.getElementById("divAnimalListSubset");
        while (divAnimalList.firstChild) {    // remove any old data so don't get duplicates
            divAnimalList.removeChild(divAnimalList.firstChild);
        };
    });
    $(document).on("pagebeforeshow", "#details", function (event) {   
        let localID = document.getElementById("IDparmHere").innerHTML;
        let arrayPointer = GetArrayPointer(localID);
        document.getElementById("oneName").innerHTML = "The Animal: " + animalArray[arrayPointer].name;
        document.getElementById("oneColor").innerHTML = "Animal Color: " + animalArray[arrayPointer].color;
        document.getElementById("oneGroup").innerHTML = "Animal Group: " + animalArray[arrayPointer].group;
        document.getElementById("oneFluffiness").innerHTML = "Fluffiness Rating: " + animalArray[arrayPointer].fluffiness;
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
        var divAnimalList = document.getElementById("divAnimalList");
        while (divAnimalList.firstChild) {    
            divAnimalList.removeChild(divAnimalList.firstChild);
        };
    
        var ul = document.createElement('ul');
    
        animalArray.forEach(function (element,) {   
            var li = document.createElement('li');
            li.classList.add('oneAnimal'); 
            li.setAttribute("data-parm", element.name);
            li.innerHTML = element.getAll();
            ul.appendChild(li);
        });
        divAnimalList.appendChild(ul)
     
        var liArray = document.getElementsByClassName("oneAnimal");
        Array.from(liArray).forEach(function (element) {
            element.addEventListener('click', function () {
            var parm = this.getAttribute("data-parm"); 
            document.getElementById("IDparmHere").innerHTML = parm;
            document.location.href = "index.html#details";
            });
        });
  };
  
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

function printAnimalListSubset(whichType) {
  
  let divAnimalList = document.getElementById("divAnimalListSubset");
  while (divAnimalList.firstChild) {
    divAnimalList.removeChild(divAnimalList.firstChild);
  };
    
    let ul = document.createElement('ul');
    animalArray.forEach(function (element) {
        if (element.group === whichType) {
            let li = document.createElement('li');
            li.classList.add('oneAnimal');
            li.setAttribute("data-parm", element.name);
            li.innerHTML = element.name + "  " + element.group;
            ul.appendChild(li);
        }
    });
    divAnimalList.appendChild(ul)
    var liArray = document.getElementsByClassName("oneAnimal");
    Array.from(liArray).forEach(function (element) {
        element.addEventListener('click', function () {
            // get that data-parm we added for THIS particular li as we loop thru them
            var parm = this.getAttribute("data-parm");  // passing in the record.Id
            // get our hidden <p> and write THIS ID value there
            document.getElementById("IDparmHere").innerHTML = parm;
            // now jump to our page that will use that one item
            document.location.href = "index.html#details";
        });
    });


};

