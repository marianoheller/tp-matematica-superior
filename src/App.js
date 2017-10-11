import React, { Component } from 'react';
import AproxChart from './AproxChart/AproxChart';
import Input from './Input/Input.js';
import TablaSumatoria from './TablaSumatoria/TablaSumatoria';
import TablaComparatoria from './TablaComparatoria/TablaComparatoria';
import 'bulma/css/bulma.css';
import './App.css';
import config from './config';

import Aproximador from './Engine/engine';

const initInput = [
	{x: "1", y: "5"},
	{x: "2", y: "6"},
	{x: "3", y: "9"},
	{x: "4", y: "8"},
	{x: "6", y: "10"}
];

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			input: initInput,
			vals: {},
			params: {},
			errors: {},
			method: "",
			decimals: config.decimals[1],
		}
		this.setInput = this.setInput.bind(this);
		this.setDecimals = this.setDecimals.bind(this);
		this.setMethod = this.setMethod.bind(this);
	}

	getCaretCharacterOffsetWithin(element) {
		if ( !element ) return;
		let caretOffset = 0;
		const doc = element.ownerDocument || element.document;
		const win = doc.defaultView || doc.parentWindow;
		let sel;
		if (typeof win.getSelection !== "undefined") {
			sel = win.getSelection();
			if (sel.rangeCount > 0) {
				const range = win.getSelection().getRangeAt(0);
				const preCaretRange = range.cloneRange();
				preCaretRange.selectNodeContents(element);
				preCaretRange.setEnd(range.endContainer, range.endOffset);
				caretOffset = preCaretRange.toString().length;
			}
		} 
		else if ( (sel = doc.selection) && sel.type !== "Control") {
			const textRange = sel.createRange();
			const preCaretTextRange = doc.body.createTextRange();
			preCaretTextRange.moveToElementText(element);
			preCaretTextRange.setEndPoint("EndToEnd", textRange);
			caretOffset = preCaretTextRange.text.length;
		}
		return caretOffset;
	}

	setInput(input, el) {
		const { method, decimals } = this.state;

		const caretOldPos = this.getCaretCharacterOffsetWithin(el);
		const caretCallback = () => {
			if ( !el ) return; //no element to caret
			if ( !el.childNodes[0] ) return; //empty cell
			var range = document.createRange();
			var sel = window.getSelection();
			
			range.setStart(el.childNodes[0], caretOldPos);
			range.collapse(true);
			sel.removeAllRanges();
			sel.addRange(range);
		};

		if ( !method ) {
			this.setState({ 
				input: input,
				vals: {},
				params: {},
				errors: {},
			}, caretCallback);
			return;
		}
		const resultados = Aproximador( this.parseInput(input, decimals) , method);
		this.setState({
			...resultados,
			input: input,
		}, caretCallback);
	}

	setDecimals(e) {
		const { method, input } = this.state;		
		const decimals = e.target.value;
		if ( !method ) {
			this.setState({ 
				decimals: decimals,
				vals: {},
				params: {},
				errors: {},
			});
			return;
		}
		const resultados = Aproximador( this.parseInput(input, decimals) , method);
		this.setState({
			...resultados,
			input: input,
			decimals: decimals,
		});
	}

	setMethod(e) {
		const method = e.target.value;
		const { input, decimals } = this.state;
		if ( !method ) {
			this.setState({ 
				method: method,
				vals: [],
				params: {},
				errors: [], 
			});
			return;
		}
		const resultados = Aproximador( this.parseInput(input, decimals)  , method);
		this.setState({
			...resultados,
			method: method,
		});
	}

	parseInput(input, decimals) {
		return input.filter((d) => d.x && d.y).map((d) => {
			return {
				x: parseFloat(parseFloat(d.x).toFixed(parseInt(decimals, 10))),
				y: parseFloat(parseFloat(d.y).toFixed(parseInt(decimals, 10)))
			}
		});
	}

	render() {
		const { input, decimals, method, params, vals } = this.state;
		return (
		<section className="section">
			<div className="columns">
				<div className="column">
					<div className="title is-2 has-text-centered" id="mainTitle">TP - Matemática superior</div>
					<div className="container">
						<div>
							<Input 
							setInput={this.setInput}
							input={input}
							setDecimals={this.setDecimals}
							decimals={decimals}
							setMethod={this.setMethod}
							method={method}
							/>
						</div>
						<div >
							<AproxChart input={this.parseInput(input, decimals)} method={method} params={params}/>
						</div>
						<div>
							<TablaSumatoria params={params} vals={vals} decimals={decimals}/>
						</div>
						<div>
							<TablaComparatoria inputs={this.parseInput(input, decimals)} decimals={decimals}/>
						</div>
					</div>
				</div>
			</div>
		</section>
		);
	}
}


export default App;
