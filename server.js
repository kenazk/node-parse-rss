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
  res.write("<html>\n<head>\n<title>Moravian Daily Text</title>\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" />" +css +"</head>\n<body>");

  // loop through our list of RSS feed urls
  for (var j = 0; j < urls.length; j++) {

    // fetch rss feed for the url:
    feed(urls[j], function(err, articles) {

      // loop through the list of articles returned
      for (var i = 0; i < articles.length; i++) {

        // stream article title (and what ever else you want) to client
        displayArticle(res, articles[i]);

        // check we have reached the end of our list of articles & urls
        if( i === articles.length-1 && j === urls.length-1) {
          res.end("</body>\n</html>"); // end http response
        } // else still have rss urls to check
      } //  end inner for loop
    }); // end call to feed (feed-read) method
  } // end urls for loop

  setTimeout(function() {
    res.end("</body>\n</html>"); // end http response
  }, 4000);

}).listen(port);
console.log("HTTP Listening on: http://localhost:"+port);

// a mini-rendering function - you can expand this or add html markup
function displayArticle(res, a) {
  // send the article content to client
  res.write('<div id="article">')
  res.write("<h3>"+a.title +"</h3>");
  res.write("<p>"+a.content+"</p> </div>\n");
}
