// JavaScript Document
var firstapp = angular.module('firstapp', [
    'ui.router',
    'phonecatControllers',
    'templateservicemod',
    'navigationservice'
]);

firstapp.config(function($stateProvider, $urlRouterProvider,$httpProvider) {
    
    // for http request with session
    $httpProvider.defaults.withCredentials = true;

    $stateProvider

    .state('home', {
        url: "/home",
        templateUrl: "views/template.html",
        controller: 'HomeCtrl'
    })

    .state('feature', {
        url: "/feature",
        templateUrl: "views/template.html",
        controller: 'FeatureCtrl'
    })

    $urlRouterProvider.otherwise("/home");

});


firstapp.directive('img', function($compile, $parse) {
    return {
        restrict: 'E',
        replace: false,
        link: function($scope, element, attrs) {
            var $element = $(element);
            if(!attrs.noloading)
            {
                $element.after("<img src='img/loading.gif' class='loading' />");
                var $loading = $element.next(".loading");
                $element.load(function() {
                    $loading.remove();
                    $(this).addClass("doneLoading");
                });
            }
            else
            {
                $($element).addClass("doneLoading");
            }
        }
    };
});

firstapp.directive('fullPage', fullPage);

  fullPage.$inject = ['$timeout', '$window'];

  function fullPage($timeout, $window) {
    var directive = {
      restrict: 'A',
      scope: {options: '='},
      link: link
    };

    return directive;

    function link(scope, element, attrs) {

      var initialized = false;
      var pageIndex;
      var slideIndex;

      var rebuild = function() {
        destroyFullPage();

        console.log('rebuilt');

        angular.element(element).fullpage(sanatizeOptions(scope.options));
      };

      var destroyFullPage = function() {
        if ($.fn.fullpage.destroy) {
          $.fn.fullpage.destroy('all');
        }
      };

      var sanatizeOptions = function(options) {
        options.onLeave = function(page, next){
          pageIndex = next;
        };

        options.onSlideLeave = function(anchorLink, page, slide, direction, next){
          pageIndex   = page;
          slideIndex  = next;
        };

        options.afterRender = function(){
          //We want to remove the HREF targets for navigation because they use hashbang
          //They still work without the hash though, so its all good.
          if (options && options.navigation) {
            $('#fp-nav').find('a').removeAttr('href');
          }

          if (pageIndex) {
            $timeout(function() {
              $.fn.fullpage.silentMoveTo(pageIndex, slideIndex);
            });
          }
        };

        //if we are using a ui-router, we need to be able to handle anchor clicks without 'href="#thing"'
        $(document).on('click', '[data-menuanchor]', function () {
          $.fn.fullpage.moveTo($(this).attr('data-menuanchor')); 
        });

        return options;
      };

      var watchNodes = function() {
        return element[0].getElementsByTagName('*').length;
      };

      scope.$watch(watchNodes, rebuild);

      scope.$watch('options', rebuild, true);

      element.on('$destroy', destroyFullPage);
    } 
  }
//
//firstapp.directive("minHeight", function($window) {
//    return function(scope, element, attrs) {
//        console.log(element);
//        var minheight = '';
//        var minheight = $(window).height();
//        console.log(minheight);
//        element.css({
//            "min-height": minheight + "px"
//        });
//    };
//});