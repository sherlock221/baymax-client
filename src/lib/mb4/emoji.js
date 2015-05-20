Baymax.constant("EmojiConstants",{
    object : [
        {"value":"lib/mb4/icons/ee_1.png","key": "[):]"},
        {"value":"lib/mb4/icons/ee_2.png","key": "[:D]"},
        {"value":"lib/mb4/icons/ee_3.png","key": "[;)]"},
        {"value":"lib/mb4/icons/ee_4.png","key": "[:-o]"},
        {"value":"lib/mb4/icons/ee_5.png","key": "[:p]"},
        {"value":"lib/mb4/icons/ee_6.png","key": "[(H)]"},
        {"value":"lib/mb4/icons/ee_7.png","key": "[:@]"},
        {"value":"lib/mb4/icons/ee_8.png","key": "[:s]"},
        {"value":"lib/mb4/icons/ee_9.png","key": "[:$]"},
        {"value":"lib/mb4/icons/ee_10.png","key": "[:(]"},
        {"value":"lib/mb4/icons/ee_11.png","key": "[:'(]"},
        {"value":"lib/mb4/icons/ee_12.png","key": "[:|]"},
        {"value":"lib/mb4/icons/ee_13.png","key": "[(a)]"},
        {"value":"lib/mb4/icons/ee_14.png","key": "[8o|]"},
        {"value":"lib/mb4/icons/ee_15.png","key": "[8-|]"},
        {"value":"lib/mb4/icons/ee_16.png","key": "[+o(]"},
        {"value":"lib/mb4/icons/ee_17.png","key": "[<o)]"},
        {"value":"lib/mb4/icons/ee_18.png","key": "[|-)]"},
        {"value":"lib/mb4/icons/ee_19.png","key": "[*-)]"},
        {"value":"lib/mb4/icons/ee_20.png","key": "[:-#]"},
        {"value":"lib/mb4/icons/ee_21.png","key": "[:-*]"},
        {"value":"lib/mb4/icons/ee_22.png","key": "[^o)]"},
        {"value":"lib/mb4/icons/ee_23.png","key": "[8-)]"},
        {"value":"lib/mb4/icons/ee_24.png","key": "[(|)]"},
        {"value":"lib/mb4/icons/ee_25.png","key": "[(u)]"},
        {"value":"lib/mb4/icons/ee_26.png","key": "[(S)]"},
        {"value":"lib/mb4/icons/ee_27.png","key": "[(*)]"},
        {"value":"lib/mb4/icons/ee_28.png","key": "[(#)]"},
        {"value":"lib/mb4/icons/ee_29.png","key": "[(R)]"},
        {"value":"lib/mb4/icons/ee_30.png","key": "[({)]"},
        {"value":"lib/mb4/icons/ee_31.png","key": "[(})]"},
        {"value":"lib/mb4/icons/ee_32.png","key": "[(k)]"},
        {"value":"lib/mb4/icons/ee_33.png","key": "[(F)]"},
        {"value":"lib/mb4/icons/ee_34.png","key": "[(W)]"},
        {"value":"lib/mb4/icons/ee_35.png","key": "[(D)]"}
    ],
    value : "",


    findByKey : function(key){
        for(var i=0;i<this.object.length;i++){
            var obj = this.object[i];
            if(obj.key == key){
                return obj;
            }
        }

        return null;
    }
});


//String.prototype.replaceAll = function(s1,s2){
//    return this.replace(new RegExp(s1,"gm"),s2);
//}


//var str = "[:abc][:ccd][:xae]";
//var temp =  str.replaceAll("111",/\[\:abc\]/);
//console.log(temp);