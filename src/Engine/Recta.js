const math = require('mathjs');

export default function aproxRecta(inputs, config) {
	const vals = calcVals(inputs, config);
	const params = solveEquation(vals);
	const errors = calcError(inputs, params, config);
	console.log(errors);
	return {
		vals,
		params,
		errors,
	}
}



export function calcVals(inputs, config) {
	if ( typeof(inputs) !== "object") throw new Error("Worng input type");
	return inputs.map( (input) => {
		return config.vals.map( (valConfig) => {
			return {
				...valConfig,
				value: math.eval(valConfig.expr, input),
			}
		})
	});
}


export function solveEquation(vals) {
	const sumAllFields = (vals, fieldName) => {
		return vals.reduce((a,b) => a += b.find( (v) => v.name===fieldName).value, 0)
	}
	const M = [
		[
			sumAllFields(vals, "X^2"),
			sumAllFields(vals, "X")
		],
		[
			sumAllFields(vals, "X"),
			vals.length
		]
	];
	const b = [ 
		sumAllFields(vals, "XY"),
		sumAllFields(vals, "Y")
	];

	var x = math.lusolve(M, b);

	return {
		a: parseFloat(x[0][0].toFixed(4)),
		b: parseFloat(x[1][0].toFixed(4)),
	}
}

export function calcError(inputs, params, config) {
	const aprox = config.getFormula({...params});

	return inputs.map( (input) => {
		return {
			lineal: aprox(input.x) - input.y,
			cuadratico: math.pow(aprox(input.x) - input.y, 2),
		}
	} );
}	