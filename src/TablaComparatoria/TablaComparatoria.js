import React, { Component } from 'react';
import config from '../config';
import './TablaComparatoria.css';


export default class TablaComparatoria extends Component {

    constructor(props) {
        super(props);

        this.state = {
            allResults: [],
        }
    }

    handleClickCalcular() {
        const { getAllResults } = this.props;
        const allResults = getAllResults();
        this.setState({
            allResults: allResults,
        })
    }

    render() {
        const { inputs, decimals } = this.props;
        const { allResults } = this.state;
        return (
        <div>
            <div className="columns" id="tablaComparatoriaContainer">
                <div className="column">
                    <div className="title is-4">Tabla comparatoria</div>
                    <div className="has-text-centered is-hidden-mobile">
                        <button 
                        className="button is-primary is-pulled-right" 
                        onClick={this.handleClickCalcular.bind(this)}
                        >
                        Calcular todo
                        </button>
                    </div>
                    <div className="has-text-centered is-hidden-tablet">
                        <button 
                        className="button is-primary" 
                        onClick={this.handleClickCalcular.bind(this)}
                        >
                        Calcular todo
                        </button> 
                    </div>

                </div>
            </div>
                    
            <div className="tablaContainer">
                <table className="tablaComparatoria" className="table is-fullwidth is-striped is-narrow center-table is-bordered" >
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
                            const result = allResults[i];
                            return (       
                                <tr key={`rowSumatoria${i}`} >
                                    <td>{i}</td>
                                    <td>{input.x}</td>
                                    <td>{input.y}</td>
                                    <td>{}</td>
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