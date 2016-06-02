/**
 * Created by tsned on 5/31/16.
 */
'use strict';
angular.module('ngStarRating', [])
    .directive('starRating', function () { // this is our read-only rating
        return {
            scope: { starValue: '=ngModel' },
            require: 'ngModel',
            restrict: 'E',
            template: '<div class="star-rating">' +
                      '  <i ng-repeat="star in stars track by $index" class="material-icons" ng-bind="stars[$index]"></i>' +
                      '</div>',
            link: function (scope, element, attr) {
                var max = attr.max || 5;

                scope.stars = [];
                for (var i = 0; i < max; i++) {
                    scope.stars.push('star_border');
                }

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
            }
        }
    }).directive('starRater', ['$timeout', function($timeout) { // this is our 'writable' rater
        return {
            scope: { func: '=rateAction' },
            restrict: 'E',
            template: '<div class="star-rater">' +
                      '  <i ng-repeat="star in stars track by $index" class="material-icons" ng-mouseenter="starMouseenter($index)" ng-mouseleave="starMouseleave()" ng-click="starClicked($index)" ng-bind="stars[$index]"></i>' +
                      '</div>',
            link: function (scope, element, attr) {
                var max = attr.max || 5;
                var selected = false;

                scope.stars = [];
                for (var i = 0; i < max; i++) {
                    scope.stars.push('star_border');
                }

                scope.starMouseenter = function (ix) {
                    if (selected) return;
                    for (var j = 0; j <= ix; j++) {
                        scope.stars[j] = 'star';
                    }
                };

                scope.starMouseleave = function () {
                    if (selected) return;
                    for (var j = 0; j < max; j++) {
                        scope.stars[j] = 'star_border';
                    }
                };

                scope.starClicked = function (ix) {
                    if (selected) return;
                    $timeout(function () {
                        scope.func.call(this, ix + 1);
                    }, 0, false);

                    selected = true;
                }
            }
        }
    }]);
