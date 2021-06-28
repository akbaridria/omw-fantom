import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Card, Avatar, Chip, Badge } from "react-native-paper";


const ItemTransaction = ({data, currency}) => {
  const currencies = {
    USD : '$',
    EUR : '€',
    JPY : '¥'
  }
  return (
    <Card style ={{marginLeft : 10, marginRight:10, padding : 10, marginBottom : 10 }}>
      <View style={styles.containerTransaction}>
        <Avatar.Text size={35} label="Tx" style={{backgroundColor : "#000"}}/>
        <View style={styles.containerText}>
          <Text style={{fontSize : 10}}>{data.tx_hash.substring(0,20) + "..."}</Text>
          <Text style={{color : "gray", fontSize : 8}}>{data.block_signed_at.substring(0,10)}</Text>
        </View>
        <View style={styles.containerText}>
          <Text style={{fontSize : 10}}>{"From " + data.from_address.substring(0,12) + "..."}</Text>
          <Text style={{fontSize : 10}}>{"To " + data.to_address.substring(0,12) + "..."}</Text>
        </View>
        <View style={styles.containerText}>
          <Text style={{fontSize : 10}}>Gas Fee</Text>
          <Badge style={{fontSize : 10, backgroundColor : "black", color : "white"}}>{ currencies[currency] + Number(data.gas_quote).toFixed(4)}</Badge>
        </View>
      </View>
      </Card>
  )
}

const styles = StyleSheet.create({
  containerTransaction : {
    display : "flex",
    flexDirection : "row",
    justifyContent : "space-between",
    alignItems :"center"
  },
  
  containerText : {
    display : "flex",
    flexDirection : "column",
    marginLeft : 10
  }
})
export default ItemTransaction;