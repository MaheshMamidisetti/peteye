import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput, Button } from 'react-native-paper'
import { Formik } from "formik";
import * as yup from 'yup'
import axios from 'axios';
import { endPoints } from '../rest/apiConfig';
import useProductStore from '../store/useProductStore';
const signUpValidationSchema = yup.object().shape({
    title: yup
      .string()      
      .required('Title is required'),
    description: yup
      .string()
      .required('Description is required'),
    price: yup
      .number()
      .min(1).positive().integer()
      .required('Price is required'),
    pricediscountPercentage: yup
      .number()
      .min(1).positive(),
    brand: yup
      .string()
      .required('Brand is required'),
    category: yup
      .string()
      .required('Category is required'),
    
  })

const NewProduct = () => {
  const addNewProduct = useProductStore(store => store.addNewProduct)
  const setPage = useProductStore(store => store.setPage);

  const addProduct = (values, actions) => {
    axios.post(endPoints.addProduct, values).then(({data}) => {
      addNewProduct(data);
      actions.resetForm?.();
      setPage(0);
    });
  };
  return (
    <ScrollView>
      <View>
        <View style={{ gap: 20, alignItems: 'center' }}>
        <Formik
            validationSchema={signUpValidationSchema}
            initialValues={{
              title: "",
              description: "",
              price: '',
              discountPercentage: '',
              stock: '',
              brand: "",
              category: "",

            }}
            onSubmit={(values, actions) => {
              addProduct(values, actions)
            }}
          >
            {({ handleBlur, handleSubmit, isValid, handleChange, values, errors, touched }) => (
              <View style={{width: '100%', padding: 15, gap: 10}}>
                <TextInput
                  mode='outlined'
                  name='title'
                  onChangeText={handleChange('title')}
                  placeholder='Title'
                  value={values.title}
                  label='Title'
                  onBlur={handleBlur('title')}
                />

              <TextInput
                  mode='outlined'
                  name='description'
                  onChangeText={handleChange('description')}
                  placeholder='Description'
                  value={values.description}
                  label='Description'
                  onBlur={handleBlur('description')}
                />
              <TextInput
                  name='price'
                  mode='outlined'
                  onChangeText={handleChange('price')}
                  placeholder='0'
                  value={values.price}
                  label='Price'
                  keyboardType='numeric'
                  onBlur={handleBlur('price')}
                />

              <TextInput
                  name='discountPercentage'
                  mode='outlined'
                  onChangeText={handleChange('discountPercentage')}
                  placeholder='0%'
                  value={values.discountPercentage}
                  label='Discount'
                  keyboardType='numeric'
                  onBlur={handleBlur('discountPercentage')}
                />

              <TextInput
                  name='stock'
                  mode='outlined'
                  onChangeText={handleChange('stock')}
                  placeholder='100'
                  value={values.stock}
                  label='Stock'
                  keyboardType='numeric'
                  onBlur={handleBlur('stock')}
                />

              <TextInput
                  name='brand'
                  mode='outlined'
                  onChangeText={handleChange('brand')}
                  placeholder='Brand'
                  value={values.brand}
                  label='Brand'
                  onBlur={handleBlur('brand')}
                />
              <TextInput
                  name='category'
                  mode='outlined'
                  onChangeText={handleChange('category')}
                  placeholder='Category'
                  value={values.category}
                  label='Category'
                  onBlur={handleBlur('category')}
                />
                <Button compact mode='contained' style={{marginTop: 10}} onPress={handleSubmit}>Submit</Button>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </ScrollView>
  )
}

export default NewProduct

const styles = StyleSheet.create({})