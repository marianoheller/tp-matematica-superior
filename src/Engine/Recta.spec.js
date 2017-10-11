import { calcVals, solveEquation, calcError } from './Recta'
import config from '../config';

const rectaConfig = config.methods.find( (m) => m.name === "Recta" );
if ( !rectaConfig ) throw new Error("No se pudo encontrar el metodo 'Recta' en la configuracion");

test('calcVals', function() {
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
	expected.forEach( (e,i) => {
		expect(output[i].x).toBe(e.x);
		expect(output[i].y).toBe(e.y);
		expect(output[i].x).toBe(e.x);
		expect(output[i].x).toBe(e.x);
	});
});

/*

test('solveEquation', function() {
	const vals = {
		sumX: 16,
		sumY: 38,
		sumXY: 136,
		sumXX: 66,
		length: 5,
	}
	const eqSolvs = solveEquation(vals);
	expect(eqSolvs.a).toBe(0.973);
	expect(eqSolvs.b).toBe(4.4865);
})


test('solveEquation', function() {
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
	const errors = calcError(input, eqSolvs);
	expect(errors.normal).toBe(0.0005);
	expect(errors.cuadratico).toBe(3.1892);
})

*/