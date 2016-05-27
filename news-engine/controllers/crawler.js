var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');

var webpage = "http://www.news.ro";

request(webpage, function(error, response, body) {

    if(response.statusCode === 200) {

        var $ = cheerio.load(body);

        var links = [];
        var titles = [];

        $('.container-img').each(function(){

            var data = $(this);

            var link = data.children.first().attr('href');
            links.push('http://www.news.ro' + link);

            var title = data.children.first().attr('title');
            titles.push(title);
        })
    }
});
