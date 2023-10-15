export function createUser(userData) {
  return new Promise(async (resolve) => {
    console.log(userData);
    const response = await fetch(' http://localhost:8080/auth/signup', {
      method : 'POST',
      body : JSON.stringify(userData),
      headers : {'content-type' : 'application/json'}
    })  

    const data = await response.json();
    // TODO : on server it will only retrun some info of user (not password)
    resolve({data});
});
}



export function loginUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    // console.log("loginUser", loginInfo);
    try{
      const response = await fetch(`http://localhost:8080/auth/login`, {
        method : 'POST',
        body : JSON.stringify(loginInfo),
        headers : {'content-type' : 'application/json'}
      });

      console.log("response", response);

      if(response.ok){
        const data = await response.json();
        // console.log("response.ok", data);
        resolve({data});  
      }else{
        const error = await response.text();
        // console.log("response.error", error);
        reject(error);
      }
    
    }catch(err){
      reject({err});
    }
    
    // TODO : on server it will only retrun some info of user (not password)  
});
}

export function checkAuth() {
  return new Promise(async (resolve, reject) => {
    try{
      const response = await fetch(' http://localhost:8080/auth/check');  

      if(response.ok){
        const data = await response.json();
        // console.log("response.ok", data);
        resolve({data});  
      }else{
        const error = await response.text();
        // console.log("response.error", error);
        reject(error);
      }

    }catch(err){
      console.log('error at checkAuth', err);
    }
});
}


export function signOut(userId) {
  return new Promise(async (resolve) => {

    // TODO : on server we will remove user session info
    resolve({data : 'success'});
});
}
