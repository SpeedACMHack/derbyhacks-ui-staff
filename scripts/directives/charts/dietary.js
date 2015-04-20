angular
  .module('khe')
  .directive('dietary', ['$compile', 'Stats', function ($compile, Stats) {

    var Models = {
      stats: new Stats()
    };

    return {

      restrict: 'E',
      templateUrl: '/views/directives/charts/dietary.html',
      link: function(scope, element, attrs) {
        $compile(element.contents())(scope);

        Models.stats.dietary().
        success(function (data) {

          var labels = data.restrictions.map(function (r) {
            return r.name;
          });

          var numbers = data.restrictions.map(function (r) {
            return r.count;
          });

          new Chartist.Bar('#dietary.ct-chart', {
            labels: labels,
            series: [numbers]
          }, {
            seriesBarDistance: 10,
            reverseData: true,
            horizontalBars: true,
            axisY: {
              offset: 70,
              showGrid: false
            },
            axisX: {
              labelInterpolationFnc: function(value) {
                if (value % 1 === 0) return value;
              }
            }
          });

        });

      }

    };
  }]);