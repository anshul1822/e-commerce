export function fetchLoggedInUserData(){

    return new Promise(async(resolve) => {

        const response = await fetch('/users/my-profile')
        const data = await response.json();

        resolve({data});
    })
}

export function fetchLoggedInUserOrders(){

    return new Promise(async(resolve) => {
        
        // console.log("fetchLoggedInUserOrders user");

        const response = await fetch('/orders/')
        const data = await response.json();

        resolve({data});
    })
}

export function updateUser(update) {
    return new Promise(async (resolve) => {
      console.log(update);
      const response = await fetch(' /users/my-profile' , {
        method : 'PUT',
        body : JSON.stringify(update),
        headers : {'content-type' : 'application/json'}
      })  
  
      const data = await response.json();
      // TODO : on server it will only retrun some info of user (not password)
      resolve({data});
  });
  }