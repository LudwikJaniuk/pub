function readFromDatabase(callback) {
  function whenDone() {
    callback(null, "An amazingly awesome response");
  }

  // Pretend to take some time
  setTimeout(whenDone, 1000);
}

readFromDatabase((error, response) => {
  if (error) {
    console.log("We got an error: " + error);
    return;
  }

  console.log("Got this response:");
  console.log(response);
})

