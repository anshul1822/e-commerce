// A mock function to mimic making an async request for data
export function addToCart(cartItems) {
  return new Promise(async (resolve) => {

    const response = await fetch(' http://localhost:8080/cart', {
      method : 'POST',
      body : JSON.stringify(cartItems),
      headers : {'content-type' : 'application/json'}
    })  

    const data = await response.json();
    // TODO : on server it will only retrun some info of user (not password)
    resolve({data});
});
}

export function updateCart(item) {
  return new Promise(async (resolve) => {
    console.log("updateCart",item);
    const response = await fetch(' http://localhost:8080/cart/'+item.id,{
      method : 'PUT',
      body : JSON.stringify(item),
      headers : {'content-type' : 'application/json'}
    })    
    const data = await response.json();

    // TODO : on server it will only retrun some info of user (not password)
    resolve({data});
});
}

export function deleteCart(itemId) {
  return new Promise(async (resolve) => {
    console.log("deleteCart",itemId);
    const response = await fetch(' http://localhost:8080/cart/'+itemId,{
      method : 'DELETE',
      headers : {'content-type' : 'application/json'}
    })    
    const data = await response.json();

    // TODO : on server it will only retrun some info of user (not password)
    resolve({data : {id : itemId}});
});
}

export function fetchItemsByUserId(userId) {
  return new Promise(async (resolve) => {
    //TODO : we will not hard-code server url her
    const response = await fetch(' http://localhost:8080/cart?user=' + userId)    
    const data = await response.json();
    resolve({data});
  })
}
