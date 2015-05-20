Baymax.directive('focusMe', function($timeout, $parse) {
    return {
        scope : {
          "focus" : "=focus"
        },
        link: function(scope, element, attrs) {
            scope.$watch("focus", function(value) {
                if(value == true) {
                    $timeout(function() {
                        element[0].focus();
                    });
                }
                else{
                    $timeout(function() {
                        element[0].blur();
                    });
                }
            });
            // to address @blesh's comment, set attribute value to 'false'
            // on blur event:
            //element.bind('blur', function() {
            //    console.log('blur');
            //    scope.$apply(model.assign(scope, false));
            //});
        }
    };
});