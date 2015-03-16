(function(){
	if (!Array.prototype.every) {
	  Array.prototype.every = function(callback, thisArg) {
		'use strict';
		var T;
		if (this === null) {
		  throw new TypeError('this is null or not defined');
		}
		if (typeof callback !== 'function') {
		  throw new TypeError();
		}
		var O = Object(this);
		var len = O.length >>> 0;
		if (arguments.length > 1) {
		  T = thisArg;
		}
		for(var x=0;x<len;++x){
			if (!callback.call(T, O[x], x, O)) {
			  return false;
			}
		}
		return true;
	  };
	}
	
	if (!Array.prototype.forEach) {
	  Array.prototype.forEach = function(callback, thisArg) {
		'use strict';
		var T;
		if (this === null) {
		  throw new TypeError('this is null or not defined');
		}
		if (typeof callback !== 'function') {
		  throw new TypeError();
		}
		var O = Object(this);
		var len = O.length >>> 0;
		if (arguments.length > 1) {
		  T = thisArg;
		}
		for(var x=0;x<len;++x){
		  if (x in O) {
			callback.call(T, O[x], x, O);
		  }
		}
	  };
	}
	
	if (!Array.prototype.map) {
		Array.prototype.map = function(callback, thisArg) {
			'use strict';
			var T, A;
			if (this === null) {
			  throw new TypeError('this is null or not defined');
			}
			if (typeof callback !== 'function') {
			  throw new TypeError();
			}
			var O = Object(this);
			var len = O.length >>> 0;
			if (arguments.length > 1) {
			  T = thisArg;
			}
			A = new Array(len);
			for(var x=0;x<len;++x){
			  if (x in O) {
				  A[x]=callback.call(T, O[x], x, O);
			  }
			}
			return A;
		};
	}
	
	if (!Array.prototype.some) {
	  Array.prototype.some = function(callback, thisArg) {
		'use strict';
		var T;
		if (this === null) {
		  throw new TypeError('this is null or not defined');
		}
		if (typeof callback !== 'function') {
		  throw new TypeError();
		}
		var O = Object(this);
		var len = O.length >>> 0;
		if (arguments.length > 1) {
		  T = thisArg;
		}
		for(var x=0;x<len;++x){
			if (callback.call(T, O[x], x, O)) {
			  return true;
			}
		}
		return false;
	  };
	}
	
	if (!Array.prototype.reduce) {
		Array.prototype.reduce = function(callback,initialValue) {
			'use strict';
			if (this === null) {
			  throw new TypeError('this is null or undefined');
			}
			if (typeof callback !== 'function') {
			  throw new TypeError(callback + ' is not a function');
			}
			var O = Object(this);
			var len = O.length >>> 0;
			var value;
			var k=0;
			if (arguments.length == 2) {
				value = initialValue;
			} else {
				while (k < len && !(k in O)) {
					k++; 
				}
				if (k >= len) {
					throw new TypeError('Reduce of empty array with no initial value');
				}
				value = O[k++];
			}
			for (; k < len; k++) {
				if (k in O) {
					value = callback.call(value, O[k], k, O);
				}
			}
			return value;
		};
	}
	
	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function(searchElement, fromIndex) {
			'use strict';
			var k;
			if (this === null) {
			  throw new TypeError('this is null or undefined');
			}
			var O = Object(this);
			var len = O.length >>> 0;
			if (len === 0) {
				return -1;
			}
			var n = +fromIndex || 0;

			if (Math.abs(n) === Infinity) {
			  n = 0;
			}
			if (n >= len) {
			  return -1;
			}
			k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
			while (k < len) {
				if (k in O && O[k] === searchElement) {
					return k;
				}
				k++;
			}
			return -1;
		};
	}
	
	if (!Array.prototype.filter) {
		Array.prototype.filter = function(callback, thisArg) {
			'use strict';
			var T;
			var result=[];
			if (this === null) {
			  throw new TypeError('this is null or not defined');
			}
			if (typeof callback !== 'function') {
			  throw new TypeError();
			}
			var O = Object(this);
			var len = O.length >>> 0;
			if (arguments.length > 1) {
			  T = thisArg;
			}
			for(var x=0;x<len;++x){
				if (callback.call(T, O[x], x, O)) {
					result.push(O[x]);
				}
			}
			return result;
		};
	}
	
	if (!Array.prototype.all) {
		Array.prototype.all=Array.prototype.every;
	}
	
	if (!Array.prototype.select) {
		Array.prototype.select=Array.prototype.map;
	}
	
	if (!Array.prototype.any) {
		Array.prototype.any=Array.prototype.some;
	}
	
	if (!Array.prototype.aggregate) {
		Array.prototype.aggregate=function(callback,initialValue,resultSelector){
			'use strict';
			if (this === null) {
			  throw new TypeError('this is null or undefined');
			}
			if (typeof callback !== 'function') {
			  throw new TypeError(callback + ' is not a function');
			}
			var result;
			if (arguments.length > 1) {
				result=this.reduce(callback,initialValue);
			}
			else{
				result=this.reduce(callback);
			}
			if (arguments.length == 3) {
				if (typeof resultSelector !== 'function') {
					throw new TypeError(resultSelector + ' is not a function');
				}
				return resultSelector.call(resultSelector,result);
			}
			return result;
		};
	}
	
	if (!Array.prototype.average) {
		Array.prototype.average=function(callback){
			'use strict';
			if (this === null) {
			  throw new TypeError('this is null or undefined');
			}
			var result;
			var O = Object(this);
			var len = O.length >>> 0;
			if (arguments.length > 0) {
				if (typeof callback !== 'function') {
					throw new TypeError(callback + ' is not a function');
				}
				return this.aggregate(function(x,y){return x+callback(y);},0,function(x){return x/len;});
			}
			return this.aggregate(function(x,y){return x+y;},0,function(x){return x/len;});
		};
	}
	
	if (!Array.prototype.contains) {
		Array.prototype.contains=function(value,comparer){
			'use strict';
			if (this === null) {
			  throw new TypeError('this is null or undefined');
			}
			if (arguments.length > 1) {
				if (typeof comparer !== 'function') {
					throw new TypeError(comparer + ' is not a function');
				}
				return this.any(function(x){return comparer(value,x);});
			}
			return this.indexOf(value)!==-1;
		};
	}
	
	if (!Array.prototype.distinct) {
		Array.prototype.distinct=function(comparer){
			'use strict';
			if (this === null) {
			  throw new TypeError('this is null or undefined');
			}
			var result=[];
			if (arguments.length > 0) {
				if (typeof comparer !== 'function') {
					throw new TypeError(comparer + ' is not a function');
				}
				this.forEach(function(x){
					if(result.length===0||!result.contains(x,comparer)){
						result.push(x);
					}
				});
				return result;
			}
			this.forEach(function(x){
				if(result.length===0||!result.contains(x)){
					result.push(x);
				}
			});
			return result;
		};
	}
})();