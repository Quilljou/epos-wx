import React from 'react';
import CountUp from 'react-countup';


export default function CountAmount(props) {
  const { end, decimals = 2 } = props;
  return (
    <CountUp
      start={0}
      end={end}
      duration={1}
      useEasing={true}
      decimals={decimals}
      ></CountUp>
  )
}
