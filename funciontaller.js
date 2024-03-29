function consumirApi1() {
    var endPoint1 = "https://restcountries.com/v3.1/all"; 

    fetch(endPoint1)
    .then(function(response1){
        return response1.json();
    })
    .then(function(data1){
        var continentes = {};
        var colores = ['blue', 'green', 'red', 'purple', 'orange'];
        var poblacion = [];
        var pais = [];

        
        data1.forEach(function(paisData) {
            var continents = paisData.continents;
            if (["Europe", "Asia", "South America"].includes(continents[0])) {
                continents.forEach(function(cont) {
                    if (!continentes[cont]) {
                        continentes[cont] = colores.shift();
                    }
                });

                poblacion.push(paisData.population);
                pais.push(paisData.name.common);
            }
        });

        var grafica1 = [
            {
                x: pais,
                y: poblacion,
                type: 'bar',
                marker: {
                    color: pais.map(function(p) {
                        return continentes[data1.find(function(item) {
                            return item.name.common === p;
                        }).continents[0]];
                    })
                }
            }
        ];

        Plotly.newPlot('myDiv1', grafica1);
    })
    .catch(function(error1){
        console.log("Error: " + error1);
    });
}


function consumirApi2(){
    var endPoint2 = "http://127.0.0.1:5000/generar-datos"; 
    fetch(endPoint2)
    .then(function(response2){
        return response2.json();
    })
    .then(function(data2){
        var contrasenasMas8 = data2.filter(function(usuario) {
            return usuario.contrasena.length > 8;
        });

        var tiposDeDominios = {};

        data2.forEach(function(usuario) {
            var dominio = usuario.correo.split('@')[1]; 
            tiposDeDominios[dominio] = (tiposDeDominios[dominio] || 0) + 1; 
        });

        var cantidadContraseñasMas8 = contrasenasMas8.length;

        var grafica2 = [
            {
                x: ['Contraseñas mayores a 8 caracteres'],
                y: [cantidadContraseñasMas8],
                type: 'bar',
                name: 'grafica2'
            }
        ];

        var grafica3 = [
            {
                labels: Object.keys(tiposDeDominios),
                values: Object.values(tiposDeDominios),
                type: 'pie',
                name: 'grafica3'
            }
        ];

        Plotly.newPlot('myDiv2', [grafica2[0]]);
        Plotly.newPlot('myDiv3', [grafica3[0]]);
    })
    .catch(function(error2){
        console.log("Error: " + error2);
    });
}



