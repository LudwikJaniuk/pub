console.log("Hello world")

function tellTime() {
  console.log("It is now: " + new Date().toISOString())
}

setTimeout(tellTime, 500);
setInterval(tellTime, 1000);
