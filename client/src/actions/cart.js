export const GET_CART = "GET_CART";

export const getCart = () => {
  return (dispatch) => {
    var Cart = localStorage.getItem('Cart');
    Cart = JSON.parse(Cart);
      dispatch({
        type: GET_CART,
        cart: Cart,
      });
  };
};
