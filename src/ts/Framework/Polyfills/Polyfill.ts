export default function SetupPolyfills(){
    if (!String.prototype.startsWith) {
        Object.defineProperty(String.prototype, 'startsWith', {
            value: function (search: any, rawPos: any) {
                var pos = rawPos > 0 ? rawPos | 0 : 0;
                return this.substring(pos, pos + search.length) === search;
            }
        });
    }
    if (!String.prototype.replaceAll) {
        Object.defineProperty(String.prototype, 'replaceAll', {
            value: function (search: any, replace: any) {
                return this.replace(new RegExp(search, 'g'), replace);
            }
        });
    }
    Array.prototype.find = Array.prototype.find || function(callback: any) {
        if (this === null) {
            throw new TypeError('Array.prototype.find called on null or undefined');
        } else if (typeof callback !== 'function') {
            throw new TypeError('callback must be a function');
        }
        var list = Object(this);
        // Makes sures is always has an positive integer as length.
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        for (var i = 0; i < length; i++) {
            var element = list[i];
            if ( callback.call(thisArg, element, i, list) ) {
            return element;
            }
        }
    };
    if (!String.prototype.endsWith) {
        String.prototype.endsWith = function(search, this_len) {
            if (this_len === undefined || this_len > this.length) {
            this_len = this.length;
            }
            return this.substring(this_len - search.length, this_len) === search;
        };
    }
}