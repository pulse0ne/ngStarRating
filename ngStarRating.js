/**
 * Created by tsned on 5/31/16.
 */
'use strict';
angular.module('ngStarRating', [])
    .directive('starRating', ['$timeout', function ($timeout) {
        return {
            scope: {
                starValue: '=ngModel',
                func: '=rateAction'
            },
            restrict: 'E',
            template: '<div class="star-rating">' +
            '  <i ng-repeat="star in stars track by $index" class="material-icons" ng-mouseenter="starMouseenter($index)" ng-mouseleave="starMouseleave()" ng-click="starClicked($index)" ng-bind="stars[$index]"></i>' +
            '</div>',
            link: function (scope, element, attr) {
                var max = attr.max || 5;
                var readOnly = attr.readOnly || false;
                var selected = false;

                scope.stars = [];
                for (var i = 0; i < max; i++) {
                    scope.stars.push('star_border');
                }

                if (readOnly) {
                    scope.$watch(function () {
                        return scope.starValue;
                    }, function (newVal) {
                        var val = Math.min(newVal, max);
                        var filled = Math.trunc(val);
                        var frac = val - filled;

                        for (var i = 0; i < filled; i++) {
                            scope.stars[i] = 'star';
                        }

                        if (frac > 0.6) {
                            scope.stars[filled] = 'star';
                        } else if (frac > 0.3) {
                            scope.stars[filled] = 'star_half';
                        } else {
                            if (filled < max) {
                                scope.stars[filled] = 'star_border';
                            }
                        }

                        for (var j = filled + 1; j < max; j++) {
                            scope.stars[j] = 'star_border';
                        }
                    });
                } else {
                    scope.starMouseenter = function (ix) {
                        if (readOnly || selected) return;
                        for (var j = 0; j <= ix; j++) {
                            scope.stars[j] = 'star';
                        }
                    };

                    scope.starMouseleave = function () {
                        if (readOnly || selected) return;
                        for (var j = 0; j < max; j++) {
                            scope.stars[j] = 'star_border';
                        }
                    };

                    scope.starClicked = function (ix) {
                        if (readOnly || selected) return;
                        $timeout(function () {
                            scope.func.call(this, ix + 1);
                        }, 0, false);

                        selected = true;
                    }
                }
            }
        }
    }]);
