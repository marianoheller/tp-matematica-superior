export default  {
    decimals: [ "0", "1", "2", "3", "4", "5" ],
    methods: [
        {
            name: "Recta",
            enabled: true,
            formulaToShow: "a*x+(b)",
            vals: [
                {
                    name: "X",
                    calc: ( {x, y} ) => x,
                },
                {
                    name: "Y",
                    calc: ( {x, y} ) => y,
                },
                {
                    name: "X^2",
                    calc: ( {x, y} ) => Math.pow(x,2),
                },
                {
                    name: "XY",
                    calc: ( {x, y} ) => x*y,
                },
            ],
            matrix: {
                M: [ ["X^2", "X"], ["X", "I"] ],
                b: [ "XY", "Y"]
            },
            transformParams: ( paramsArr ) => {
                return {
                    a: paramsArr[0],
                    b: paramsArr[1]
                }
            },
            getFormula: ( { a, b }) => {
                return (x) => {
                    return a*x+b;
                }
            },
        },
        {
            name: "Parabola",
            enabled: true,
            formulaToShow: "a*x^2 + b*x + (c)",
            vals: [
                {
                    name: "X",
                    calc: ( {x, y} ) => x,
                },
                {
                    name: "Y",
                    calc: ( {x, y} ) => y,
                },
                {
                    name: "X^2",
                    calc: ( {x, y} ) => Math.pow(x,2),
                },
                {
                    name: "X^3",
                    calc: ( {x, y} ) => Math.pow(x,3),
                },
                {
                    name: "X^4",
                    calc: ( {x, y} ) => Math.pow(x,4),
                },
                {
                    name: "XY",
                    calc: ( {x, y} ) => x*y,
                },
                {
                    name: "YX^2",
                    calc: ( {x, y} ) => y*Math.pow(x,2),
                },
            ],
            matrix: {
                M: [ ["X^4", "X^3", "X^2"], ["X^3", "X^2", "X"], ["X^2", "X", "I"] ],
                b: [ "YX^2", "XY", "Y"]
            },
            transformParams: ( paramsArr ) => {
                return {
                    a: paramsArr[0],
                    b: paramsArr[1],
                    c: paramsArr[2]
                }
            },
            getFormula: ( { a, b, c }) => {
                return (x) => {
                    return a*Math.pow(x,2) + b*x + c;
                }
            },
        },
        {
            name: "Exponencial",
            enabled: true,
            vals: [
                {
                    name: "X",
                    calc: ( {x, y} ) => x,
                },
                {
                    name: "Y",
                    calc: ( {x, y} ) => Math.log(y),
                },
                {
                    name: "X^2",
                    calc: ( {x, y} ) => Math.pow(x,2),
                },
                {
                    name: "XY",
                    calc: ( {x, y} ) => x*(Math.log(y)),
                },
            ],
            matrix: {
                M: [ ["X^2", "X"], ["X", "I"] ],
                b: [ "XY", "Y"]
            },
            formulaToShow: "b*e^(a*x)",
            transformParams: ( paramsArr ) => {
                return {
                    a: paramsArr[0],
                    b: Math.exp(paramsArr[1])
                }
            },
            getFormula: ( { a, b }) => {
                return (x) => {
                    return b*Math.exp(a*x);
                }
            },
        },
        {
            name: "Potencial",
            enabled: true,
            vals: [
                {
                    name: "X",
                    calc: ( {x, y} ) => Math.log(x),
                },
                {
                    name: "Y",
                    calc: ( {x, y} ) => Math.log(y),
                },
                {
                    name: "X^2",
                    calc: ( {x, y} ) => Math.pow(Math.log(x),2),
                },
                {
                    name: "XY",
                    calc: ( {x, y} ) => Math.log(x)*(Math.log(y)),
                },
            ],
            matrix: {
                M: [ ["X^2", "X"], ["X", "I"] ],
                b: [ "XY", "Y"]
            },
            formulaToShow: "b*x^a",
            transformParams: ( paramsArr ) => {
                return {
                    a: paramsArr[0],
                    b: Math.exp(paramsArr[1])
                }
            },
            getFormula: ( { a, b }) => {
                return (x) => {
                    return b*Math.pow(x,a);
                }
            },
        },
        {
            name: "Hiperbola",
            enabled: true,
            vals: [
                {
                    name: "X",
                    calc: ( {x, y} ) => 1/x,
                },
                {
                    name: "Y",
                    calc: ( {x, y} ) => 1/y,
                },
                {
                    name: "X^2",
                    calc: ( {x, y} ) => Math.pow(1/x,2),
                },
                {
                    name: "XY",
                    calc: ( {x, y} ) => (1/x)*(1/y),
                },
            ],
            matrix: {
                M: [ ["X^2", "X"], ["X", "I"] ],
                b: [ "XY", "Y"]
            },
            formulaToShow: "a*x/(x+(b))",
            transformParams: ( paramsArr ) => {
                return {
                    a: (1/paramsArr[1]),
                    b: (1/paramsArr[1])*paramsArr[0]
                }
            },
            getFormula: ( { a, b }) => {
                return (x) => {
                    return a*x/(x+b);
                }
            },
        },
		        {
            name: "Hiperbola Simple",
            enabled: true,
            vals: [
                {
                    name: "X",
                    calc: ( {x, y} ) => x,
                },
                {
                    name: "Y",
                    calc: ( {x, y} ) => 1/y,
                },
                {
                    name: "X^2",
                    calc: ( {x, y} ) => Math.pow(x,2),
                },
                {
                    name: "XY",
                    calc: ( {x, y} ) => (x)*(1/y),
                },
            ],
            matrix: {
                M: [ ["X^2", "X"], ["X", "I"] ],
                b: [ "XY", "Y"]
            },
            formulaToShow: "a/(x+(b))",
            transformParams: ( paramsArr ) => {
                return {
                    a: 1/paramsArr[0],
                    b: (1/paramsArr[0])*paramsArr[1]
                }
            },
            getFormula: ( { a, b }) => {
                return (x) => {
                    return a/(x+b);
                }
            },
        }
    ]
}
