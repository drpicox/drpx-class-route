# drpx-class-route
Add or remove classes to perform animations and give specific classes.

It's main purpose is to give an extra support to add and remove classes for each given route. It can be used to have specific styles in some routes, or to add animations for transitions between slides.

Example:

```css
.transition-fadein.ng-enter {
    transform: scale(1.15);
    opacity: 0;
}
.transition-fadein.ng-enter.ng-enter-active {
    transform: scale(1);
    opacity: 1;
}
.transition-fadein.ng-leave.ng-leave-active {
    transform: scale(1.15);
    opacity: 0;
}
```

```javascript
$routeProvider.when('/', {
    template: '...',
    transition: {
        'from:/': 'fadein',     // opening transition
        'from:*': 'slideright', // transition from any other route
    },
    resolve: { ... }
});
```

```html
<div ng-view autoscroll="1" drpx-class-route></div>
```

## Install - npm

Install the package in your project:

```bash
$ npm install --save drpx-route-component
```

Add the dependence in your app module:

```bash
angular.module('yourModule', [ require('drpx-class-route') ]);
```

## Install - bower

Install the package into your project:

```bash
$ bower install --save drpx-route-component
```

Add the dependence into your app module:

```bash
angular.module('yourModule', [ 'drpxClassRoute' ]);
```

Include script files into your main html:

```html
<script src="bower_components/drpx-class-route/drpx-class-route.js"></script>
```

## How to use

Add drpx-class-route attribute to the element that you want to give a class (for example, the ng-view):

```html
<ng-view drpx-class-route></ng-view>
```

### Classes for each route

By default it adds the current route as class, it replaces `$routeProvider.where` url route by dash prefixed with `route`, it also replaces '/' by `route-root` examples:

* '/' -> `route-root`
* '/items/:id' -> `route-items--id`
* '/contact' -> `route-contact`

### Parametrize view transitions

You can add custom transitions from/to other routes:

```javascript
$routeProvider.when('/', {
    template: '...',
    transition: {
        'from:/': 'fadein',     // opening transition
        'from:*': 'slideright', // when it returns...
    },
    resolve: { ... }
}).when('/contact', {
    template: '...',
    transition: {
        'from:*': 'slideup', // when it appears...
        'to:*': 'slidedown', // when it disappears.... (it prevails even in /)
    },
    resolve: { ... }
});
```

By default, it is configured that `slideleft` is the return transition.
If there is a conflict, current route prevails.

### Configure defaults

You can change defaults in the provider:

```javascript
app.config(['drpxClassRouteHelperProvider'], function(drpxClassRouteHelperProvider) {
    drpxClassRouteHelper.config.transitionPrefix: 'transition-';
    drpxClassRouteHelper.config.transitionFallback: 'slideleft';
    drpxClassRouteHelper.config.routePrefix: 'route-';
    drpxClassRouteHelper.config.routeRootClass: 'root';
});
```
