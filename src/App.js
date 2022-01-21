import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BGimg from "./assesets/routerlogowhite.svg";
import {Typography } from "@mui/material";
import ReconnectingWebSocket from 'reconnecting-websocket';
import axios from "axios";
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
async function getToken() {
  try {
    const response = await axios.post('https://api.kucoin.com/api/v1/bullet-public');
    return response?.data?.data?.token;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
function  App() {
  //give an initial state so that the data won't be undefined at start
  const [price, setPrice] = useState([0]);
  const [token, setToken] = useState();
  const [ws,setWs]=useState();
  useEffect(()=>{
    getToken().then(data=>{
      setToken(data)
    })
  },[])
// console.log(token)
  useEffect(()=>{
    if(token){
      let wsTemp = new ReconnectingWebSocket(`wss://ws-api.kucoin.com/endpoint?token=${token}&[connectId=1545910660739]`);
      setWs(wsTemp)
    }
  },[token])
  useEffect(()=>{
    if(ws){let connect = function(){
        ws.onopen = function() {
          ws.send(JSON.stringify(apiCall));
        }
        ws.onerror = function() {
            console.log('socket error');
        }
    };
    connect();}
  },[ws])
if(ws){
  ws.onmessage = function (event) {
    const json = JSON.parse(event.data);
    // console.log(json?.data?.price)
    try {
      if ((json.event = "data" && json.data)) {
        // console.log("old price", price)
        setPrice(json.data.price);
      }
      ws.onmessage = function (event) {
        const json = JSON.parse(event.data);
        // console.log(json?.data?.price)
        try {
          if ((json.event = "data" && json.data)) {
            // console.log("old price", price)
            setPrice(json.data.price);
          }
        } catch (err) {
          console.log(err);
        }
      };
    } catch (err) {
      console.log(err);
    }
  };}
  return <Wrapper>
    <Logo src={BGimg}/>
    <StyledText>
    <br /> ${parseFloat(price).toFixed(4)}
    </StyledText>
    </Wrapper>;
}
export default  App;