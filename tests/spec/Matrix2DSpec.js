describe("Matrix2D", function () {

	beforeEach(function(){
		// calculated values using matrix-calculations.html		
		this.m1 = new createjs.Matrix2D(1,2,3,4,5,6);
		this.m1equal = new createjs.Matrix2D(1,2,3,4,5,6);
		this.identity = new createjs.Matrix2D(1,0,0,1,0,0);
		this.m1inverse = new createjs.Matrix2D(-2,1,1.5,-0.5,1,-2);
		this.m2 = new createjs.Matrix2D(7,8,9,10,11,12);
		this.m1m2 = new createjs.Matrix2D(31,46,39,58,52,76);
		this.m2m1 = new createjs.Matrix2D(25,28,57,64,100,112);
		this.m1scale_p1 = new createjs.Matrix2D(13,26,42,56,5,6);
		this.m1translate_p1 = new createjs.Matrix2D(1,2,3,4,60,88);
		this.m1transform_p1 = {"x":60,"y":88};
		this.m1rotate_30 = new createjs.Matrix2D(2.366025447845459,3.732050895690918,2.098076105117798,2.464101552963257,5,6);
		this.m1rotate_90 = new createjs.Matrix2D(3,4,-1.0000001192092896,-2.000000238418579,5,6);
		this.m1rotate_neg90 = new createjs.Matrix2D(-3,-4,0.9999998807907104,1.9999998807907104,5,6);
		this.m1rotate_neg170 = new createjs.Matrix2D(-1.5057525634765625,-2.6642086505889893,-2.7807748317718506,-3.5919342041015625,5,6);
		this.m1skew_neg20_20 = new createjs.Matrix2D(2.0919106006622314,3.455880880355835,2.6360297203063965,3.272059440612793,5,6);
		this.m1skew_20_neg20 = new createjs.Matrix2D(-0.09191060066223145,0.544119119644165,3.3639702796936035,4.727940559387207,5,6);
		this.m1skew_70_70 = new createjs.Matrix2D(9.242432594299316,12.989910125732422,5.7474775314331055,9.494955062866211,5,6);
		this.identitytransform_11_15_20_50_0_0_0 = new createjs.Matrix2D(20,0,0,50,11,15);
		this.identitytransform_0_0_1_1_45_0_0 = new createjs.Matrix2D(0.7071067690849304,0.7071067690849304,-0.7071067690849304,0.7071067690849304,0,0);
		this.identitytransform_0_0_20_50_45_0_0 = new createjs.Matrix2D(14.142135620117188,14.142135620117188,-35.35533905029297,35.35533905029297,0,0);
		this.identitytransform_20_80_20_50_55_0_0 = new createjs.Matrix2D(11.471529006958008,16.383041381835938,-40.957603454589844,28.678821563720703,20,80);
		this.identitytransform_5_66_2_90_15_neg20_20 = new createjs.Matrix2D(1.7434468269348145,1.220774531364441,-54.934852600097656,78.45510864257812,5,66);
		this.p1 = {"x":13,"y":14};

		// untested (these came from easeljs)
		this.m1decomposed = {"x":5,"y":6,"scaleX":2.23606797749979,"scaleY":5,"skewX":-36.86989764584402,"skewY":63.434948822922};
	});

	it("defines the constructor function", function(){
		expect(createjs.Matrix2D).toBeDefined();
	});

	it(".equal()", function() {
		expect(this.m1.equals(this.m1equal)).toBe(true);
		expect(this.m1.equals(this.m2)).toBe(false);
	});

	it(".appendMatrix()", function() {
		this.m1.appendMatrix(this.m2);
		expect(this.m1.equals(this.m1m2)).toBe(true);
	});

	it(".prependMatrix()", function() {
		this.m1.prependMatrix(this.m2);
		expect(this.m1.equals(this.m2m1)).toBe(true);
	});

	it(".append()", function() {
		this.m1.append(this.m2.a, this.m2.b, this.m2.c, this.m2.d, this.m2.tx, this.m2.ty);
		expect(this.m1.equals(this.m1m2)).toBe(true);
	});

	it(".prepend()", function() {
		this.m1.prepend(this.m2.a, this.m2.b, this.m2.c, this.m2.d, this.m2.tx, this.m2.ty);
		expect(this.m1.equals(this.m2m1)).toBe(true);
	});

	it(".isIdentity()", function() {
		expect(this.identity.isIdentity()).toBe(true);
		expect(this.m1.isIdentity()).toBe(false);
	});

	it(".clone()", function() {
		var m1clone = this.m1.clone();
		expect(m1clone).not.toBe(this.m1);
		expect(m1clone.equals(this.m1)).toBe(true);
	});

	it(".copy()", function() {
		this.m2.copy(this.m1);
		expect(this.m2.equals(this.m1equal)).toBe(true);
	});


	it(".transformPoint()", function() {
		var p2 = {};
		var p2c = this.m1.transformPoint(this.p1.x, this.p1.y, p2);
		expect(p2c).toBe(p2);
		expect(p2c).toEqual(this.m1transform_p1);
	});

	it(".invert()", function() {
		var m1 = this.m1.invert();
		expect(this.m1).toBe(m1);
		expect(this.m1.equals(this.m1inverse)).toBe(true);
	});

	it(".translate()", function() {
		var m1 = this.m1.translate(this.p1.x, this.p1.y);
		expect(m1).toBe(this.m1);
		expect(m1.equals(this.m1translate_p1)).toBe(true);
	});

	it(".scale()", function() {
		var m1 = this.m1.scale(this.p1.x, this.p1.y);
		expect(m1).toBe(this.m1);
		expect(m1.equals(this.m1scale_p1)).toBe(true);
	});

	describe(".skew()", function() {

		it(".skew(-20, 20)", function() {
			var m1 = this.m1.skew(-20, 20);
			expect(m1).toBe(this.m1);
			expect(m1).toBeCloseMatrix(this.m1skew_neg20_20);
		});

		it(".skew(20, -20)", function() {
			var m1 = this.m1.skew(20, -20);
			expect(m1).toBe(this.m1);
			expect(m1).toBeCloseMatrix(this.m1skew_20_neg20);
		});

		it(".skew(70, 70)", function() {
			var m1 = this.m1.skew(70, 70);
			expect(m1).toBe(this.m1);
			expect(m1).toBeCloseMatrix(this.m1skew_70_70);
		});
	});

	describe(".rotate()", function() {
		it(".rotate(90)", function() {
			var m1 = this.m1.rotate(90);
			expect(m1).toBe(this.m1);
			expect(m1).toBeCloseMatrix(this.m1rotate_90);
		});

		it(".rotate(30)", function() {
			var m1 = this.m1.rotate(30);
			expect(m1).toBe(this.m1);
			expect(m1).toBeCloseMatrix(this.m1rotate_30);
		});

		it(".rotate(-90)", function() {
			var m1 = this.m1.rotate(-90);
			expect(m1).toBe(this.m1);
			expect(m1).toBeCloseMatrix(this.m1rotate_neg90);
		});

		it(".rotate(-170)", function() {
			var m1 = this.m1.rotate(-170);
			expect(m1).toBe(this.m1);
			expect(m1).toBeCloseMatrix(this.m1rotate_neg170);
		});
	});
	

	describe(".appendTransform()", function() {
		// TODO finish (skew)
		it(".appendTransform(p1.x, p1.y, 1, 1, 0, 0, 0)", function() {
			var m1 = this.m1.appendTransform(this.p1.x, this.p1.y, 1, 1, 0, 0, 0);
			expect(m1).toBe(this.m1);
			expect(m1).toBeCloseMatrix(this.m1translate_p1);
		});

		it(".appendTransform(11, 15, 20, 50, 0, 0, 0)", function() {
			var matrix = this.identity.appendTransform(11, 15, 20, 50, 0, 0, 0);
			expect(matrix).toBe(this.identity);
			expect(matrix).toBeCloseMatrix(this.identitytransform_11_15_20_50_0_0_0);
		});

		it(".appendTransform(0, 0, 1, 1, 45, 0, 0)", function() {
			var matrix = this.identity.appendTransform(0, 0, 1, 1, 45, 0, 0);
			expect(matrix).toBe(this.identity);
			expect(matrix).toBeCloseMatrix(this.identitytransform_0_0_1_1_45_0_0);
		});

		it(".appendTransform(0, 0, 20, 50, 45, 0, 0)", function() {
			var matrix = this.identity.appendTransform(0, 0, 20, 50, 45, 0, 0);
			expect(matrix).toBe(this.identity);
			expect(matrix).toBeCloseMatrix(this.identitytransform_0_0_20_50_45_0_0);
		});

		it(".appendTransform(20, 80, 20, 50, 55, 0, 0)", function() {
			var matrix = this.identity.appendTransform(20, 80, 20, 50, 55, 0, 0);
			expect(matrix).toBe(this.identity);
			expect(matrix).toBeCloseMatrix(this.identitytransform_20_80_20_50_55_0_0);
		});

		it(".appendTransform(5, 66, 2, 90, 15, -20, 20)", function() {
			var matrix = this.identity.appendTransform(5, 66, 2, 90, 15, -20, 20);
			expect(matrix).toBe(this.identity);
			expect(matrix).toBeCloseMatrix(this.identitytransform_5_66_2_90_15_neg20_20);
		});
		
		
	});

	it(".prependTransform()", function() {
		// TODO doesn't test anything yet
		//var m1 = this.m1.prependTransform();
		//expect(m1).toBe(this.m1);
		//console.log(m1);
	});

	it(".decompose()",	function() {
		// TODO more decomposition tests and verify
		var o = {};
		var transform = this.m1.decompose(o);
		expect(o).toBe(transform);
		expect(o).toEqual(this.m1decomposed);
	});
});
