const express = require('express');
const expressWs = require('express-ws');
const path = require('path');
const app = express();
const port = 8000;
expressWs(app);

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'public')));

router.get("/", (req, res) => {
    res.send("Hello chat");
});

module.exports = router;