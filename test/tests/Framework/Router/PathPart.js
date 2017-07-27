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
eval( __require("/Framework/Router/PathPart.js") );

describe("Framework.Router.PathPart tests", function() {
   it("should actually have Framework.Router.PathPart defined", function() {
     expect(Framework.Router.PathPart).toBeDefined();
  });
  it("can be created with everything provided", function() {
     var value = new Framework.Router.PathPart('asdf', { });
     expect(value.part).toEqual('asdf');
     expect(value.variable).toEqual(false);
     expect(value.optional).toEqual(false);
     expect(value.defaultValue).toEqual('');
  });
  it("can be created as a variable with everything provided", function() {
     var value = new Framework.Router.PathPart('{asdf}', { });
     expect(value.part).toEqual('asdf');
     expect(value.variable).toEqual(true);
     expect(value.optional).toEqual(false);
     expect(value.defaultValue).toEqual('');
  });
  it("can be created as optional with everything provided", function() {
     var value = new Framework.Router.PathPart('^asdf', { });
     expect(value.part).toEqual('asdf');
     expect(value.variable).toEqual(false);
     expect(value.optional).toEqual(true);
     expect(value.defaultValue).toEqual('');
  });
  it("can be created as optional variable with everything provided", function() {
     var value = new Framework.Router.PathPart('{^asdf}', { });
     expect(value.part).toEqual('asdf');
     expect(value.variable).toEqual(true);
     expect(value.optional).toEqual(true);
     expect(value.defaultValue).toEqual('');
  });
  it("isMatch returns true when the parts match", function() {
     var value = new Framework.Router.PathPart('asdf', { });
     expect(value.isMatch('asdf')).toEqual(true);
  });
  it("isMatch returns false when the parts don't match", function() {
     var value = new Framework.Router.PathPart('asdf', { });
     expect(value.isMatch('asdf2')).toEqual(false);
     expect(value.isMatch('asd')).toEqual(false);
     expect(value.isMatch('')).toEqual(false);
     expect(value.isMatch(undefined)).toEqual(false);
     expect(value.isMatch(null)).toEqual(false);
  });
  it("isMatch returns true when the part is a variable", function() {
     var value = new Framework.Router.PathPart('{asdf}', { });
     expect(value.isMatch('asdf')).toEqual(true);
     expect(value.isMatch('asdf2')).toEqual(true);
     expect(value.isMatch('asd')).toEqual(true);
  });
  it("isMatch returns false when the part is a variable and the value is undefined, null, or empty string", function() {
     var value = new Framework.Router.PathPart('{asdf}', { });
     expect(value.isMatch('')).toEqual(false);
     expect(value.isMatch(undefined)).toEqual(false);
     expect(value.isMatch(null)).toEqual(false);
  });
  it("isMatch returns true when the part is optional", function() {
     var value = new Framework.Router.PathPart('^asdf', { });
     expect(value.isMatch('asdf')).toEqual(true);
     expect(value.isMatch('asdf2')).toEqual(true);
     expect(value.isMatch('asd')).toEqual(true);
     expect(value.isMatch('')).toEqual(true);
     expect(value.isMatch(undefined)).toEqual(true);
     expect(value.isMatch(null)).toEqual(true);
  });
  it("isMatch returns true when the part is optional and a variable", function() {
     var value = new Framework.Router.PathPart('{^asdf}', { });
     expect(value.isMatch('asdf')).toEqual(true);
     expect(value.isMatch('asdf2')).toEqual(true);
     expect(value.isMatch('asd')).toEqual(true);
     expect(value.isMatch('')).toEqual(true);
     expect(value.isMatch(undefined)).toEqual(true);
     expect(value.isMatch(null)).toEqual(true);
  });
  it("setValue sets the value properly when a path", function() {
     var value = new Framework.Router.PathPart('asdf', { });
     var parameters = { };
     value.setValue('asdf', parameters);
     expect(parameters.asdf).toEqual('asdf');
  });
  it("setValue sets the value properly when an optional path", function() {
     var value = new Framework.Router.PathPart('^asdf', { });
     var parameters = { };
     value.setValue('asdf', parameters);
     expect(parameters.asdf).toEqual('asdf');
     parameters = { };
     value.setValue('', parameters);
     expect(parameters.asdf).toEqual('');
     parameters = { };
     value.setValue(null, parameters);
     expect(parameters.asdf).toEqual('');
     parameters = { };
     value.setValue(undefined, parameters);
     expect(parameters.asdf).toEqual('');
  });
  it("setValue sets the value properly when it is a variable", function() {
     var value = new Framework.Router.PathPart('{asdf}', { });
     var parameters = { };
     value.setValue('asdf', parameters);
     expect(parameters.asdf).toEqual('asdf');
     parameters = { };
     value.setValue('2', parameters);
     expect(parameters.asdf).toEqual('2');
     parameters = { };
     value.setValue('poiasdf', parameters);
     expect(parameters.asdf).toEqual('poiasdf');
  });
  it("setValue sets the value properly when it is an optional variable", function() {
     var value = new Framework.Router.PathPart('{^asdf}', { });
     var parameters = { };
     value.setValue('asdf', parameters);
     expect(parameters.asdf).toEqual('asdf');
     parameters = { };
     value.setValue('2', parameters);
     expect(parameters.asdf).toEqual('2');
     parameters = { };
     value.setValue('poiasdf', parameters);
     expect(parameters.asdf).toEqual('poiasdf');
     parameters = { };
     value.setValue('', parameters);
     expect(parameters.asdf).toEqual('');
     parameters = { };
     value.setValue(null, parameters);
     expect(parameters.asdf).toEqual('');
     parameters = { };
     value.setValue(undefined, parameters);
     expect(parameters.asdf).toEqual('');
  });
});