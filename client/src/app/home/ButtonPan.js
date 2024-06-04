import styles from "./buttonpan.module.css"
import { AuthContext } from "@/util/AuthContext";
import { writeData } from "@/util/DBOperations";
import { useContext, useRef } from "react"

// panel of buttons used in combination with stock-chart
export default function ButtonPan(props) {

    const [user, userinfo, loading, setLoading] = useContext(AuthContext);

    let ticker = useRef(props.ticker);
    let start_date = useRef(props.start);
    let end_date = useRef(props.end); 
    let interval = useRef(props.interval);

    // handle confirm button
    async function handleOnClick() {

        // error detection
        if (ticker.current == null) {
            alert("You Must Select A Ticker!");
            return;
        }

        if (interval.current == null) {
            alert("You Must Select A interval!");
            return;
        }

        if (start_date.current == null) {
            alert("You Must Select A Starting Date!");
            return;
        }

        if (end_date.current == null) {
            alert("You Must Select An Ending Date!");
            return;
        }

        const st_date = new Date(start_date.current);
        const ed_date = new Date(end_date.current);
        const today = new Date();
        const diffTime = Math.abs(today - st_date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
        const intraday = ["1m", "2m", "5m", "15m", "30m", "1h", "90m"];

        // error detection
        if(ed_date > today){
            alert("you can't select an ending date greater than the current time");
            return;
        }

        if(diffDays > 59 && intraday.includes(interval.current)){
            alert(`Intraday data (interval < 1day) are only available for the last 60 days from today, the starting date you selected is ${diffDays} days away from today`);
            return;
        }

        // update page
        props.setTicker(ticker.current);
        props.setStart(start_date.current);
        props.setEnd(end_date.current);
        props.setInterval(interval.current);

        // record user info
        await writeData("users/"+ user.uid + "/" + props.panel_id, {
            ticker : ticker.current,
            start_date : start_date.current,
            end_date : end_date.current,
            interval : interval.current
        })
    }

    return (
        <div className={styles.container}>

            <div className={`${styles.ticker}, ${styles.input_field}`}>
                <label htmlFor="ticker" className={styles.label}>Ticker:</label>
                <input type="text"
                    name="ticker"
                    defaultValue={props.ticker}
                    className={styles.input}
                    placeholder="input a valid ticker here"
                    onChange={e => { ticker.current = e.target.value }}></input>
            </div>

            <div className={`${styles.interval}, ${styles.input_field}`}>
                <label htmlFor="interval" className={styles.label}>Interval:</label>
                <select name="interval"
                    defaultValue={props.interval}
                    className={styles.input}
                    onChange={e => { interval.current = e.target.value }}>
                    <option value="1m">1min</option>
                    <option value="2m">2min</option>
                    <option value="5m">5min</option>
                    <option value="15m">15min</option>
                    <option value="30m">30min</option>
                    <option value="1h">1h</option>
                    <option value="90m">1.5h</option>
                    <option value="1d">1 day</option>
                    <option value="5d">5 days</option>
                    <option value="1wk">1 week</option>
                    <option value="1mo">1 month</option>
                    <option value="3mo">3 months</option>
                </select>
            </div>

            <div className={`${styles.start_date}, ${styles.input_field}`}>
                <label htmlFor="start" className={styles.label}>Start date:</label>
                <input type="date"
                    name="start"
                    className={styles.input}
                    defaultValue={props.start}
                    onChange={e => { start_date.current = e.target.value }}></input>
            </div>

            <div className={`${styles.end_date}, ${styles.input_field}`}>
                <label htmlFor="end" className={styles.label}>End date:</label>
                <input type="date"
                    name="end"
                    className={styles.input}
                    defaultValue={props.end}
                    onChange={e => { end_date.current = e.target.value }}></input>
            </div>

            <button onClick={handleOnClick} className={styles.confirm}> Confirm </button>
        </div>
    )
}

