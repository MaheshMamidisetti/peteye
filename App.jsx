import React, { useMemo } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useProductStore from './src/store/useProductStore';
import ProductList from './src/components/ProductList';
import ViewProduct from './src/components/ViewProduct';
import NewProduct from './src/components/NewProduct';
import {Appbar} from 'react-native-paper';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

function App() {
  const page = useProductStore(store => store.page);
  const setPage = useProductStore(store => store.setPage);
  const selectedProduct = useProductStore(store => store.selectedProduct)
  const title = useMemo(() => {
    if(page === 0)
        return 'Products';
      if(page === 1)
        return `${selectedProduct.title}`;
      return 'Add Product';
  }, [page, selectedProduct])
  return (
    <PaperProvider theme={theme}>
      <SafeAreaView>
      <View>
        <Appbar.Header>
          
          {(page !== 0) &&<Appbar.BackAction onPress={() => {setPage(0)}} />}
          <Appbar.Content title={title} />
          {(page !== 2) && <Appbar.Action icon="tray-plus" onPress={() => {setPage(2)}} />        }
        </Appbar.Header>
        {page === 0 ? <ProductList /> : page === 1 ? <ViewProduct /> : <NewProduct />}
      </View>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
