Baymax.filter("userHead", function() {
    var fun = function(attribute) {
        if(!attribute || !attribute.userInfo.userIcon){
            return "imgs/user-default.png";
        }

        else{
            return attribute.userInfo.userIcon;
        }
    };
    return fun;
});


Baymax.filter('trustHtml', function ($sce) {

    return function (input) {

        return $sce.trustAsHtml(input);

    }
});

Baymax.filter('trustRes', function ($sce) {

    return function (input) {
        return $sce.trustAsResourceUrl(input);

    }
});



Baymax.filter('emojiRender', function (EmojiConstants) {
    var patt = /\[[^\]]+\]/g;
    return function (message) {
        var c = message.match(patt);
        if(c){
            for(var i=0;i< c.length;i++){
                var obj = EmojiConstants.findByKey(c[i]);
                if(obj){
                    var img =  "<img src=\""+obj.value+"\" class=\"emoji-img\"  data=\""+encodeURI(obj.key)+"\" />";
                    message = message.replace(obj.key,img);
                }
            }
        }
        console.log("替换完成:",message);
        return message;
    }
});