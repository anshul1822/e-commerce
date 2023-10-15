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
    // console.log("updateCart",item);
    const response = await fetch(' http://localhost:8080/cart/'+item.id,{
      method : 'PUT',
      body : JSON.stringify(item),
      headers : {'content-type' : 'application/json'}
    })    
    const data = await response.json();

    // console.log("updateCart", data);
    resolve({data});
});
}

export function deleteItemsFromCart(productId) {
  return new Promise(async (resolve) => {
    // console.log("deleteItemsCart",itemId, userId);
    // console.log("deleteItemsFromCart", userId);
    const response = await fetch(' http://localhost:8080/cart/'+productId,{
      method : 'DELETE',
      headers : {'content-type' : 'application/json'}
    })    
    const data = await response.json();

    // TODO : on server it will only retrun some info of user (not password)
    resolve({data : {id : productId}});
});
}


export async function deleteCart() {
  // get all the cart items - and then delete each item

  return new Promise(async (resolve) => {
    const response = await fetchCartItems();
    // console.log("deleteCart");
    // console.log(response.data);
    const items = response.data;

    console.log("delete Cart", items);
  
    for(let item of items){
      console.log(item);
      await deleteItemsFromCart(item.product.id);
    }

    resolve({status : 'success'});
});
}

export function fetchCartItems() {
  return new Promise(async (resolve) => {
    //TODO : we will not hard-code server url her
    const response = await fetch(' http://localhost:8080/cart');    
    const data = await response.json();
    console.log("fetch Items in Cart Cart API ", data);
    resolve({data});
  })
}
