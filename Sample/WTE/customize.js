$(function() {
   var oldList, newList, item;
   $('.customizeSortable').sortable({
       start: function(event, ui) {
           item = ui.item;
           newList = oldList = ui.item.parent().parent();
       },
       stop: function(event, ui) {          
           alert("Moved " + item.text() + " from " + oldList.attr('id') + " to " + newList.attr('id'));
       },
       change: function(event, ui) {  
           if(ui.sender) newList = ui.placeholder.parent().parent();
       },
       connectWith: ".customizeSortable"
   }).disableSelection();
});