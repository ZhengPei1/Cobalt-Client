import styles from './transaction.module.css'
import Entry from './Entry';
import { useState } from 'react';
import { writeData } from '@/util/firebase/DBOperations';

export default function Transaction({user, currentStock, balance, setBalance, commission, position, setPosition}) {
    const [userInputBuy, setUserInputBuy] = useState(null);
    const [userInputSell, setUserInputSell] = useState(null);

    // handlers
    // handle the buy feature
    const handleBuy = () =>{
        // error detection
        if(!currentStock){
            alert("You must select (search) a stock first");
            return;
        }

        if(!userInputBuy){
            alert("You must select the number of shares to buy");
            return;
        }

        if(!Number.isInteger(Number(userInputBuy)) || userInputBuy <= 0){
            alert("The number of shares to buy must be a positive integer");
            return;
        }

        const cost = currentStock.currentPrice * userInputBuy + commission * userInputBuy;

        if(balance < cost){
            alert("You don't have enough money. You need " + cost.toFixed(2) + "" + " USD to complete this purchase");
            return;
        }

        // update balance
        const newBalance = Number((balance - cost).toFixed(2));
        const oldPosition = position[currentStock.ticker] ?? 0;
        const newPosition = {...position, [currentStock.ticker]: Number(userInputBuy) + oldPosition};
        setBalance(newBalance);
        setPosition(newPosition);
        writeData("users/" + user.uid + "/balance", newBalance);
        writeData("users/" + user.uid + "/position", newPosition);

        // alert
        alert("You bought " + userInputBuy + " shares of " + currentStock.ticker + " for " + cost.toFixed(2) + " USD");
    }

    // handle the sell feature
    const handleSell = () =>{
        // error detection
        if(!currentStock){
            alert("You must select (search) a stock first");
            return;
        }

        if(!userInputSell){
            alert("You must select the number of shares to sell");
            return;
        }

        if(!Number.isInteger(Number(userInputSell)) || userInputSell <= 0){
            alert("The number of shares to Sell must be a positive integer");
            return;
        }

        if(userInputSell > (position[currentStock.ticker] ?? 0)){
            alert("You don't have enough shares of " + currentStock.ticker + " to sell");
            return;
        }

        const earning = currentStock.currentPrice * userInputSell - commission * userInputSell;
        // update balance
        const newBalance = Number((balance + earning).toFixed(2));
        const oldPosition = position[currentStock.ticker] ?? 0;
        const newPosition = {...position, [currentStock.ticker]: oldPosition - Number(userInputSell)};
        setBalance(newBalance);
        setPosition(newPosition);
        writeData("users/" + user.uid + "/balance", newBalance);
        writeData("users/" + user.uid + "/position", newPosition);

        // alert
        alert("You sold " + userInputSell + " shares of " + currentStock.ticker + " for " + earning.toFixed(2) + " USD");
    }

    // render the transaction section
    return (
        <div className={styles.container}>
            <div>Trade</div>

            {/* Info Section */}
            <div className={styles.info_section}>
                <div>Symbol</div>
                <div>Last</div>
                <div>Now</div>
                <div>Chg%</div>

                <Entry stockInfo={currentStock}></Entry>
            </div>

            
            {/* Buy Section */}
            <div className={styles.trade_section}>
                <label htmlFor="stock_buy" className={styles.label_front}>Buy:</label>
                <input  type="number"
                        name="stock_buy"
                        min = "1"
                        step = "1"
                        className={styles.input}
                        placeholder="input a valid ticker here"
                        value = {userInputBuy}
                        onChange={e => { setUserInputBuy(e.target.value) }}></input>
                <label className={styles.label_end}>share</label>
                <button className={styles.button} onClick={handleBuy}>Buy</button>
            </div>
            
            {/* Sell Section */}
            <div className={styles.trade_section}>
                <label htmlFor="stock_sell" className={styles.label_front}>Sell:</label>
                <input  type="number"
                        name="stock_sell"
                        min = "1"
                        step = "1"
                        className={styles.input}
                        placeholder="input a valid ticker here"
                        value = {userInputSell}
                        onChange={e => { setUserInputSell(e.target.value) }}></input>
                <label className={styles.label_end}>share</label>
                <button className={styles.button} style={{backgroundColor: "red"}} onClick={handleSell}>Sell</button>
            </div>
        </div>
    )
}