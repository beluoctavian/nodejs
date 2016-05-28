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

                news = data2.children('p').text();
                news_list.push(news);

            })
        });

        var options = {
            path: '/users/news/create',
            method: 'POST',
            headers: headers,
            form: {'title': title, 'category': category, 'content': news_list}
        }

        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var encoding = response.headers['content-encoding']
                if(encoding && encoding.indexOf('gzip')>=0) {
                    body = uncompress(body);
                }
                body = body.toString('utf-8');

                var json_body = JSON.parse(body);
            }
        })
    })
});
