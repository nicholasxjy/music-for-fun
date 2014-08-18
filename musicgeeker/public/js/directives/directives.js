angular.module('mGeek.directives', [])
    .directive('mgTooltip', function() {
        return {
            link: function(scope, element, attrs) {
                $(element).tooltip();
            }
        }
    })