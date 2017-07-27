var fs = require("fs");

function __require( file ) {
   var dir = process.cwd().concat("/tmp/test/js/");
   var contents = fs.readFileSync( 
      dir.concat(file),
      "utf-8"
   );
   return contents;
}

eval( __require("/Types/StringDictionary.js") );
eval( __require("/Framework/Router/HashPart.js") );
eval( __require("/Framework/Router/PathPart.js") );
eval( __require("/Framework/Router/QueryPart.js") );
eval( __require("/Framework/Router/Route.js") );
eval( __require("/Framework/Router/Router.js") );

describe("Framework.Router.Route tests", function() {
    it("should actually have Framework.Router.Router defined", function() {
        expect(Framework.Router.Router).toBeDefined();
    });
    it("should allow creation", function() {
        var router = new Framework.Router.Router();
        expect(router).toBeDefined();
        expect(router.routes.length).toEqual(0);
    });
    it("should allow adding routes", function() {
        var router = new Framework.Router.Router();
        router.addRoute('/asdf', function(x) { }, { });
        expect(router.routes.length).toEqual(1);
        router.addRoute('/asdf2', function(x) { }, { });
        expect(router.routes.length).toEqual(2);
    });
    it("should allow running routes", function() {
        var tempValue = '';
        var router = new Framework.Router.Router();
        router.addRoute('/asdf', function(x) { tempValue='asdf'; }, { });
        router.addRoute('/asdf/2', function(x) { tempValue='asdf/2'; }, { });
        router.addRoute('/asdf2', function(x) { tempValue='asdf2'; }, { });
        router.run('/asdf/');
        expect(tempValue).toEqual('asdf');
        router.run('/asdf2/');
        expect(tempValue).toEqual('asdf2');
    });
    it("should allow running routes with hashes", function() {
        var tempValue = '';
        var router = new Framework.Router.Router();
        router.addRoute('/asdf#hash1', function(x) { tempValue='asdf'; }, { });
        router.addRoute('/asdf/2', function(x) { tempValue='asdf/2'; }, { });
        router.addRoute('/asdf2#hash2', function(x) { tempValue='asdf2'; }, { });
        router.run('/asdf/#hash1');
        expect(tempValue).toEqual('asdf');
        router.run('/asdf2/#hash2');
        expect(tempValue).toEqual('asdf2');
    });
    it("should sort routes so that longer routes are called first", function() {
        var tempValue = '';
        var router = new Framework.Router.Router();
        router.addRoute('/asdf', function(x) { tempValue='asdf'; }, { });
        router.addRoute('/asdf/2', function(x) { tempValue='asdf/2'; }, { });
        router.addRoute('/asdf/{value}', function(x) { tempValue='asdf/{value}'; }, { });
        router.addRoute('/asdf2', function(x) { tempValue='asdf2'; }, { });
        router.run('/asdf/');
        expect(tempValue).toEqual('asdf');
        router.run('/asdf2/');
        expect(tempValue).toEqual('asdf2');
        router.run('/asdf/2');
        expect(tempValue).toEqual('asdf/2');
        router.run('/asdf/3');
        expect(tempValue).toEqual('asdf/{value}');
    });
});