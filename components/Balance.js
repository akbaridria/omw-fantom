import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Subheading } from 'react-native-paper';
import { AntDesign, Entypo } from '@expo/vector-icons';
const Balance = ({total, currency, totalLast}) => {
  const currencies = {
    USD : '$',
    EUR : '€',
    JPY : '¥'
  }
  return (
    <View style={styles.container}>
      <Text style={{ color : 'white', fontSize : 26, fontWeight : 'bold'}}>{currencies[currency] + " " + total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
      <View style={{ display : "flex", flexDirection : "row", alignItems : "center"}}>
      <AntDesign name="caretup" size={12} color="white" />
      <Text style={{ color : 'white', fontSize : 12, marginLeft : 5}}>{(totalLast*100).toFixed(2) + "% ( + " + currencies[currency]  + (totalLast*total).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ")"}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    alignItems : 'center',
    justifyContent : 'center'
  }
})
export default Balance;