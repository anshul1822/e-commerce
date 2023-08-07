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