var feed = require('feed-read'),  // require the feed-read module
    http = require("http"),
    port = process.env.PORT || 5000, // allow heroku/nodejitsu to set port
    urls = [
        "http://fetchrss.com/rss/58191cb88a93f87f4ee0dfdd22358496719.atom"
    ]; // Example RSS Feeds

// load css styles
var css = '<link rel="stylesheet" href="//fonts.googleapis.com/css?family=Raleway"> ';
css = css + '<style type="text/css">' +require('fs').readFileSync('./style.css').toString() + '</style>'

http.createServer(function (req, res) {
  // send basic http headers to client
  res.writeHead(200, {
      "Content-Type": "text/html",
      "Transfer-Encoding": "chunked"
  });
  // setup simple html page:
  res.write("<html>\n<head>\n<title>Moravian Daily Text</title>\n<link href=\"https://fonts.googleapis.com/css?family=Open+Sans\" rel=\"stylesheet\"><meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" />" +css +"</head>\n<body>");



  setTimeout(function() {
    res.end("</body>\n</html>"); // end http response
  }, 4000);

}).listen(port);
console.log("HTTP Listening on: http://localhost:"+port);
