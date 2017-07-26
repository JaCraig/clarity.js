var fs = require("fs");

function __require( file ) {
   var dir = process.cwd().concat("/dist/js/");
   var contents = fs.readFileSync( 
      dir.concat(file),
      "utf-8"
   );
   return contents;
}

eval( __require("/Types/StringDictionary.min.js") );
eval( __require("/Framework/Router/QueryPart.min.js") );

describe("Framework.Router.QueryPart tests", function() {
   it("should actually have Framework.Router.QueryPart defined", function() {
     expect(Framework.Router.QueryPart).toBeDefined();
  });
  it("can be created with everything provided", function() {
     var value = new Framework.Router.QueryPart('asdf2=asdf', { });
     expect(value.part).toEqual('asdf');
     expect(value.variable).toEqual(false);
     expect(value.optional).toEqual(false);
     expect(value.defaultValue).toEqual('');
     expect(value.key).toEqual('asdf2');
  });
  it("can be created as a variable with everything provided", function() {
     var value = new Framework.Router.QueryPart('asdf2={asdf}', { });
     expect(value.part).toEqual('asdf');
     expect(value.variable).toEqual(true);
     expect(value.optional).toEqual(false);
     expect(value.defaultValue).toEqual('');
     expect(value.key).toEqual('asdf2');
  });
  it("can be created as optional with everything provided", function() {
     var value = new Framework.Router.QueryPart('asdf2=^asdf', { });
     expect(value.part).toEqual('asdf');
     expect(value.variable).toEqual(false);
     expect(value.optional).toEqual(true);
     expect(value.defaultValue).toEqual('');
     expect(value.key).toEqual('asdf2');
  });
  it("can be created as optional variable with everything provided", function() {
     var value = new Framework.Router.QueryPart('asdf2={^asdf}', { });
     expect(value.part).toEqual('asdf');
     expect(value.variable).toEqual(true);
     expect(value.optional).toEqual(true);
     expect(value.defaultValue).toEqual('');
     expect(value.key).toEqual('asdf2');
  });
  it("isMatch returns true when the parts match", function() {
     var value = new Framework.Router.QueryPart('asdf2=asdf', { });
     expect(value.isMatch('asdf2=asdf')).toEqual(true);
  });
  it("isMatch returns false when the parts don't match", function() {
     var value = new Framework.Router.QueryPart('asdf2=asdf', { });
     expect(value.isMatch('asdf2')).toEqual(false);
     expect(value.isMatch('asdf2=asd')).toEqual(false);
     expect(value.isMatch('asdf')).toEqual(false);
     expect(value.isMatch('')).toEqual(false);
     expect(value.isMatch(undefined)).toEqual(false);
     expect(value.isMatch(null)).toEqual(false);
  });
  it("isMatch returns true when the part is a variable", function() {
     var value = new Framework.Router.QueryPart('asdf2={asdf}', { });
     expect(value.isMatch('asdf2=asdf')).toEqual(true);
     expect(value.isMatch('asdf2=asdf2')).toEqual(true);
     expect(value.isMatch('asdf2=asd')).toEqual(true);
  });
  it("isMatch returns false when the part is a variable and the value is undefined, null, or empty string", function() {
     var value = new Framework.Router.QueryPart('asdf2={asdf}', { });
     expect(value.isMatch('')).toEqual(false);
     expect(value.isMatch(undefined)).toEqual(false);
     expect(value.isMatch(null)).toEqual(false);
  });
  it("isMatch returns true when the part is optional", function() {
     var value = new Framework.Router.QueryPart('asdf2=^asdf', { });
     expect(value.isMatch('asdf2=asdf')).toEqual(true);
     expect(value.isMatch('asdf2=asdf2')).toEqual(true);
     expect(value.isMatch('asdf2=asd')).toEqual(true);
     expect(value.isMatch('asdf2=')).toEqual(true);
     expect(value.isMatch(undefined)).toEqual(false);
     expect(value.isMatch(null)).toEqual(false);
  });
  it("isMatch returns true when the part is optional and a variable", function() {
     var value = new Framework.Router.QueryPart('asdf2={^asdf}', { });
     expect(value.isMatch('asdf2=asdf')).toEqual(true);
     expect(value.isMatch('asdf2=asdf2')).toEqual(true);
     expect(value.isMatch('asdf2=asd')).toEqual(true);
     expect(value.isMatch('asdf2=')).toEqual(true);
     expect(value.isMatch(undefined)).toEqual(false);
     expect(value.isMatch(null)).toEqual(false);
  });
  it("setValue sets the value properly when a path", function() {
     var value = new Framework.Router.QueryPart('asdf2=asdf', { });
     var parameters = { };
     value.setValue('asdf2=asdf', parameters);
     expect(parameters.asdf2).toEqual('asdf');
  });
  it("setValue sets the value properly when an optional path", function() {
     var value = new Framework.Router.QueryPart('asdf2=asdf', { });
     var parameters = { };
     value.setValue('asdf2=asdf', parameters);
     expect(parameters.asdf2).toEqual('asdf');
     parameters = { };
     value.setValue('', parameters);
     expect(parameters.asdf2).toEqual('');
     parameters = { };
     value.setValue(null, parameters);
     expect(parameters.asdf2).toEqual('');
     parameters = { };
     value.setValue(undefined, parameters);
     expect(parameters.asdf2).toEqual('');
  });
  it("setValue sets the value properly when it is a variable", function() {
     var value = new Framework.Router.QueryPart('asdf2={asdf}', { });
     var parameters = { };
     value.setValue('asdf2=asdf', parameters);
     expect(parameters.asdf2).toEqual('asdf');
     parameters = { };
     value.setValue('asdf2=2', parameters);
     expect(parameters.asdf2).toEqual('2');
     parameters = { };
     value.setValue('asdf2=poiasdf', parameters);
     expect(parameters.asdf2).toEqual('poiasdf');
  });
  it("setValue sets the value properly when it is an optional variable", function() {
     var value = new Framework.Router.QueryPart('asdf2={^asdf}', { });
     var parameters = { };
     value.setValue('asdf2=asdf', parameters);
     expect(parameters.asdf2).toEqual('asdf');
     parameters = { };
     value.setValue('asdf2=2', parameters);
     expect(parameters.asdf2).toEqual('2');
     parameters = { };
     value.setValue('asdf2=poiasdf', parameters);
     expect(parameters.asdf2).toEqual('poiasdf');
     parameters = { };
     value.setValue('asdf2=', parameters);
     expect(parameters.asdf2).toEqual('');
     parameters = { };
     value.setValue(null, parameters);
     expect(parameters.asdf2).toEqual('');
     parameters = { };
     value.setValue(undefined, parameters);
     expect(parameters.asdf2).toEqual('');
  });
});