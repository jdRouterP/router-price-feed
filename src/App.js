import React, { useState } from "react";
import styled from "styled-components";
import BGimg from "./assesets/routerlogowhite.svg";
import {Typography } from "@mui/material";
import ReconnectingWebSocket from 'reconnecting-websocket';
const Wrapper = styled.div`

`;
const Logo = styled.img`
&&{
  display: grid;
  margin: 10% auto;
  width: 30%;
}
`;
const StyledText = styled(Typography)`
&&{
  color: white;
  text-align: center;
  font-size: 100px;
  font-family: 'Inter', sans-serif;}
`;


const apiCall = {
  "id": 1545910660739,
  "type": "subscribe",
  "topic": "/market/ticker:ROUTE-USDT",
  "response": true
};
let ws = new ReconnectingWebSocket("wss://ws-api.kucoin.com/endpoint?token=2neAiuYvAU61ZDXANAGAsiL4-iAExhsBXZxftpOeh_55i3Ysy2q2LEsEWU64mdzUOPusi34M_wGoSf7iNyEWJ1G4RHWxlYNMwXT9PYo3TYy3OfkSovJ-ZtiYB9J6i9GjsxUuhPw3BlrzazF6ghq4L1INA2oyLqaRvdu8Idt2-Xg=.VMzku0NcTHdSbWfdzhZr_A==&[connectId=1545910660739]");
let connect = function(){
    ws.onopen = function() {
      ws.send(JSON.stringify(apiCall));
    }
    ws.onerror = function() {
        console.log('socket error');
    }
};
connect();
function  App() {
  //give an initial state so that the data won't be undefined at start
  const [price, setPrice] = useState([0]);

  ws.onmessage = function (event) {
    const json = JSON.parse(event.data);
    console.log(json?.data?.price)
    try {
      if ((json.event = "data" && json.data)) {
        console.log("old price", price)
        setPrice(json.data.price);
      }
    
    } catch (err) {
      console.log(err);
    }
  };
 
  return <Wrapper>
    <Logo src={BGimg}/>
    <StyledText>
    <br /> ${parseFloat(price).toFixed(4)}
    </StyledText>
    </Wrapper>;
}

export default  App;