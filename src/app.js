const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const app = express();
const PORT = 8080;

app.use(bodyParser.urlencoded({ extended: false }));
const server = http.createServer(app);

const accountRouter = require("./router/chat-router");
const helloworldRouter = require("./router/user-router");

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

app.use("/account", accountRouter);
app.use("/helloworld", helloworldRouter);