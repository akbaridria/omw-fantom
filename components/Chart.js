
import * as React from 'react';
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native';
import { VictoryPie } from "victory-native";

const Chart = ({dataChart}) => {
  console.log(dataChart)
  return (
    <View>
      <VictoryPie
        data={dataChart}
        height={300}
        width={300}
      />
    </View>
  )
}

export default Chart;