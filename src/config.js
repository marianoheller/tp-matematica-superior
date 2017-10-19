
export default  {
    decimals: [ "0", "1", "2", "3", "4", "5" ],
    methods: [
        {
            name: "Recta",
            enabled: true,
            formulaToShow: "A*x+B",
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
            transformParams: ( {a, b} ) => {
                return { a, b }
            },
            getFormula: ( { a, b }) => {
                return (x) => {
                    return a*x+b;
                }
            },
        },
        {
            name: "Parabola",
            enabled: false,
            formulaToShow: "a*x^2 + b*x + c",
            getFormula: ( { a, b, c }) => {
                return (x) => {
                    return a*Math.pow(x,2) + b*x + c;
                }
            },
        },
        {
            name: "Exponencial",
            enabled: false,
            formulaToShow: "b*e^(a*x)",
            getFormula: ( { a, b }) => {
                return (x) => {
                    return b*Math.exp(a*x);
                }
            },
        },
        {
            name: "Potencial",
            enabled: false,
            formulaToShow: "B*x^A",
            getFormula: ( { a, b }) => {
                return (x) => {
                    return b*Math.pow(x, a);
                }
            },
        },
        {
            name: "Hiperbola",
            enabled: false,
            formulaToShow: "A/(x+B)",
            getFormula: ( { a, b }) => {
                return (x) => {
                    return a/(x+b);
                }
            },
        },
    ]
}