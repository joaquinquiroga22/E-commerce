function getOrCreateLocalStorage() {
  //Obtengo del localStorage el item Cart
  var cart = localStorage.getItem("Cart");

  console.log(`EL CART TIENE CUANDO LO BUSCA`);
  console.log(cart);
  //Si no existe lo creo
  if (cart === null) {
    localStorage.setItem("Cart", JSON.stringify([]));
    cart = localStorage.getItem("Cart");
  }
  return JSON.parse(cart);
}

export default getOrCreateLocalStorage;
