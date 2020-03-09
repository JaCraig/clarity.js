var NumberDictionary = (function () {
    function NumberDictionary() {
    }
    return NumberDictionary;
}());
//# sourceMappingURL=NumberDictionary.js.map

var StringDictionary = (function () {
    function StringDictionary() {
    }
    return StringDictionary;
}());
//# sourceMappingURL=StringDictionary.js.map

var Test = (function () {
    function Test() {
        this.Values = new NumberDictionary();
        this.Values2 = new StringDictionary();
    }
    Test.prototype.UpdateValues = function (Item1, Item2) {
        this.Values[Item1] = Item2 + "c";
    };
    return Test;
}());

export { Test };
