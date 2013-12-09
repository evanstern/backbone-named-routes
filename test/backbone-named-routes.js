(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["backbone-named-routes", "backbone"], factory);
    } else {
        factory(root.BackboneNamedRoutes, Backbone);
    }
}(this, function factory(BackboneNamedRoutes, Backbone) {

    describe("Basic initialization",  function() {
        it("exists", function() {
            expect(BackboneNamedRoutes).not.toBe(undefined);
        });

        it("requires a router", function() {
            var noRouter = function() {
                return new BackboneNamedRoutes();
            };
            expect(noRouter).toThrow();

            var withRouter = function() {
                var r = new Backbone.Router;
                return new BackboneNamedRoutes(r);
            };
            expect(withRouter).not.toThrow();
        });
    });

    describe("#addRoute", function() {
        var router,
            namedRoutes;

        beforeEach(function() {
            router = new Backbone.Router();
            namedRoutes = new BackboneNamedRoutes(router);
        });

        it("can add a new route", function() {
            var callback = jasmine.createSpy("callbackTest");
            namedRoutes.addRoute("test/route", "test", callback);

            expect(namedRoutes.routes["test"]).toEqual({
                route: "test/route"
                , callback: callback
            });
            expect(Backbone.history.handlers.length).toEqual(1);
            expect(Backbone.history.handlers[0].route).toEqual(
                new RegExp("^test/route$"));
        });
    });

}));
