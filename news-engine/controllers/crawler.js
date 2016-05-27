var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');

var webpage = "http://www.news.ro";

var links = [];
var titles = [];
var news_list = [];

request(webpage, function(error, response, body) {

    if(response.statusCode === 200) {

        var $ = cheerio.load(body);

        $('.container-img').each(function(){

            var data = $(this);

            var link = data.children.first().attr('href');
            links.push('http://www.news.ro' + link);

            var title = data.children.first().attr('title');
            titles.push(title);

            var webpage2 = 'http://www.news.ro' + link;

            request(webpage2, function(error, response, body) {

                if(response.statusCode === 200) {

                    var $2 = cheerio.load(body);

                    $2('.article-content').filter(function(){

                        var data2 = $(this);

                        var news = data2.children('p');
                        news_list.push(news);

                    })
                }
            });
        })
    }
});
