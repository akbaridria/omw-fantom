import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import {Card, Badge} from 'react-native-paper'
const ItemErc = ({data}) => {
  return (
    <Card style={{marginBottom : 10, marginLeft : 40, marginRight : 40}}>
      <View style={styles.container}>
      <View style={{display : "flex", flexDirection : "row"}}>
      <View>
        <Image style={styles.imageDecoration} source={require('../assets/image/image.png')} />
      </View>
      <View>
      <Text style={{fontSize : 12, fontWeight : 'bold'}}>{data.transfers[0].contract_ticker_symbol}</Text>
      <Text style={{ fontSize : 10}}>{data.block_signed_at.substring(0,10)}</Text>
      </View>
      </View>
      <View>
      {
        data.transfers[0].transfer_type === 'IN'
        ?
        <Badge style={{fontSize : 12, color : 'white', backgroundColor : 'green'}}>+ {(data.transfers[0].delta/(Math.pow(10,data.transfers[0].contract_decimals))).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Badge>
        :
        <Badge style={{fontSize : 12, color : 'white', backgroundColor : 'red'}}>- {(data.transfers[0].delta/(Math.pow(10,data.transfers[0].contract_decimals))).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Badge>
      } 
      </View>
      </View>
    </Card>
  )
}


const styles = StyleSheet.create({
  container : {
    display : "flex",
    flexDirection : "row",
    alignItems : "center",
    justifyContent : "space-between",
    margin : 10
  },
  
  imageDecoration : {
    width : 40,
    height : 40,
    borderRadius : 100,
    marginRight : 10
  }
})
export default ItemErc;