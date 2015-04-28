// show the given page, hide the rest
function show(elementID) {
    // try to find the requested page and alert if it's not found
    var ele = document.getElementById(elementID);
    if (!ele) {
        alert("no such element");
        return; 
    }
    console.log(ele);
    // get all pages, loop through them and hide them
    var pages = document.getElementsByClassName('superman');
    for(var i = 0; i < pages.length; i++) {
        pages[i].style.display = 'none';
    }

    // then show the requested page
    ele.style.display = 'block';
//                var children = $($(ele).find('.page')).css('display','block');
}

$(document).ready(function() {
    $(".item").hover(
        function(){
            //what to do on hover
            $($(this).children()).css('display', 'block')

        },
        function(){
            $($(this).children()).css('display', 'none')

        });

    makeDraggableHandle("listContainer1", "handleList");
    makeDraggableHandle("listContainer2", "handleList");
});



function getProblem(problemID){
  console.log("getProblem");
  // creates json object to send to server
  var problem = {
      type: "problemRequest",
      problemID: problemID
      // !!!!!!! ANYTHING WITH A '$' IS JQUERY. THIS IS JQUERY
    };
  // talks to server
  // first argument: port,
  // second: data to send over,
  // third: function that specifies what to do with the data that is recieved
  $.get(location.origin, problem, function(recieved_data){
      // prints the data recieved on the console.
      // in your browser, click "View" --> "Developer" --> "javaScript Console" to see the console
      console.log(recieved_data[2].problem);
      // puts the relevant data into the on street textbox
      //document.getElementById('onStreet').value = recieved_data.on_street;
    });
    // reset textbox value
    //routeInput.value = "";
}
    
function saveTableValue(){
  // DATA THAT NEEDS TO BE SAVED
  var save_data = {
    type: 'save_question',
    problemID: 4,
  }
  // COMMAND TO POST DATA TO URL. 

  $.ajax({
    type: "POST",
    url: location.origin,
    data: save_data,
    // FUNCTION THAT EXECUTES WHEN THE POST IS SUCCESSFUL
    success: function success(response){
      console.log(response);
    }
  })  
}

function makeDraggableHandle(listName,groupName){
  var el = document.getElementById(listName);
  // console.log(listName);
  Sortable.create(el, {
    group: groupName,
    handle: '.glyphicon-move',
    animation: 150,
    // store: {
    //   get: function(sortable){
    //     var order = sessionStorage.getItem(sortable.options.group);
    //     return order ? order.split('|') : [];
    //   },
    //   set: function(sortable){
    //     var order = sortable.toArray();
    //     sessionStorage.setItem(listName, order.join('|'));
    //     // console.log(modifiedList);
    //   }
    // },
  })
}

function getQueryParams(key) {
  var qs = document.location.search;
  qs = qs.split("+").join(" ");

  var params = {}, tokens,
      re = /[?&]?([^=]+)=([^&]*)/g;

  while (tokens = re.exec(qs)) {
      params[decodeURIComponent(tokens[1])]
          = decodeURIComponent(tokens[2]);
  }

  return params[key];
}

      function makeHeader(doc, origFontSize){
        doc.setFontSize(20);
        doc.text(70,30, "Algebra Worksheet 2");
        doc.setFontSize(origFontSize)

      }

      function makePDF(){
         var doc = new jsPDF();
         var fontSize = 12;
         doc.setFontSize(fontSize);
         console.log(sessionStorage.getItem('listContainer2'));
         console.log($('#listContainer2').children());
         // var custWorksheet = sessionStorage.getItem('listContainer2').split('|');
         var custWorksheet = $('#listContainer2').children();

         // var item = document.getElementById('q1');
         // console.log(item.innerText);
         console.log(custWorksheet[1]);

         var offset = 0
         makeHeader(doc, fontSize);
         for (i = 0; i < custWorksheet.length; i++){
           var text = custWorksheet[i].innerText;
           var splitTitle = doc.splitTextToSize(text, 180);

           doc.text(15, 40+25*(i+offset), "Problem"+(i+1));

           doc.text(15, 50+25*(i+offset), splitTitle);
           if (splitTitle.length > 1){
             var offset = offset + splitTitle.length - 1 ;
           }
           // doc.text(20,, text);
         }
         // doc.text(20,20, "hello!!!");
         doc.save('Test.pdf');
       }

       function makeDraggableHandle(listName,groupName){

           var el = document.getElementById(listName);
           console.log(listName);
           Sortable.create(el, {
             group: groupName,
             // handle: '.glyphicon-move',
             animation: 150,
             store: {
               get: function(sortable){
                 var order = sessionStorage.getItem(sortable.options.group);
                 return order ? order.split('|') : [];
               },
               set: function(sortable){
                 var order = sortable.toArray();
                 sessionStorage.setItem(listName, order.join('|'));
                 // console.log(modifiedList);
                 console.log(sessionStorage.getItem(listName));
               }
             },
           })
           // console.log(sessionStorage.getItem(listName));
           console.log(listName);
         }