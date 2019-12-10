const fs = require('fs');

exports.index = function(req, res) {
    res.set('Content-Type', 'text/html');
    const content = fs.readFileSync("client/fragments/index.html", "utf-8");
    res.send(content);
};

exports.indexPage = function(req, res) {
    res.set('Content-Type', 'text/html');
    const htmlContent = fs.readFileSync("client/fragments/map.html", "utf-8");
    res.send(htmlContent);
}