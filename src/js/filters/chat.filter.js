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