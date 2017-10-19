const math = require('mathjs');
import config from '../config';


export default (input, type) => {
	const methodConfig = config.methods.find( (m) => m.name===type );
	if ( !methodConfig ) throw new Error("Configuracion de metodo erroneo o inexistente");
	return aproximador(input, methodConfig);
}



function aproximador(inputs, config) {
	const vals = calcVals(inputs, config);
	const params = solveEquation(vals, config);
	const errors = calcError(inputs, params, config);
	return {
		vals,
		params,
		errors,
	}
}



export function calcVals(inputs, config) {
	if ( typeof(inputs) !== "object") throw new Error("Worng input type");
	if ( inputs.some( (row) => typeof(row.x)!=="number" || typeof(row.y)!=="number" )) throw new Error("Wrong field type");
	return inputs.map( (input) => {
		return config.vals.map( (valConfig) => {
			return {
				...valConfig,
				value: valConfig.calc(input),
			}
		})
	});
}


export function solveEquation(vals, config) {
	const sumAllFields = (vals, fieldName) => {
		if ( fieldName=== "I") return vals.length;
		return vals.reduce((a,b) => a += b.find( (v) => v.name===fieldName).value, 0);
	}

	const M = config.matrix.M.map( (rowMatrix) => rowMatrix.map((e) => sumAllFields(vals, e) ));
	const b = config.matrix.b.map( (e) => sumAllFields(vals, e) );

	const x = math.lusolve(M, b);

	return {
		a: parseFloat(x[0][0].toFixed(5)),
		b: parseFloat(x[1][0].toFixed(5)),
	}
}

export function calcError(inputs, params, config) {
	const aprox = config.getFormula({...params});

	return inputs.map( (input) => {
		return {
			lineal: parseFloat((aprox(input.x) - input.y).toFixed(5)),
			cuadratico: parseFloat(math.pow(aprox(input.x) - input.y, 2).toFixed(5)),
		}
	} );
}	