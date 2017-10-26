import React, { Component } from 'react';
import config from '../config';
import './TablaComparatoria.css';


export default class TablaComparatoria extends Component {
    
    calcularDataTable() {
        const { getAllResults, inputs } = this.props;
        const allResults = getAllResults();
        const aproximantes = allResults.map( (objRes) => {
            return config.methods.find( (m) => m.name===objRes.method ).getFormula({ ...objRes.results.params});
        } );
        return inputs.map( (input, inputIndex) => {
            const aproxRow = aproximantes.map( (aprox) => aprox(input.x) );
            const errorRow = allResults.map( (objRes) => {
                return objRes.results.errors[inputIndex].cuadratico;
            })
            return [inputIndex, input.x, input.y, ...aproxRow, ...errorRow];
        });
    }

    render() {
        const { inputs, decimals } = this.props;

        const { input } = this.props;
        if ( !inputs.length ) return <div></div>

        return (
        <div>
            <div className="columns" id="tablaComparatoriaContainer">
                <div className="column">
                    <div className="title is-4">Tabla comparatoria</div>
                </div>
            </div>
                    
            <div className="tablaContainer">
                <table id="tablaComparatoria" className="table is-fullwidth is-striped is-narrow center-table is-bordered" >
                    <thead>
                        <tr>
                            <th colSpan={3}>Datos</th>
                            <th colSpan={config.methods.filter((m) => m.enabled).length}>Modelos aprox.</th>
                            <th colSpan={config.methods.filter((m) => m.enabled).length}>Error cuadrático</th>
                        </tr>
                        <tr>
                            <th>I</th>
                            <th>Xi</th>
                            <th>Yi</th>

                            {config.methods.filter((m) => m.enabled).map( (m,i) => {
                                return <th key={`headMethods${i}`}>{m.name}</th>
                            })}

                            {config.methods.filter((m) => m.enabled).map( (m,i) => {
                                return <th key={`headErrors${i}`}>{m.name}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {/* Seccion datos */}
                        {(this.calcularDataTable()).map( (rowData,i) => {
                            return (       
                                <tr key={`rowSumatoria${i}`} >
                                    { rowData.map( (cellData, ci) => 
                                        <td key={`cellData${ci}`}>{parseFloat(cellData.toFixed(decimals))}</td> 
                                    )}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>    
        )
    }
}