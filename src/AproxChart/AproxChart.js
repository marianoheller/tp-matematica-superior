import React, { Component } from 'react';
import * as d3 from "d3";
import d3Tooltip from 'd3-tip';
import config from '../config';
import './AproxChart.css';


export default class AproxChartContainer extends Component {

    render() {
        const { input, method, params } = this.props;        
        const size = {
            width: 800,
            height: 200,
            margin: {
                top: 10,
                right: 10,
                bottom: 20,
                left: 30,
            }
        }
        return <AproxChart size={size} input={input}  method={method} params={params}/>
    }
}

class AproxChart extends Component {


    constructor(props) {
        super(props);

        this.drawChart = this.drawChart.bind(this);
    }

    componentDidUpdate(){
        this.drawChart();
    }

    componentDidMount() {
        this.drawChart();
    }


    drawChart() {
        const { size, input, params, method } = this.props;

        const xScale = d3.scaleLinear()
                        .domain([d3.min(input.map((d) => d.x)), d3.max(input.map((d) => d.x)) ])
                        .range([0, size.width - size.margin.left - size.margin.right]);

        const yScale = d3.scaleLinear()
                        .domain([d3.min(input.map((d) => d.y)), d3.max(input.map((d) => d.y))])
                        .range([size.height - size.margin.top - size.margin.bottom, 0]);

        const tip = d3Tooltip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html( function(d) {
            return `<b>X:</b> ${d.x}<br /><b>Y:</b> ${d.y}<br />`;
        });
                        
        d3.selectAll("#aproxChart > svg").remove();

        const svg = d3.select("#aproxChart")
                    .classed("svg-container", true)
                    .append("svg")
                    .attr("preserveAspectRatio", "xMinYMin meet")
                    .attr("viewBox", `0 0 ${size.width} ${size.height}`)
                    .classed("svg-content", true);

        svg.call(tip);

        // Data points 
        svg.append("g")
        .attr("transform", `translate(${size.margin.left}, ${size.margin.top})`)
        .selectAll("circle")
        .data(input)
        .enter()
        .append("circle")
        .attr('class', 'circle-datapoint')
        .attr("cx", (d) => xScale(d.x) )
        .attr("cy", (d) => yScale(d.y) )
        .attr("r", 5 )
        .attr("fill", "hsl(141, 71%, 48%)")
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide);

        //Data aprox function
        if ( method ) {

            const valueline = d3.line()
            .x( (d) => xScale(d.x) )
            .y( (d) => yScale(d.y) );

            const cantPuntos = 50;
            const methodObj = config.methods.find( (m) => m.name===method );
            if ( !methodObj ) throw new Error("Metodo incorrecto");
            const aproxFunction = methodObj.getFormula( { ...params } );
            const xMin = d3.min(input.map((d) => d.x));
            const xMax = d3.max(input.map((d) => d.x));
            const step = (xMax - xMin)/cantPuntos;

            const dataPoints = (new Array(cantPuntos+1)).fill(0).map( (d,i) => ({
                x: xMin + (i*step),
                y: aproxFunction(xMin + (i*step)),
            }));

            svg.append("g")
            .attr("transform", `translate(${size.margin.left}, ${size.margin.top})`)
            .append("path")
            .attr("class", "line")
            .attr("stroke", "hsl(204, 86%, 53%)")
            .attr("fill", "none")
            .attr("d", valueline(dataPoints));
        }

        // X axis
        svg.append("g")
        .attr("transform", `translate(${size.margin.left}, ${size.height - size.margin.bottom})`)
        .call(d3.axisBottom(xScale));

        
        // Y axis
        svg.append("g")
        .attr("transform", `translate(${size.margin.left}, ${size.margin.top})`)
        .call(d3.axisLeft(yScale));
    }

    render() {
        return (
            <div className="columns" id="aproxChartContainer">
                <div className="column">
                    <div className="title is-4">Gráfico</div>
                    <div id="aproxChart"></div>
                </div>
            </div>
        )
    }
}

