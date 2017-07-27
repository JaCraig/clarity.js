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
eval( __require("/Framework/Hotkey/Sequence.js") );
eval( __require("/Framework/Hotkey/Scope.js") );
eval( __require("/Framework/Hotkey/Hotkeys.js") );

describe("Framework.Hotkey.Hotkeys tests", function() {
    it("should actually have Framework.Hotkey.Hotkeys defined", function() {
        expect(Framework.Hotkey.Hotkeys).toBeDefined();
    });
    it("should be able to be created", function() {
        var tempValue = new Framework.Hotkey.Hotkeys();
        expect(tempValue.scopes.Default.name).toEqual('Default');
    });
    it("addScope should add a scope", function() {
        var callback = '';
        var tempValue = new Framework.Hotkey.Hotkeys();
        tempValue.addScope('Default2');
        expect(tempValue.scopes.Default.name).toEqual('Default');
        expect(tempValue.scopes.Default2.name).toEqual('Default2');
    });
    it("setScope should set the current scope", function() {
        var callback = '';
        var tempValue = new Framework.Hotkey.Hotkeys();
        var tempScope = tempValue.addScope('Default2');
        tempValue.setScope('Default2');
        expect(tempValue.currentScope).toEqual(tempScope);
    });
    it("removeScope should remove a scope", function() {
        var callback = '';
        var tempValue = new Framework.Hotkey.Hotkeys();
        tempValue.addScope('Default2');
        tempValue.removeScope('Default2');
        expect(tempValue.scopes.Default.name).toEqual('Default');
    });
    it("removeScope should not be able to remove default", function() {
        var callback = '';
        var tempValue = new Framework.Hotkey.Hotkeys();
        tempValue.addScope('Default2');
        tempValue.removeScope('Default');
        expect(tempValue.scopes.Default.name).toEqual('Default');
        expect(tempValue.scopes.Default2.name).toEqual('Default2');
    });
    it("clear should remove all scopes and adds a new default one", function() {
        var callback = '';
        var tempValue = new Framework.Hotkey.Hotkeys();
        tempValue.addScope('Default2');
        tempValue.clear();
        expect(tempValue.scopes.Default.name).toEqual('Default');
    });
    it("bind should add a sequence to the current scope", function() {
        var tempValue = new Framework.Hotkey.Hotkeys();
        tempValue.bind('a',function() { });
        expect(tempValue.scopes.Default.sequences.length).toEqual(1);
    });
    it("unbind should remove a sequence to the current scope", function() {
        var tempValue = new Framework.Hotkey.Hotkeys();
        tempValue.bind('a',function() { });
        expect(tempValue.scopes.Default.sequences.length).toEqual(1);
        tempValue.unbind('a');
        expect(tempValue.scopes.Default.sequences.length).toEqual(0);
    });
    it("press calls the function passed in if it is called", function() {
        var tempValue = new Framework.Hotkey.Hotkeys();
        var callback = '';
        tempValue.bind('ctrl-alt-del', function() { callback = 'a'; });
        tempValue.press({ altKey: true, ctrlKey: true, metaKey: false, shiftKey: false, keyCode: 46, target: { tagName: '' } });
        expect(callback).toEqual('a');
    });
});