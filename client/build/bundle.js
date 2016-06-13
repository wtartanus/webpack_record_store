/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Store = __webpack_require__(1);
	var Record = __webpack_require__(2);
	var sampleRecords = __webpack_require__(3);
	var StoreView = __webpack_require__(4);
	
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

/***/ },
/* 1 */
/***/ function(module, exports) {

	var Store = function (name, city, balance) {
	  this.name = name;
	  this.city = city;
	  this.balance = balance;
	  this.inventory = [];
	};
	
	Store.prototype = {
	  add: function(record) {
	    this.inventory.push(record);
	  },
	
	  inventoryPrint: function () {
	    var list = [];
	    for (var i = 0; i < this.inventory.length; i++) {
	      list.push(this.inventory[i] );
	    }
	    return list;
	  },
	
	  addBalance: function (record) {
	        this.balance += record.price;
	
	  },
	
	  delete: function (name,title) {
	    var result;
	    for (var i = 0; i < this.inventory.length; i++) {
	      if(this.inventory[i].name === name && this.inventory[i].title === title ) {
	         result = this.inventory.splice(i,1);
	
	      }
	    }
	    return result;
	  },
	
	  sell: function (record,customer) {
	
	    var result = this.delete(record);
	    this.addBalance(result[0]);
	    customer.inventory.push(result[0]);
	    customer.balance -= result[0].price;
	  },
	
	  total: function () {
	    var totalValue = 0;
	    for (var i = 0; i < this.inventory.length; i++) {
	      totalValue += this.inventory[i].price;
	    }
	    var string = "Balance: " + this.balance + ", Stock Value: " + totalValue;
	    return string;
	  },
	
	  decreaseBalance: function (record) {
	    this.balance -= record.price;
	  },
	
	  buy: function (record) {
	    this.decreaseBalance(record);
	    this.add(record);
	  }
	
	
	
	};
	
	
	module.exports = Store;


/***/ },
/* 2 */
/***/ function(module, exports) {

	var Record = function (record) {
	  this.name = record.name;
	  this.title = record.title;
	  this.price = record.price;
	};
	
	module.exports = Record;


/***/ },
/* 3 */
/***/ function(module, exports) {

	
	
	module.exports = [
	  {
	    "name": "Rihanna",
	    "title": "Diamonds",
	    "price": 10
	  },
	  {
	    "name": "Eminem",
	    "title": "Marshall",
	    "price": 12
	  },
	  {
	    "name": "Shakira",
	    "title": "Wolf",
	    "price": 9
	  },
	  {
	    "name": "Britney",
	    "title": "Lolipop",
	    "price": 7
	  },
	  {
	    "name": "Kid Rock",
	    "title": "Drums",
	    "price": 10
	  }
	]
	


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Record = __webpack_require__(2);
	
	
	var StoreView = function(store) {
	  this.store = store;
	}
	
	StoreView.prototype = {
	  render: function() {
	    var nameHeading = document.getElementById("name");
	    var cityHeading = document.getElementById("city");
	    nameHeading.innerText = this.store.name;
	    cityHeading.innerText = this.store.city;
	
	    
	
	    var inventroyUl = document.getElementById("inventory-list");
	
	    for(record of this.store.inventory) {
	      var li = document.createElement("li");
	      li.id = record.title;
	      li.innerText = record.name + " -- " + record.title + " £" + record.price;
	      inventroyUl.appendChild(li);
	    }
	  },
	  sellRecord: function() {
	    var artist = document.getElementsByClassName('buy-input')[0].value;
	    var title = document.getElementsByClassName('buy-input')[1].value;
	    this.store.delete(artist, title);
	    var li = document.getElementById(title);
	    var ul = document.getElementById("inventory-list");
	    console.log(li);
	    ul.removeChild(li);
	    localStorage.removeItem("storedRecords");
	    localStorage.setItem("storedRecords",JSON.stringify(this.store.inventory));
	  },
	  addRecord: function() {
	    var artist = document.getElementsByClassName('add-input')[0].value;
	    var title = document.getElementsByClassName('add-input')[1].value;
	    var price = document.getElementsByClassName('add-input')[2].value;
	    var record = {name: artist, title: title, price: price}
	      this.store.add(new Record( record ));
	      console.log(this.store.inventory);
	    var ul = document.getElementById("inventory-list");
	    var li = document.createElement("li");
	    li.id = title;
	    li.innerText = artist + " -- " + title + " £" + price;
	    ul.appendChild(li);
	    localStorage.removeItem("storedRecords");
	    console.log(this.store.inventory);
	    localStorage.setItem("storedRecords",JSON.stringify(this.store.inventory));
	  }
	};
	
	module.exports = StoreView;
	
	
	
	
	
	
	
	
	
	


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map