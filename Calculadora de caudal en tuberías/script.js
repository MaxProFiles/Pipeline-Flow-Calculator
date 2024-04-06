function calcularCaudal() {
    var diametro = parseFloat(document.getElementById("diametro").value);
    var velocidad = parseFloat(document.getElementById("velocidad").value);

    var area = Math.PI * Math.pow((diametro / 2), 2);
    var caudal = area * velocidad;

    document.getElementById("resultado").innerHTML = "El caudal en la tubería es de " + caudal.toFixed(2) + " metros cúbicos por segundo.";

    // Crear datos para el gráfico
    var labels = [];
    var data = [];
    var step = diametro / 10; // Divide el diámetro en 10 pasos para generar los puntos de la gráfica
    for (var i = 0; i <= diametro; i += step) {
        labels.push(i.toFixed(2));
        data.push(velocidad * (1 - Math.pow((2 * i / diametro - 1), 2)));
    }

    // Dibujar el gráfico
    var ctx = document.getElementById('grafico').getContext('2d');
    if(window.myChart){
      window.myChart.destroy();  // Si el gráfico ya existe, destrúyelo antes de crear uno nuevo
    }
    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Perfil de velocidad del flujo en la tubería',
                data: data,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Distancia (metros)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Velocidad (metros/segundo)'
                    }
                }
            }
        }
    });
}


