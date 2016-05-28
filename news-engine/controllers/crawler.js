var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');

var webpage = "http://www.news.ro";

var links = [];
var categories = [];
var titles = [];
var news_list = [];

request(webpage, function(error, response, body) {

    var $ = cheerio.load(body);

    $('.container-img').each(function() {

        var data = $(this);

        var link = data.children().first().attr('href');
        links.push('http://www.news.ro' + link);

        var index = 1;
        var category = '';
        while (link[index] != '/') {
            category = category + link[index];
            index = index + 1;
        }
        categories.push(category);

        var title = data.children().first().attr('title');
        titles.push(title);

        var webpage2 = 'http://www.news.ro' + link;

        request(webpage2, function(error, response, body) {

            var $2 = cheerio.load(body);

            $2('.article-content').filter(function(){

                var data2 = $(this);

                var news = data2.children('p').text();
                news_list.push(news);

            })
        });
    })
});
