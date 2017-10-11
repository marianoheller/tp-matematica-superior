
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
                    expr: "x",
                },
                {
                    name: "Y",
                    expr: "y",
                },
                {
                    name: "X^2",
                    expr: "x*x",
                },
                {
                    name: "XY",
                    expr: "x*y",
                },
            ],
            getFormula: ( { a, b }) => {
                return (x) => {
                    return a*x+b;
                }
            },
        },
        {
            name: "Exponencial",
            enabled: false,
            formulaToShow: "B*e^(A*x)",
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
        {
            name: "Parabola",
            enabled: false,
            formulaToShow: "A*x^2 + B*x + C",
            getFormula: ( { a, b, c }) => {
                return (x) => {
                    return a*Math.pow(x,2) + b*x + c;
                }
            },
        },
    ]
}