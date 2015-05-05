describe('Array function', function() {
	var arrayRequires=require('../js/Array.js');
	var simpleArray=[0,1,2,3];
	var duplicateArray=[0,0,1,2,2,3];
	beforeEach(function() {
	});

	it('all should point to every', function() {
		expect(Array.prototype.all).toEqual(Array.prototype.every);
	});
	
	it('all should return true when all items are true',function(){
		expect(simpleArray.all(function(x){return x<4;})).toEqual(true);
	});
	it('all should return false when some items are false',function(){
		expect(simpleArray.all(function(x){return x<2;})).toEqual(false);
	});
	it('any should return true when any item is true',function(){
		expect(simpleArray.any(function(x){return x<1;})).toEqual(true);
	});
	it('any should return false when all items are false',function(){
		expect(simpleArray.any(function(x){return x>3;})).toEqual(false);
	});
	it('select should run the specified function and return [2,3,4,5]',function(){
		expect(simpleArray.select(function(x){ return x+2;})).toEqual([2,3,4,5]);
	});
	it('aggregate should run the specified function and return 6',function(){
		expect(simpleArray.aggregate(function(x,y){ return x+y;})).toEqual(6);
	});
	it('aggregate should run the specified function and return "f"',function(){
		expect(simpleArray.aggregate(function(x,y){ return x+y;},0, function(x){return "a"+x;})).toEqual("a6");
	});
	it('average should run the specified function and return 1.5',function(){
		expect(simpleArray.average()).toEqual(1.5);
	});
	it('average should run the specified function and return 2.5',function(){
		expect(simpleArray.average(function(x){return x+1;})).toEqual(2.5);
	});
	it('contains should return true for the value 0',function(){
		expect(simpleArray.contains(0)).toEqual(true);
	});
	it('contains should return false for the value -512',function(){
		expect(simpleArray.contains(-512)).toEqual(false);
	});
	it('contains should return false for the value 1, with the negative comparer specified',function(){
		expect(simpleArray.contains(1,function(x,y){return x==-y;})).toEqual(false);
	});
	it('contains should return false for the value -1, with the negative comparer specified',function(){
		expect(simpleArray.contains(-1,function(x,y){return x==-y;})).toEqual(true);
	});
	it('distinct should run the specified function and return [0,1,2,3]',function(){
		expect(duplicateArray.distinct()).toEqual([0,1,2,3]);
	});
	it('except should run the specified function and return [0,1,2]',function(){
		expect(simpleArray.except([3,4,5])).toEqual([0,1,2]);
	});
	it('except should run the specified function and return [0,1]',function(){
		expect(simpleArray.except([3,4,5,2])).toEqual([0,1]);
	});
	it('except should run the specified function and return [0,2]',function(){
		expect(simpleArray.except(function(x){return x%2==1;})).toEqual([0,2]);
	});
});