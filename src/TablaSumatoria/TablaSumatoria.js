import React, { Component } from 'react';
import "./TablaSumatoria.css";


export default class TablaSumatoria extends Component {
    render() {
        const { vals, decimals } = this.props;
        if (!vals.length ) return <div></div>
        return (
            <div className="columns" id="tablaSumatoriaGlobalContainer">
                <div className="column">
                    <div className="title is-4">Detalles de cálculo</div>
                    <div className="tablaContainer">
                        <table id="tablaSumatoria" className="table is-fullwidth is-striped is-narrow center-table is-bordered" >
                            <thead>
                                <tr>
                                    <th key={`headI`}>I</th>
                                    { vals[0].map( (valType,i) => <th key={`head${i}`}>{valType.name}</th> )}
                                </tr>
                            </thead>
                            <tbody>
                                {/* DATA */}
                                {vals.map( (r,i) => {
                                    return (       
                                        <tr key={`rowSumatoria${i}`} >
                                            <td >{i}</td>
                                            { r.map( (val, valI) => {
                                                return (
                                                <td key={`itemSumatoria${i}${valI}`}>
                                                    {parseFloat(val.value.toFixed(decimals))}
                                                </td>
                                            ) }) }
                                        </tr>
                                    )
                                })}
                                
                                {/* SUMATORIA DE LA DATA (final row) */}
                                <tr key={`rowSumatoria${vals.length}`} >
                                    <td ><b>Sumatorias</b></td>
                                    {/* aca quizas conviene que en vez de usar vals[0] utilize config.vals[method] */}
                                    { vals[0].map( (field, fieldIndex) => {
                                        let sum = vals.reduce((a,b) => a += b.find( (v) => v.name===field.name).value, 0)
                                        sum = parseFloat(sum.toFixed(decimals));
                                        return <td key={`itemSumatoria${vals.length}${fieldIndex}`}><b>{sum}</b></td>
                                    }) }
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}