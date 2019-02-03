const http = require("http");
const userService = require("./user-service");
const utils = require("./utils");
const hostname = "127.0.0.1";
const port = 3001;

//TODO: Make sure this function is invoked only when GET /api/users...
function handleGetUserRequest(req, res) {
  if (req.url === "/api/users") {
    // 3rd case - no criteria was specified and also no entity id -- return all
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(userService.getAllUsers()));
    return;
  }

  // Filter by criteria
  if (req.url.indexOf("?") > -1) {
    const reqParams = utils.extractGetReqParams(req);
    const selectedKey = Object.keys(reqParams)[0];
    const currentUser = userService.getUserBy(
      selectedKey,
      reqParams[selectedKey]
    );

    res.statusCode = 200;
    res.end(JSON.stringify(currentUser));
    return;
  }

  //Criteria was not found in req body. try to use entity id
  try {
    const reqUserId = utils.extractReqEntityId(req);
    const currentUser = userService.getUserByID(reqUserId);
    res.statusCode = 200;
    res.end(JSON.stringify(currentUser));
  } catch (e) {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(e));
    return;
  }
}

//TODO: Create a new function that will handle new user POST request
//TODO: Validate that no other users has the same email - if same email was found in db, make the client know about the reason for the failure
//TODO: Create a new user in the database
//TODO: Return the newly created user instance(with the unique id)
const server = http.createServer((req, res) => {
  //TODO: specific handling for GET /api/users/...
  //TODO: specific handling for POST /api/users/...

  //TODO: If no specific handling was found (/api/posts) then -- 404
  //TODO: Bonus -- added proper exceptions and exception handling
  try {
    handleGetUserRequest(req, res);
  } catch (e) {
    res.statusCode = e.statusCode;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ err: e.message }));
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
////
