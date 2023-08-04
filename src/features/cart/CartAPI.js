// A mock function to mimic making an async request for data
export function addToCart(cartItems) {
  return new Promise(async (resolve) => {
    
    console.log("addToCart", cartItems);

    const response = await fetch(' http://localhost:8080/cart', {
      method : 'POST',
      body : JSON.stringify(cartItems),
      headers : {'content-type' : 'application/json'}
    })  

    console.log(response);

    const data = await response.json();
    // TODO : on server it will only retrun some info of user (not password)
    resolve({data});
});
}
