export const barChart = {
    data: (label, field, data, color, canvas) => {
        let dataNilai = []
        let dataNama = []
        data.map(i => {
            dataNilai.push(i[field])
            dataNama.push(i.nama_mahasiswa)
            return null
        })

        let ctx = canvas.getContext("2d");
        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
        gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
        gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
        gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors

        return {
            labels: dataNama,
            datasets: [
                {
                    label,
                    fill: true,
                    borderColor: color,
                    backgroundColor: gradientStroke,
                    hoverBackgroundColor: gradientStroke,
                    borderWidth: 2,
                    borderDash: [],
                    borderDashOffset: 0.0,
                    data: dataNilai
                }
            ]
        };
    },
    options: {
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        tooltips: {
            backgroundColor: "#f5f5f5",
            titleFontColor: "#333",
            bodyFontColor: "#666",
            bodySpacing: 4,
            xPadding: 12,
            mode: "nearest",
            intersect: 0,
            position: "nearest"
        },
        responsive: true,
        scales: {
            yAxes: [
                {
                    gridLines: {
                        drawBorder: false,
                        color: "rgba(225,78,202,0.1)",
                        zeroLineColor: "transparent"
                    },
                    ticks: {
                        suggestedMin: 60,
                        suggestedMax: 120,
                        padding: 20,
                        fontColor: "#9e9e9e"
                    }
                }
            ],
            xAxes: [
                {
                    gridLines: {
                        drawBorder: false,
                        color: "rgba(225,78,202,0.1)",
                        zeroLineColor: "transparent"
                    },
                    ticks: {
                        padding: 20,
                        fontColor: "#9e9e9e"
                    }
                }
            ]
        }
    }
};