import Recta from './Recta';
import config from '../config';


const solvers = {
	Recta,
}


export default (input, type) => {
	const methodConfig = config.methods.find( (m) => m.name===type );
	if ( !methodConfig ) throw new Error("Configuracion de metodo erroneo o inexistente");
	if ( !solvers[type] ) throw new Error("Metodo aproximante erroneo o inexistente");
	return solvers[type](input, methodConfig);
}