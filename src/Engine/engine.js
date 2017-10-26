import math from 'mathjs';
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

	try {
		var x = math.lusolve(M, b);
	} catch(e) {
		//Trato de salvar las papas cuando la matriz es singular
		const params = config.transformParams( config.matrix.b.map( () => 0) );
		return Object.keys(params).reduce( (acc,key) => {
			acc[key] = 0;
			return acc;
		}, {});
	}
	

	const params = config.transformParams(x.map((v) => v[0]));

	return Object.keys(params).reduce( (acc,key) => {
		acc[key] = parseFloat(params[key].toFixed(5))
		return acc;
	}, {});
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