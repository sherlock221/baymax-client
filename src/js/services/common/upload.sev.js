Baymax
    .factory("UploadSev", function (Upload,SERVER) {
        return {
            upload : function(file){
                return  Upload.upload({
                    url:  SERVER.url.file+"/upload/savefile.shtml", // upload.php script, node.js route, or servlet url
                    method: 'POST',
                    file: file,
                    headers: {'is-mutile-data': "1"},
                    data : {
                    }
                    //fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
                    //fileFormDataName: file // file formData name ('Content-Disposition'), server side request form name
                    // could be a list of names for multiple files (html5). Default is 'file'
                    //formDataAppender: function(formData, key, val){}  // customize how data is added to the formData.
                    // See #40#issuecomment-28612000 for sample code
                });
            }
        }
    });

