import { FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import useProductStore from '../store/useProductStore'
import axios from 'axios';
import {ActivityIndicator, Text, Chip, Card} from 'react-native-paper';
import { endPoints } from '../rest/apiConfig';

const ProductItem = ({item, index}) => {
  const setPage = useProductStore(store => store.setPage);
  const setSelectedProduct = useProductStore(store => store.setSelectedProduct);
  return (
    <View style={{marginLeft: 10, marginRight: 10, marginBottom: 10}}>
      <Card onPress={() => {
        setSelectedProduct(item);
        setPage(1);
      }}>
        <Card.Cover source={{ uri: item.thumbnail ?? `https://picsum.photos/${item.id}` }}/>
        <Card.Content style={{gap: 8}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 5}}>
            <Chip>{item.category}</Chip>
            <Chip>{item.brand}</Chip>
          </View>
          <Text variant="titleLarge">{item.title}</Text>
          <Text variant="bodyMedium">{item.description}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, alignItems: 'center'}}>
            <Text>Discount: {item.discountPercentage}%</Text>
            <Chip>$ {item.price}</Chip>
          </View>
        </Card.Content>
      </Card>
    </View>
  )
}

const ProductList = () => {
  const products = useProductStore(store => store.products);
  const setProducts = useProductStore(store => store.setProducts);
  useEffect(() => {
    if(!products?.length) {
      axios.get(endPoints.list).then(({data}) => {setProducts(data.products)});
    }
  }, [products]);
  return (
    <View>
      {products && products.length ? (<>
        <FlatList
          style={{marginBottom: 200}}
          data={products}
          renderItem={({item, index}) => <ProductItem item={item} index={index} />}
          keyExtractor={item => item.id}
          />
      </>) : <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator />
          <Text>Please wait</Text>
        </View>
        }
    </View>
  )
}

export default ProductList

const styles = StyleSheet.create({})