import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

export default function RainfallGraph({ data, selectedDate }) {
    const prepareRainfallPieData = (data, dateSelected) => {
        if (!Array.isArray(data) || data.length === 0) {
            return {
                labels: ['No Data'],
                datasets: [{
                    data: [1],
                    backgroundColor: ['rgba(200, 200, 200, 0.6)'],
                    borderColor: ['rgba(200, 200, 200, 1)'],
                    borderWidth: 1
                }]
            };
        }

        let filteredData = data;
        
        if (dateSelected) {
            const selectedDateStr = new Date(dateSelected).toISOString().split('T')[0];
            filteredData = data.filter(item => {
                const itemDate = new Date(item.timestamp).toISOString().split('T')[0];
                return itemDate === selectedDateStr;
            });
        }

        let rainCount = 0;
        let noRainCount = 0;

        filteredData.forEach((item) => {
            const rainfall = item?.rainfall24hr || 0;
            rainfall > 0 ? rainCount++ : noRainCount++;
        });

        return {
            labels: ['Rain', 'No Rain'],
            datasets: [{
                data: [rainCount, noRainCount],
                backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1,
            }],
        };
    };

    return (
        <div>
            <h3>{selectedDate ? 'Daily' : 'Aggregated'} Rainfall Occurrence</h3>
            <Pie 
                data={prepareRainfallPieData(data, selectedDate)} 
                options={{ 
                    responsive: true, 
                    plugins: { 
                        legend: { 
                            position: 'top',
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const label = context.label || '';
                                    const value = context.raw || 0;
                                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                    const percentage = Math.round((value / total) * 100);
                                    return `${label}: ${value} (${percentage}%)`;
                                }
                            }
                        }
                    },
                    animation: {
                        animateScale: true,
                        animateRotate: true
                    }
                }} 
            />
        </div>
    );
}