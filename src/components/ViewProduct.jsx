import { StyleSheet, View } from 'react-native'
import React from 'react'
import useProductStore from '../store/useProductStore'
import {Icon, Text, Chip, Card} from 'react-native-paper';

const ViewProduct = () => {
  const item = useProductStore(store =>  store.selectedProduct);
  return (
    <View style={{marginLeft: 10, marginRight: 10, marginBottom: 10}}>
      <Card >
      <Card.Cover source={{ uri: item.thumbnail ?? `https://picsum.photos/${item.id}` }}/>
        <Card.Content style={{gap: 8}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 5}}>
            <Chip>{item.category}</Chip>
            <Chip>{item.brand}</Chip>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text variant="titleLarge">{item.title}</Text>
              <View style={{flexDirection: 'row'}}>
                <Icon
                  source="star"
                  size={20}
                />
                <Text>{item.rating}</Text>
              </View>
            </View>
          <Text variant="bodyMedium">{item.description}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, alignItems: 'center'}}>
            <Text>Discount: {item.discountPercentage}%</Text>
            <Chip>$ {item.price}</Chip>
          </View>
          <Text style={{color: 'red', alignSelf: 'center', marginTop: 10}}>Limited stock ${item.stock} remaining only</Text>
        </Card.Content>
      </Card>
    </View>
  )
}

export default ViewProduct

const styles = StyleSheet.create({})