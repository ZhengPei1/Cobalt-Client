import { useState, useEffect } from "react";
import styles from "./stockchart.module.css"
import dynamic from 'next/dynamic'

// apex chart references windows in a client component, so dynamic import is needed
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// the react child that represents the Apex chart
export default function StockChart(props) {
    const [candle_chart, set_candle_chart] = useState(<div className={styles.message}>Loading...</div>);

    // load chart
    useEffect(() => {
        set_candle_chart(<div className={styles.message}>Loading...</div>);

        updateChart();
    }, [props.ticker, props.start, props.end, props.interval]);



    // async function that directly updates the chart
    async function updateChart() {

        let URL = `${process.env.NEXT_PUBLIC_PY_SERVER_URL}request/plot`;

        try {
            let response = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ "ticker": props.ticker, "start": props.start, "end": props.end, "interval": props.interval }),
            });

            // if server returns error message, print it accordingly
            if (!response.ok) {
                let message = await response.json();
                (set_candle_chart(<div className={styles.message}>{message}</div>))
                return;
            }


            let data = await response.json();

            // Info used by apex chart
            let options = {
                title: {
                    text: props.ticker,
                    align: 'left',
                    style: {
                        color: "#000080"
                    }
                },
                tooltip: {
                    theme: 'dark'
                },
                xaxis: {
                    type: "datetime",
                    labels: {
                        style: {
                            colors: "#000080"
                        }
                    }
                },
                yaxis: {
                    tooltip: {
                        enabled: true,
                    },
                    labels: {
                        style: {
                            colors: "#000080"
                        }
                    }
                }
            };

            let series = [
                {
                    name: props.ticker,
                    data: []
                }
            ]

            // load info fetched by server into apex chart
            data.data.forEach(obj => {
                series[0].data.push({
                    x: "Date" in obj ? obj.Date : obj.Datetime,
                    y: [obj.Open, obj.High, obj.Low, obj.Close]
                })
            })

            // return apex chart
            set_candle_chart(<div><Chart type="candlestick" series={series} options={options} height="100%" width="100%" ></Chart></div>);
        } catch (error) {
            set_candle_chart(<div className={styles.message}>{error.message}</div>);
        }

    }

    return (
        candle_chart
    );
}

