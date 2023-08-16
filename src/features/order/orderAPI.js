export function addToOrder(orderItem) {
    return new Promise(async (resolve) => {
  
      const response = await fetch(' http://localhost:8080/orders', {
        method : 'POST',
        body : JSON.stringify(orderItem),
        headers : {'content-type' : 'application/json'}
      })  
  
      const data = await response.json();
      // TODO : on server it will only retrun some info of user (not password)
      resolve({data});
  });
}

export function updateOrder(order) {
  return new Promise(async (resolve) => {

    const response = await fetch(' http://localhost:8080/orders/' + order.id, {
      method : 'PUT',
      body : JSON.stringify(order),
      headers : {'content-type' : 'application/json'}
    })  

    const data = await response.json();
    resolve({data});
});
}

export function fetchAllOrders(sort, pagination) {
  return new Promise(async (resolve) => {

    let queryString = '';

    for(let key in sort){
      queryString += `${key}=${sort[key]}&`;
    }    
  
    for(let key in pagination){
      queryString += `${key}=${pagination[key]}&`;
    }

    console.log(queryString);

      const response = await fetch("http://localhost:8080/orders?" + queryString);
      const data = await response.json();
  
      const totalOrders = await response.headers.get('X-Total-Count'); //json-server API gives total count
      resolve({data : {orders : data, totalOrders : +totalOrders}});
})
}
