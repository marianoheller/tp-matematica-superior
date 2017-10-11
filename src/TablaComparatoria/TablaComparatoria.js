import React, { Component } from 'react';
import config from '../config';
import './TablaComparatoria.css';


export default class TablaComparatoria extends Component {
    render() {
        const { inputs, decimals } = this.props;
        return (
            <div className="columns" id="tablaComparatoriaContainer">
                <div className="column">
                    <div className="title is-4">Tabla comparatoria</div>
                    <table className="table is-fullwidth is-striped is-narrow center-table is-bordered" >
                        <thead>
                            <tr>
                                <th colSpan={3}>Datos</th>
                                <th colSpan={config.methods.filter((m) => m.enabled).length}>Modelos aprox.</th>
                                <th colSpan={config.methods.filter((m) => m.enabled).length}>Error</th>
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
                            {inputs.map( (input,i) => {
                                return (       
                                    <tr key={`rowSumatoria${i}`} >
                                        <td>{i}</td>
                                        <td>{parseFloat(input.x.toFixed(decimals))}</td>
                                        <td>{parseFloat(input.y.toFixed(decimals))}</td>
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