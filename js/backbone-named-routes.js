// BackboneNamedRoutes.js 0.1.0

// (c) 2013 Evan Stern
// Backbone-Layout may be freely distributed under the MIT license.

(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["backbone"], factory);
    } else {
        root.BackboneNamedRoutes = factory();
    }
}(this, function() {

    /*

    namedRoutes = [
        {
            route: "user/:id"
            , name: "user"
            , callback: this.user
        }
    ]

    */

    var router = null;

    var BackboneNamedRoutes = function(router) {
        if (!router) throw new Error("Must supply a router");
        this.router = router;

        // Store the routes nere
        this.routes = {};

        this.addRoute = function(route, name, callback) {
            this.routes[name] = {route: route, callback: callback};
            this.router.route(route, name, callback);
        };
    };

    return BackboneNamedRoutes;
}));

