import * as React from 'react';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import { Subheading } from 'react-native-paper';
import ItemNft from "../components/ItemNft";
import Constants from 'expo-constants';
import axios from "axios";
const S_Nfts = ({data}) => {
  const [nft, setNft] = React.useState([])
  React.useEffect(() => {
    const API_KEY = "ckey_4e7ba38c8e50410a92ed0989d8f";
    const URL = `https://api.covalenthq.com/v1/250/address/${data.address}/balances_v2/?quote-currency=${data.currency}&nft=true&key=${API_KEY}`
    axios.get(URL).then((response) => {
      getNfts(response.data.data.items)
    })
  }, [])

  function getNfts(tokens) {
    let totalNfts = []
    tokens.map((token) => {
      if(token.nft_data !== null) {
        totalNfts.push(token)
      }
    })
    setNft(totalNfts)
  }
  return (
    <ScrollView>
    <View style={styles.container}>
      {
        nft.map((nf) => {
          return <ItemNft data={nf} />
        })
      }
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container : {
    display : "flex",
    flexDirection : "column",
    margin : 20,
    paddingTop: Constants.statusBarHeight
  } 
})
export default S_Nfts;