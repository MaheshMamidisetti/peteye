import { create } from 'zustand'

const useProductStore = create((set) => ({
  page: 0, //0 for product list, 1 for product details, 2 form add product.
  setPage : (page) => set({page}),
  products: [],
  setProducts : (products) => set({products}),
  addNewProduct: (product) => set((state) => ({products: [product, ...state.products]})),
  selectedProduct: undefined,
  setSelectedProduct : (product) => set({selectedProduct: product}),
}))

export default useProductStore;