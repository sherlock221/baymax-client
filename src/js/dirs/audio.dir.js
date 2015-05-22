Baymax.directive('audioCus', function($timeout, $parse) {
    return {

        restrict : "AE",
        transclude : true,
        template : '<audio src=""  controls ></audio>',
        scope : {
            "auto" : "=auto",
            "url" : "=url"
        },
        link: function(scope, element, attrs) {
            element[0].src = scope.url;
            element[0].auto = scope.auto;
            scope.$watch("auto", function(value) {
                if(value == true) {
                    element.attr("autopaly","autoplay")
                }
                else{
                    $timeout(function() {
                        element.removeAttr("autopaly");
                    });
                }
            });
        }
    };
});