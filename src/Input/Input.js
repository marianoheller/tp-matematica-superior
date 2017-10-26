import React, { Component } from 'react';
import './Input.css';
import config from '../config';



export default class InputContainer extends Component {


    render() {
        const { 
            setInput, input, 
            setDecimals, decimals, 
            setMethod, method 
        } = this.props;
        return (
            <div>
                <div className="columns">
                    <div className="column">
                        <div className="field">
                            <label className="label">Métodos</label>
                            <div className="control">
                                <div className="select is-fullwidth">
                                    <select name="methods" value={method} onChange={setMethod}>
                                        <option value={""}>Elija método de aprox.</option>
                                        {config.methods.filter((m) => m.enabled).map( (m,i) => {
                                            return (
                                                <option key={`method${i}`} value={m.name}>{m.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div className="field">
                            <label className="label">Decimales</label>
                            <div className="control">
                                <div className="select is-fullwidth">
                                    <select name="decimals" value={decimals} onChange={setDecimals}>
                                        {config.decimals.map( (d) => {
                                            return (
                                                <option key={`decimal${d}`} value={d}>{d}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="columns">
                    <div className="column">
                        <InputTable setInput={setInput} input={input} />
                    </div>
                </div>
            </div>
        )
    }
}



class InputTable extends Component {

    constructor(props) {
        super(props);

        this.deleteRow = this.deleteRow.bind(this);
        this.addRow = this.addRow.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    deleteRow(numRow) {
        const { input, setInput } = this.props; 
        return () => {
            setInput( input.filter( (d,i) => i!==numRow ) );
        }
    }
    
    addRow() {
        const { setInput, input } = this.props;
        setInput( [ ...input, { x: "", y: ""} ]);
    }

    handleEdit( index, key) {
        const { setInput, input } = this.props;
        return (e) => {
            e.preventDefault();
                        
            setInput( input.map( (d,i) => {
                if ( index !== i ) return d;
                return { ...d, [key]: e.currentTarget.innerHTML };
            }), e.target );
        }
    }
    
    render() {
        const { input } = this.props; 
        return(
            <div id="inputContainer">
                <div className="columns">
                    <div className="column">
                        <div className="title is-4">Ingrese los datos</div>
                    </div>
                    <div className="column">
                        <div className="has-text-centered is-hidden-mobile">
                            <button 
                            className="button is-primary is-pulled-right" 
                            onClick={this.addRow}
                            >
                            Add row
                            </button>
                        </div>
                        <div className="has-text-centered is-hidden-tablet">
                            <button 
                            className="button is-primary" 
                            onClick={this.addRow}
                            >
                            Add row
                            </button> 
                        </div>
                        
                    </div>
                </div>
                <div className="tablaContainer">
                    <table className="table is-fullwidth is-striped is-narrow center-table is-bordered" >
                        <thead>
                            <tr>
                                <th>Num</th>
                                <th>X</th>
                                <th>Y</th>
                                <th>Del</th>
                            </tr>
                        </thead>
                        <tbody>
                            {input.map( (d, i) => {
                                return (
                                    <tr key={`input${i}`}>
                                        <th>{i}</th>
                                        <td 
                                        contentEditable="true" 
                                        suppressContentEditableWarning={true}
                                        onInput={this.handleEdit(i, "x")}
                                        >
                                        {d.x}
                                        </td>
                                        <td 
                                        contentEditable="true" 
                                        suppressContentEditableWarning={true}
                                        onInput={this.handleEdit(i, "y")}
                                        >
                                        {d.y}
                                        </td>
                                        <td>
                                            <button className="deleteRowButton button is-danger" onClick={this.deleteRow(i)} >
                                                X
                                            </button>
                                        </td>
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