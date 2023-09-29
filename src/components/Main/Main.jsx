import React, { useState,  useEffect } from "react";


import "./Main.css";

import { BsCircle } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";

const Main = ({gameOverStatus}) => {
     const winningCombination = [[1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 5, 9], [3, 5, 7]];
     
    let [data, setData] = useState({ 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "" });
     let [count, setCount] = useState(0);
    let [lock, setLock] = useState(false);
    let [gameStatus, setGameStatus] = useState("");
    let won = false;
    useEffect(() => {
            let filledCell = [];
            Object.keys(data).map(item => data[item] && filledCell.push(Number(item)));
            let matchedWinning = winningCombination.filter((item) =>
                item.every((element) => filledCell.includes(element))
            );
            let won = matchedWinning.some((element) => element.every((item) => data[item] === "x")
            ) ||
                matchedWinning.some((element) => element.every((item) => data[item] === "o")
                );
        if (won) {
            setLock(true);
            document.getElementById("gamestatus").classList.remove("hide");
            document.getElementById("gamestatus").classList.add("show");

            if (count % 2) {
                // titleRef.current.innerHTML = `Congratulations: X - player `
                setGameStatus("Congratulations: X - player ");
            }
            
            else {
                setGameStatus("Congratulations: O - player ");
            }
        }
        else {
            if (count === 9) {
                document.getElementById("gamestatus").classList.remove("hide");
                document.getElementById("gamestatus").classList.add("show");
                setGameStatus("Draw");
            }
        }
    }, [data])
     
     const toggle = (e, num) => {
         if (lock) {
             return 0;
         }
         if (count % 2 === 0) {
             e.target.firstChild.classList.remove("hide");
             e.target.firstChild.classList.add("show");
             
             setData((data) => {
                 return (
                     {
                         ...data,
                         [num]: "x"
                     }
                 )
             }
             );
             setCount(++count);
         }
         else {
             e.target.lastChild.classList.remove("hide");
             e.target.lastChild.classList.add("show");
            
             setData((data) => {
                 return (
                     {
                         ...data,
                         [num]: "o"
                     }
                 )
             }
             );
             setCount(++count);
         }
     }
     
    const restartHandler = () => {
        setData(null);
        setData({ 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "" });
        setCount(0);
        setLock(false);
        const boxes = document.getElementsByClassName("boxes");
        
        for (let i = 0; i < boxes.length; i++){
            boxes[i].firstChild.classList.add("hide");
            boxes[i].firstChild.classList.remove("show");
            boxes[i].lastChild.classList.add("hide");

            boxes[i].lastChild.classList.remove("show");

        }
        document.getElementById("gamestatus").classList.remove("show");
        
        document.getElementById("gamestatus").classList.add("hide");
        setGameStatus(" ");

    }
          
    
  return (
      <div className="container">
          <h1 className="title" > Tic Tac Toe in <span> React</span></h1>
          
          <div className="board">
              <div className="row1">
                  <div className="boxes" onClick={(e) => { toggle(e, 1) }}>
                      <RxCross1  className="cross hide" />
                      <BsCircle  className="circle hide" />
                      
                  </div>
                  <div className="boxes" onClick={(e)=> {toggle(e,2)}} ><RxCross1  className="cross hide" />
                      <BsCircle  className="circle hide" />
                      </div>
                  <div className="boxes" onClick={(e)=> {toggle(e,3)}}><RxCross1  className="cross hide" />
                      <BsCircle  className="circle hide" />
                      </div>

              </div>
              <div className="row2">
                  <div className="boxes" onClick={(e)=> {toggle(e,4)}}><RxCross1  className="cross hide" />
                      <BsCircle  className="circle hide" />
                      </div>
                  <div className="boxes" onClick={(e)=> {toggle(e,5)}}><RxCross1  className="cross hide" />
                      <BsCircle  className="circle hide" />
                      </div>
                  <div className="boxes" onClick={(e)=> {toggle(e,6)}}><RxCross1  className="cross hide" />
                      <BsCircle  className="circle hide" />
                      </div>

              </div>
              <div className="row3">
                  <div className="boxes" onClick={(e)=> {toggle(e,7)}}><RxCross1  className="cross hide" />
                      <BsCircle  className="circle hide" />
                      </div>
                  <div className="boxes" onClick={(e)=> {toggle(e,8)}}><RxCross1  className="cross hide" />
                      <BsCircle  className="circle hide" />
                      </div>
                  <div className="boxes" onClick={(e)=> {toggle(e,9)}}><RxCross1  className="cross hide" />
                      <BsCircle  className="circle hide" />
                      </div>

              </div>
          </div>
          <button className="reset" onClick={restartHandler}>Restart</button>
          <h1 id="gamestatus" className="gamestatus  hide ">{gameStatus}
              </h1>

    </div>
  )
 }

export default Main;