// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();

    resolve({data});
});
}

export function fetchProductsById(id) {
  console.log(id, "id");
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products/"+id);
    const data = await response.json();
    console.log(data);
    resolve({data});
});
}

export function fetchProductsByFilter(filter, sort, pagination) {
  //filter = {"category" : ["smartphone", "laptops"]}
  //sort = {_sort : "price", _order : "desc"}
  //pagination = {_page:1, _limit=10} // _page=1&_limit=10
  // TODO : multiple categories support on server

  let queryString = '';
  for(let key in filter){
    const categoryValues = filter[key];
    if(categoryValues.length){
      const lastCategoryValue = categoryValues[categoryValues.length - 1]
      queryString += `${key}=${lastCategoryValue}&`
    }
  }

  for(let key in sort){
    queryString += `${key}=${sort[key]}&`;
  }

  for(let key in pagination){
    queryString += `${key}=${pagination[key]}&`;
  }

  console.log(queryString);
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products?" + queryString);
    const data = await response.json();

    const totalItems = await response.headers.get('X-Total-Count'); //json-server API gives total count
    resolve({data : {products : data, totalItems : totalItems}});
});
}

export function fetchAllBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/brands");
    const data = await response.json();

    resolve({data});
});
}

export function fetchAllCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/categories");
    const data = await response.json();
    // console.log(data);
    resolve({data});
});
}