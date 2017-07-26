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
eval( __require("/Types/NumberDictionary.min.js") );
eval( __require("/Framework/Hotkey/Globals.min.js") );
eval( __require("/Framework/Hotkey/Keypress.min.js") );
eval( __require("/Framework/Hotkey/Sequence.min.js") );

describe("Framework.Hotkey.Sequence tests", function() {
    it("should actually have Framework.Hotkey.Sequence defined", function() {
        expect(Framework.Hotkey.Sequence).toBeDefined();
    });
    it("should be able to be created", function() {
        var testObject = new Framework.Hotkey.Sequence('ctrl-alt-del', function() { });
        expect(testObject.keyCodes.length).toEqual(1);
        expect(testObject.keyCodes[0].keys[0]).toEqual(17);
        expect(testObject.keyCodes[0].keys[1]).toEqual(18);
        expect(testObject.keyCodes[0].keys[2]).toEqual(46);
        testObject = new Framework.Hotkey.Sequence('a b c', function() { });
        expect(testObject.keyCodes.length).toEqual(3);
        expect(testObject.keyCodes[0].keys[0]).toEqual(65);
        expect(testObject.keyCodes[1].keys[0]).toEqual(66);
        expect(testObject.keyCodes[2].keys[0]).toEqual(67);
    });
    it("press calls the function passed in if it is called", function() {
        var callback = '';
        var testObject = new Framework.Hotkey.Sequence('ctrl-alt-del', function() { callback = 'a'; });
        testObject.press([[17, 18, 46]]);
        expect(callback).toEqual('a');
    });
    it("isPartial returns true if it is a partial match, false otherwise", function() {
        var callback = '';
        var testObject = new Framework.Hotkey.Sequence('a b c', function() { callback = 'a'; });
        expect(testObject.isPartial([[65],[66]])).toEqual(true);
        expect(testObject.isPartial([[66],[67]])).toEqual(false);
    });
});