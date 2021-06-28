import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Card, Button, Title, Paragraph } from "react-native-paper";


const ItemNft = ({data}) => {
  return (
    <Card style={{marginBottom : 10}}>
    <Card.Cover source={{ uri: data.nft_data[0].external_data.image }} />
    <Card.Content>
      <Title>{data.nft_data[0].external_data.name}</Title>
      <Paragraph>{data.nft_data[0].external_data.description}</Paragraph>
    </Card.Content>
  </Card>
  )
}

export default ItemNft;