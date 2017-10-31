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

## Deployment
Para ejecutar la aplicación localmente, ejecutar los siguientes comandos:
```
npm run install
npm run start
```

## Desarrollo

El sistema cuenta con una funcion que se encarga de resolver cualquier metodo *bien* configurado.
Por lo que para agregar un metodo solo hace actualizar el archivo de configuracion con el metodo deseado e implementar los testeos correspondients.
El objecto de configuracion posee un array de metodos, en él se deberá agregar el nuevo metodo. El metodo posee una estructura como la siguiente:
```javascript
{
    name: "MI_METODO",
    enabled: true,
    formulaToShow: "A*asdasd*x*x+B",
    //Cada elemento de vals indica una 'columna' en la tabla de calculo vista en clase
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
    //Es importante que los valores de la matriz matcheen con los vals.name
    matrix: {
        M: [ ["X^2", "X"], ["X", "I"] ],
        b: [ "XY", "Y"]
    },
    //Esta funcion se ejecuta luego de resolver la matriz para transformar los valor A,B vistos en clase (linealizados) a los valores a,b de el metodo aproximante original
    transformParams: ( paramsArr ) => {
        return { 
            a: paramsArr[0],
            b: paramsArr[1],
            c: paramsArr[2]
        }
    },
    //Esta formula es la utilizada para calcular la funcion aproximante (para graficar y para el error)
    getFormula: ( { a, b }) => {
        return (x) => {
            return a*x+b;
        }
    },
},
```
La function resolvente toma como input un array como este:
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