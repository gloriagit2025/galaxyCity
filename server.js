const http = require("http");
const fs = require("fs");
const url = require("url");
const querystring = require("querystring");
let server = http.createServer(function OnRequest(req, res) {
  //如果頁面是主頁面/且請求方法是GET就傳回index.html頁面
  if (req.url === "/" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.createReadStream(__dirname + "/index.html").pipe(res);//將index.html檔案流傳回給用戶
  }
});
server.listen(3000, "0.0.0.0");
console.log("Open at port 3000");
