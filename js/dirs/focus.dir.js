

Baymax.directive("isFocus", function () {
    return {
            restrict : "A",
            scope : {
            },
            link : function(scope,element,attr){
                var isFocus  = attr.isFocus;
                if(isFocus){
                    element.focus();
                }
                else{
                    element.blur();
                }

            }
        }
});