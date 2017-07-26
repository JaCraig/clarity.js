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
eval( __require("/Framework/Hotkey/Scope.min.js") );

describe("Framework.Hotkey.Scope tests", function() {
    it("should actually have Framework.Hotkey.Scope defined", function() {
        expect(Framework.Hotkey.Scope).toBeDefined();
    });
    it("should be able to be created", function() {
        var testObject = new Framework.Hotkey.Scope('test-scope');
        expect(testObject.sequences.length).toEqual(0);
        expect(testObject.name).toEqual('test-scope');
    });
    it("addSequence should add a sequence", function() {
        var callback = '';
        var testObject = new Framework.Hotkey.Scope('test-scope');
        testObject.addSequence('ctrl-alt-del', function() { callback = 'a'; })
        expect(testObject.sequences.length).toEqual(1);
        expect(testObject.sequences[0].keyCodes.length).toEqual(1);
        expect(testObject.sequences[0].keyCodes[0].keys[0]).toEqual(17);
        expect(testObject.sequences[0].keyCodes[0].keys[1]).toEqual(18);
        expect(testObject.sequences[0].keyCodes[0].keys[2]).toEqual(46);
    });
    it("addSequence should override a sequence if it already exists", function() {
        var callback = '';
        var testObject = new Framework.Hotkey.Scope('test-scope');
        testObject.addSequence('ctrl-alt-del', function() { callback = 'a'; })
        expect(testObject.sequences.length).toEqual(1);
        expect(testObject.sequences[0].keyCodes.length).toEqual(1);
        expect(testObject.sequences[0].keyCodes[0].keys[0]).toEqual(17);
        expect(testObject.sequences[0].keyCodes[0].keys[1]).toEqual(18);
        expect(testObject.sequences[0].keyCodes[0].keys[2]).toEqual(46);
        testObject.addSequence('ctrl-alt-del', function() { callback = 'a'; })
        expect(testObject.sequences.length).toEqual(1);
        expect(testObject.sequences[0].keyCodes.length).toEqual(1);
        expect(testObject.sequences[0].keyCodes[0].keys[0]).toEqual(17);
        expect(testObject.sequences[0].keyCodes[0].keys[1]).toEqual(18);
        expect(testObject.sequences[0].keyCodes[0].keys[2]).toEqual(46);
    });
    it("removeSequence should remove a sequence", function() {
        var callback = '';
        var testObject = new Framework.Hotkey.Scope('test-scope');
        testObject.addSequence('ctrl-alt-del', function() { callback = 'a'; })
        testObject.removeSequence('ctrl-alt-del');
        expect(testObject.sequences.length).toEqual(0);
    });
    it("clear should remove all sequences and scopes", function() {
        var callback = '';
        var testObject = new Framework.Hotkey.Scope('test-scope');
        testObject.addSequence('ctrl-alt-del', function() { callback = 'a'; })
        testObject.addSequence('ctrl-alt-del2', function() { callback = 'a'; })
        testObject.addSequence('ctrl-alt-del3', function() { callback = 'a'; })
        testObject.clear();
        expect(testObject.sequences.length).toEqual(0);
    });
    it("press calls the function passed in if it is called", function() {
        var callback = '';
        var testObject = new Framework.Hotkey.Scope('test-scope');
        testObject.addSequence('ctrl-alt-del', function() { callback = 'a'; })
        testObject.press([[17, 18, 46]]);
        expect(callback).toEqual('a');
    });
    it("press calls longer sequences before shorter ones", function() {
        var callback = '';
        var testObject = new Framework.Hotkey.Scope('test-scope');
        testObject.addSequence('ctrl-alt-del', function() { callback = 'cad'; })
        testObject.addSequence('ctrl-alt-del a', function() { callback = 'a'; })
        testObject.press([[17, 18, 46]]);
        expect(callback).toEqual('cad');
        callback = '';
        testObject.press([[17, 18, 46],[65]]);
        expect(callback).toEqual('a');
    });
});