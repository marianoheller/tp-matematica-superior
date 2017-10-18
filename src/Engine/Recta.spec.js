import { calcVals, solveEquation, calcError } from './Recta'
import config from '../config';

const rectaConfig = config.methods.find( (m) => m.name === "Recta" );
if ( !rectaConfig ) throw new Error("No se pudo encontrar el metodo 'Recta' en la configuracion");


test('calcVals with test case', function() {
  	const input = [
		{x: 1, y: 5},
		{x: 2, y: 6},
		{x: 3, y: 9},
		{x: 4, y: 8},
		{x: 6, y: 10},
	];
	const expected = [ 
		[ 
			{ name: 'X', expr: 'x', value: 1 },
			{ name: 'Y', expr: 'y', value: 5 },
			{ name: 'X^2', expr: 'x*x', value: 1 },
			{ name: 'XY', expr: 'x*y', value: 5 } 
		],
		[ 
			{ name: 'X', expr: 'x', value: 2 },
			{ name: 'Y', expr: 'y', value: 6 },
			{ name: 'X^2', expr: 'x*x', value: 4 },
			{ name: 'XY', expr: 'x*y', value: 12 } ],
		[ 
			{ name: 'X', expr: 'x', value: 3 },
			{ name: 'Y', expr: 'y', value: 9 },
			{ name: 'X^2', expr: 'x*x', value: 9 },
			{ name: 'XY', expr: 'x*y', value: 27 } ],
		[ 
			{ name: 'X', expr: 'x', value: 4 },
			{ name: 'Y', expr: 'y', value: 8 },
			{ name: 'X^2', expr: 'x*x', value: 16 },
			{ name: 'XY', expr: 'x*y', value: 32 } ],
		[ 
			{ name: 'X', expr: 'x', value: 6 },
			{ name: 'Y', expr: 'y', value: 10 },
			{ name: 'X^2', expr: 'x*x', value: 36 },
			{ name: 'XY', expr: 'x*y', value: 60 } 
		] 
	];
	const output = calcVals(input, rectaConfig);
	expected.forEach( (row,rowIndex) => {
		row.forEach( (e, eIndex) => {
			expect(output[rowIndex][eIndex]).toMatchObject(e);
		});
	});
});


test('calcVals with unkown test case. Checking types', function() {
  	const input = [
		{x: 1.12312321, y: 5},
		{x: 13, y: -6.123},
		{x: 3, y: 9.000001},
		{x: 14, y: 8},
		{x: 6, y: 1.25},
	];
	const output = calcVals(input, rectaConfig);
	output.forEach( (row,rowIndex) => {
		row.forEach( (e, eIndex) => {
			expect(e).toMatchObject({
				name: expect.any(String),
				expr: expect.any(String),
				value: expect.any(Number),
			})
		});
	});
});




test('solveEquation test case', function() {
	const vals = [ 
		[ 
			{ name: 'X', expr: 'x', value: 1 },
			{ name: 'Y', expr: 'y', value: 5 },
			{ name: 'X^2', expr: 'x*x', value: 1 },
			{ name: 'XY', expr: 'x*y', value: 5 } 
		],
		[ 
			{ name: 'X', expr: 'x', value: 2 },
			{ name: 'Y', expr: 'y', value: 6 },
			{ name: 'X^2', expr: 'x*x', value: 4 },
			{ name: 'XY', expr: 'x*y', value: 12 } ],
		[ 
			{ name: 'X', expr: 'x', value: 3 },
			{ name: 'Y', expr: 'y', value: 9 },
			{ name: 'X^2', expr: 'x*x', value: 9 },
			{ name: 'XY', expr: 'x*y', value: 27 } ],
		[ 
			{ name: 'X', expr: 'x', value: 4 },
			{ name: 'Y', expr: 'y', value: 8 },
			{ name: 'X^2', expr: 'x*x', value: 16 },
			{ name: 'XY', expr: 'x*y', value: 32 } ],
		[ 
			{ name: 'X', expr: 'x', value: 6 },
			{ name: 'Y', expr: 'y', value: 10 },
			{ name: 'X^2', expr: 'x*x', value: 36 },
			{ name: 'XY', expr: 'x*y', value: 60 } 
		] 
	];
	const eqSolvs = solveEquation(vals);
	expect(eqSolvs.a).toBe(0.97297);
	expect(eqSolvs.b).toBe(4.48649);
})

test('solveEquation unknown test case. Checking types', function() {
	const vals = [ 
		[ 
			{ name: 'X', expr: 'x', value: 41 },
			{ name: 'Y', expr: 'y', value: 5 },
			{ name: 'X^2', expr: 'x*x', value: 1 },
			{ name: 'XY', expr: 'x*y', value: 5 } 
		],
		[ 
			{ name: 'X', expr: 'x', value: 2 },
			{ name: 'Y', expr: 'y', value: 16 },
			{ name: 'X^2', expr: 'x*x', value: 4 },
			{ name: 'XY', expr: 'x*y', value: 12 } ],
		[ 
			{ name: 'X', expr: 'x', value: 3 },
			{ name: 'Y', expr: 'y', value: -29 },
			{ name: 'X^2', expr: 'x*x', value: 9 },
			{ name: 'XY', expr: 'x*y', value: 27 } ],
		[ 
			{ name: 'X', expr: 'x', value: 4 },
			{ name: 'Y', expr: 'y', value: 82 },
			{ name: 'X^2', expr: 'x*x', value: 16 },
			{ name: 'XY', expr: 'x*y', value: 32 } ],
		[ 
			{ name: 'X', expr: 'x', value: 6 },
			{ name: 'Y', expr: 'y', value: 10 },
			{ name: 'X^2', expr: 'x*x', value: 36.3213 },
			{ name: 'XY', expr: 'x*y', value: -60 } 
		] 
	];
	const eqSolvs = solveEquation(vals);
	expect(eqSolvs).toMatchObject({
		a: expect.any(Number),
		b: expect.any(Number),
	})
})



test('errors calc with known params', function() {
	const input = [
		{x: 1, y: 5},
		{x: 2, y: 6},
		{x: 3, y: 9},
		{x: 4, y: 8},
		{x: 6, y: 10},
	];
	const eqSolvs = {
		a: 0.9730,
		b: 4.4865,
	}
	const expectedErrors = [
		{ lineal: 0.4595, cuadratico: 0.21114 },
		{ lineal: 0.4325, cuadratico: 0.18706 },
		{ lineal: -1.5945, cuadratico: 2.54243 },
		{ lineal: 0.3785, cuadratico: 0.14326 },
		{ lineal: 0.3245, cuadratico: 0.1053 }
	];
	const errors = calcError(input, eqSolvs, rectaConfig);
	expect(errors).toHaveLength(input.length);
	errors.forEach( (error, errorIndex) => {
		expect(error).toMatchObject( expectedErrors[errorIndex] )
	});
})



test('errors calc with known params', function() {
	const input = [
		{x: 1, y: 5},
		{x: 2, y: 6},
		{x: 3, y: 9},
		{x: 4, y: 8},
		{x: 6, y: 10},
	];
	const eqSolvs = {
		a: 0.9730,
		b: 4.4865,
	}
	const errors = calcError(input, eqSolvs, rectaConfig);
	expect(errors).toHaveLength(input.length);
	errors.forEach( (error) => {
		expect(error).toMatchObject({
			lineal: expect.any(Number),
			cuadratico: expect.any(Number),
		})
	})
})