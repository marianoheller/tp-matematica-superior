# TP Matematica superior


## Enunciado

El trabajo práctico consiste en el desarrollo de una aplicación (AMIC - Aproximación por Mínimos
Cuadrados) que permita procesar una serie de datos, no necesariamente exactos, y ajustarlos a
una función de la forma en que se supone estén vinculados.
El objetivo principal es brindar, en base a un conjunto de puntos, una función aproximante de un
grado prefijado que no necesariamente sea interpolador, sino que minimice el error.


La interfaz gráfica deberá ser capaz de interpretar un lote de datos definido como una serie de
puntos de la forma (xn, f(xn)). Así mismo desplegará al usuario un conjunto de opciones, tales como:   

1. Ingresar datos
   + Aproximar mediante:
        * Recta de mínimos cuadrados.
        * Parábola de mínimos cuadrados.
        * Aproximación Exponencial.
        * Aproximación Potencial.
        * Aproximación Hipérbola.
    + Graficar la nube de puntos junto al polinomio encontrado.   
2. Comparar aproximaciones.
3. Finalizar

El procesador de datos contendrá la lógica para poder interpretar cada una de las funcionalidades
que brinda la interfaz de usuario.

##### 1. Ingresar Datos
En primera instancia, solicitará al usuario que ingrese una serie de puntos, junto a
la cantidad de decimales con los que trabajará. De esta forma disponibilizará un conjuntos
de funcionalidades para obtener el función aproximante que minimice el error.
A continuación se detallan las distintas expresiones aproximantes que se brindarán:
1. Recta de mínimos cuadrados
2. Parábola de mínimos cuadrados
3. Aproximación Exponencial
4. Aproximación Potencial
5. Aproximación Hipérbola

El sistema utilizará los puntos ingresados junto a la modelo aproximante para encontrar el
función aproximante.
Luego de elegir el tipo de aproximación que se desea, el usuario podrá seleccionar:
* Mostrar la función aproximante.
* Obtener el detalle del cálculo, es decir, la tabla de sumatorias como así también
el sistema utilizado para resolver.
* Visualizar la distribución de puntos junto a la gráfica de la función encontrada en un mismo sistema de referencia.

##### 2. Comparar Aproximaciones
La opción de Comparar Aproximaciones, otorgará al usuario una tabla que logra
diferenciar los distintos modelos (uno o más), mostrando el error asumido sobre cada
uno de ellos. 
La tabla contendrá la siguiente información:

| i  | Xi| Yi | Mod1 | ... | Mod n | Error Mod1 | ... | Error Mod n
| -- | --|--- | -- | -- | -- |-- |-- |-- |
| 1  | X1| Y1 | 
| .. | ..| .. | 
|  n | Xn |Yn | 

De manera adicional, mostrará por pantalla cual es el que mejor se aproxima a la función que dio origen a ese conjunto de datos.
##### 3. Finalizar
Con la opción finalizar, el usuario podrá terminar con todas las operaciones que estaba
realizando y así dar origen a un nuevo set de datos o incluso salir del programa.

## Desarrollo

Para agregar un nuevo metodo se debe agregar el metodo a la configuracion.
```javascript
{
    decimals: [ "0", "1", "2", "3", "4", "5" ],
    methods: [
        {
            name: "MI_METODO",
            enabled: false,
            formulaToShow: "A*x^2+B+x",
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
                    return a*Math.pow(x)+b+x;
                }
            },
        },
    ]
}
```
A su vez se debera crear la funcion resolvente en la carpeta Engine. Esta toma como inputs un array como este:
```javascript
const input = [
    {x: 1, y: 5},
    {x: 2, y: 6},
    {x: 3, y: 9},
    {x: 4, y: 8},
    {x: 6, y: 10},
];
```
Y tiene como output un objecto como este: 
```javascript
const output = {
    //El formato de vals se puede 'clonar' de la configuracion y agregandole el valor (value) calculado
    vals: [
        [ { name: String, expr: String, value: Number}, {}, {}],
        ...,
    ],
    //Params es un object que contiene los parametros necesarios para la recta
    params: {},
    //Y errors es un Array de longitud igual a la de input pero conteniendo un object con el error lineal y cuadratico de cada par x,y
    errors: [ 
        { lineal: Number, cuadratico: Number },
        ...,
    ]
};
```
Como comentario, esta bueno dividir la function resolvente en pequeños modulos que calculen cada parametro del objeto output para facilitar el testeo. Por ej, una funcion que calcula los vals, otra que calcula los params y otra q calcula los errors.   

Una vez todo testeado, se importa el resolvente al Engine/engine.js y se lo agrega al Array de solvers. Por ultimo se configura el metodo como 'enabled' en el archivo config.js para habilitar su uso a travez de la interfaz grafica.