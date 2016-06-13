var Store = require("./record_store/record_store.js");
var Record = require("./record_store/record.js");
var sampleRecords = require("./sample.json");
var StoreView = require("./record_store/store_view.js");

window.onload = function() {
  console.log("app started");
  var store = new Store("Music4U", "Edinburg", 100);

  var records = JSON.parse(localStorage.getItem('storedRecords')) || sampleRecords;
  console.log(records);

  for(record of records) {
    store.add(new Record(record));
  };

  
  var displayStore = new StoreView(store);


  displayStore.render();
  var addForm = document.getElementById("add-form");
   addForm.onsubmit = function(event) {
    event.preventDefault();
    displayStore.addRecord();
  }

  var buyForm = document.getElementById("buy-form");
   buyForm.onsubmit = function(event) {
    event.preventDefault();
    displayStore.sellRecord();
  }
  
}