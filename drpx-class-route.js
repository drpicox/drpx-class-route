(function(angular) {

	angular
		.module('drpxClassRoute', ['ngRoute'])
		.provider('drpxClassRouteHelper', DrpxClassRouteHelperProvider)
		.directive('drpxClassRoute', DrpxClassRouteDirective);


	DrpxClassRouteHelperProvider.$inject = [];
	function DrpxClassRouteHelperProvider  () {
		var config = this.config = {
			transitionPrefix: 'transition-',
			transitionFallback: 'slideleft',
			routePrefix: 'route-',
			routeRootClass: 'root'
		};

		this.$get = DrpxClassRouteHelperFactory;

		DrpxClassRouteHelperFactory.$inject = ['$location','$route','$rootScope'];
		function DrpxClassRouteHelperFactory  ( $location , $route , $rootScope ) {
			var helper = {
				routeClass: '',
				transitionClass: ''
			};			

			$rootScope.$on('$routeChangeStart', _updateTransitionClass);
			$rootScope.$on('$routeChangeSuccess', _updateRouteClass);

			return helper;

			////////

			function _updateRouteClass() {
				var path = $route.current && $route.current.originalPath;
				var routeClass;

				if (!path || path === '/') {
					routeClass = config.routeRootClass;
				} else {
					if (path[0] === '/') {
						path = path.slice(1);
					}
					
					routeClass = path.replace(/[^\w]/g,'-');					
				}

				helper.routeClass = config.routePrefix + routeClass;
			}

			function _updateTransitionClass(ev, next, current) {
				var currentPath = current && current.originalPath || '/';
				var nextPath = next && next.originalPath || '/';

				var transitionClass = 
					current && current.transition && (current.transition['to:'+nextPath] || current.transition['to:*']) ||
					next    && next.transition    && (next.transition['from:'+currentPath]  || next.transition['from:*'] ) ||
					config.transitionFallback;

				helper.transitionClass = config.transitionPrefix + transitionClass;
			}
		}
	}

	DrpxClassRouteDirective.$inject = ['drpxClassRouteHelper'];
	function DrpxClassRouteDirective  ( drpxClassRouteHelper ) {
		var directive = {
			restrict: 'A',
			link: link
		};
		return directive;

		function link(scope, element, attrs) {
			var oldRouteClass = '', oldTransitionClass = '';

			scope.$on('$routeChangeStart', _updateTransitionClass);
			scope.$on('$routeChangeSuccess', _updateRouteClass);
			_updateRouteClass();
			_updateTransitionClass();

			function _updateRouteClass() {
				var routeClass = drpxClassRouteHelper.routeClass;
				element.removeClass(oldRouteClass);
				element.addClass(routeClass);
				oldRouteClass = routeClass;
			}

			function _updateTransitionClass() {
				var transitionClass = drpxClassRouteHelper.transitionClass;
				element.removeClass(oldTransitionClass);
				element.addClass(transitionClass);
				oldTransitionClass = transitionClass;
			}
		}
	}

})(angular);