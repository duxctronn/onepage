angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ngSanitize', 'angular-flexslider'])

.controller('HomeCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("home");
    $scope.menutitle = NavigationService.makeactive("Home");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.slider = [
    "img/banner/1.jpg",
    "img/banner/2.jpg",
    "img/banner/3.jpg"
  ];
    $scope.someclass = "get-in";
    $scope.menu = function (check) {
        $scope.someclass = check;
    };

    $(window).scroll(function () {
        var scroll = $(window).scrollTop();

        if (scroll >= 300) {
            $("header").addClass("get-white");
        }
        if (scroll == 0) {
            $("header").removeClass("get-white");
        }
    });
    
    
    
})

.controller('BlogCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("blog");
        $scope.menutitle = NavigationService.makeactive("Blog");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
    
        $scope.someclass = "get-in";
        $scope.menu = function (check) {
            $scope.someclass = check;
        };

        $(window).scroll(function () {
            var scroll = $(window).scrollTop();

            if (scroll >= 300) {
                $("header").addClass("get-white");
            }
            if (scroll == 0) {
                $("header").removeClass("get-white");
            }
        });
    })
    .controller('headerctrl', function ($scope, TemplateService) {
        $scope.template = TemplateService;
    })

;
