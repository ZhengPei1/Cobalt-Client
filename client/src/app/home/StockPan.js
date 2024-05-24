
import { useState } from "react";
import styles from "@/static/stockpan.module.css"
import StockChart from "./StockChart";
import ButtonPan from "./ButtonPan";

// the panel that contains the candlestick chart (stock-chart) and buttons (button-pans)
export default function StockPan(props) {
    const [ticker, setTicker] = useState(props.ticker);
    const [start, setStart] = useState(props.start);
    const [end, setEnd] = useState(props.end);
    const [interval, setInterval] = useState(props.interval);

    return (
        <div className={styles.stock_pan}>
            <StockChart
                ticker={ticker}
                start={start}
                end={end}
                interval={interval}>
            </StockChart>

            <ButtonPan
                ticker={props.ticker} // These props are used for default value, they should not be from useState
                start={props.start}
                end={props.end}
                interval={props.interval}
                setTicker={setTicker}
                setStart={setStart}
                setEnd={setEnd}
                setInterval={setInterval}>
            </ButtonPan>
        </div>
    )
}