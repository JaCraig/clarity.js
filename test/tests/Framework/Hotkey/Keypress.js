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
eval( __require("/Types/NumberDictionary.js") );
eval( __require("/Framework/Hotkey/Globals.js") );
eval( __require("/Framework/Hotkey/Keypress.js") );

describe("Framework.Hotkey.Keypress tests", function() {
    it("should actually have Framework.Hotkey.Keypress defined", function() {
        expect(Framework.Hotkey.Keypress).toBeDefined();
    });
    it("should be able to be created", function() {
        var testObject = new Framework.Hotkey.Keypress('ctrl-alt-del');
        expect(testObject.keys.length).toEqual(3);
        expect(testObject.keys[0]).toEqual(17);
        expect(testObject.keys[1]).toEqual(18);
        expect(testObject.keys[2]).toEqual(46);
        testObject = new Framework.Hotkey.Keypress('a');
        expect(testObject.keys.length).toEqual(1);
        expect(testObject.keys[0]).toEqual(65);
    });
    it("isPressed returns true when pressed, false otherwise", function() {
        var testObject = new Framework.Hotkey.Keypress('ctrl-alt-del');
        expect(testObject.isPressed([17, 18, 46])).toEqual(true);
        expect(testObject.isPressed([17, 18, 65])).toEqual(false);
        expect(testObject.isPressed([17, 18])).toEqual(false);
        expect(testObject.isPressed([17])).toEqual(false);
    });
});