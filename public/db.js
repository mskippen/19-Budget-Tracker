// IndexedDB
(window.indexedDB =
  window.indexedDB ||
  window.webkitIndexedDB ||
  window.mozIndexedDB ||
  window.OIndexedDB ||
  window.msIndexedDB),
  (IDBTransaction =
    window.IDBTransaction ||
    window.webkitIDBTransaction ||
    window.OIDBTransaction ||
    window.msIDBTransaction),
  (dbVersion = 1);

/* 
    Note: The recommended way to do this is assigning it to window.indexedDB,
    to avoid potential issues in the global scope when web browsers start 
    removing prefixes in their implementations.
    You can assign it to a varible, like var indexedDB… but then you have 
    to make sure that the code is contained within a function.
*/

let db;

// Create/open database
var request = indexedDB.open("budgetDb", dbVersion);


// For future use. Currently only in latest Firefox versions
request.onupgradeneeded = function (event) {
  const db = event.target.result;
  db.createObjectStore("budget", { autoIncrement: true });
};

request.onsuccess = function (event) {
  console.log("Success creating/accessing IndexedDB database");
  db = request.result;
  if(navigator.online) {
    addToDatabase()
  } else {
    addToDatabase()
    console.log("You are offline")
  }

  db.onerror = function (event) {
    console.log("Error creating/accessing IndexedDB database");
  };
};


function saveRecord(record) {
    const transaction = db.transaction(["budget"], `readwrite`);

    const store = transaction.objectStore("budget");

    store.add(record);

    console.log(store, "store")
}

function addToDatabase() {
    const transaction = db.transaction(["budget"], "readwrite");

    const store = transaction.objectStore("budget");
    const data = store.getAll()
    console.log(data)

    fetch("/api/transaction/bulk", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => {
      console.log(response)
    })
}


window.addEventListener(`online`, addToDatabase)