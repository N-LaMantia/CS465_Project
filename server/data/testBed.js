
switch(argv[2]) {
  case "seed":
    require("./dbSetup.js").seed();
    break;
  case "clear":
    require("./dbSetup.js").clear();
    break;
  case "test":
    require("./dbSetup.js").test();
    break;
  default:
