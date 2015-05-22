
var fs = require('fs');
var url = require('url');
var http = require('http');
var exec = require('child_process').exec;

Baymax.service("FileSev",function($q){

    var  FileSev  = {
        download : function(obj,downloadBack,endBack){
            var file_url = obj.fileUrl;
            var DOWNLOAD_DIR = obj.downloadDir;

            //检测文件夹是否存在
            var folder_exists = fs.existsSync(DOWNLOAD_DIR);
            if(!folder_exists){
                fs.mkdirSync(DOWNLOAD_DIR);
            }

            var download_file_httpget = function(file_url) {
                var options = {
                    host: url.parse(file_url).host,
                    port: 80,
                    path: url.parse(file_url).pathname
                };
                var file_name = url.parse(file_url).pathname.split('/').pop();
                var file = fs.createWriteStream(DOWNLOAD_DIR + file_name);
                http.get(options, function(res) {
                    res.on('data', function(data) {
                        file.write(data);
                        downloadBack(data);
                    }).on('end', function() {
                        file.end();
                        console.log(file_name + ' download to ' + DOWNLOAD_DIR);
                        endBack(DOWNLOAD_DIR+file_name);
                    });
                });
            };

            //http 下载文件
            download_file_httpget(file_url);
        },

        iseExist : function(path,dir){
            var defer = $q.defer();
          fs.exists(dir+path,function(exists){
                defer.resolve(exists);
          });
            return defer.promise;
        }
    }


    return  FileSev;


});





