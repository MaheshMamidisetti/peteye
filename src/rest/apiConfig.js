const API_BASE_URL = "https://dummyjson.com";

export const endPoints = {
    list : `${API_BASE_URL}/products`,
    productDetails : (productId) => `${API_BASE_URL}/products/${productId}`,
    addProduct: `${API_BASE_URL}/products/add`
}