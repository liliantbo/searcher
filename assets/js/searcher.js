let nuevoProducto =(producto)=>{
    let {name, price, src, type}=producto;
    let nuevoProducto=
    `
    <div class="col-xl-3 col-md-6 mb-xl-0 mb-4 mt-4">
    <div class="card card-blog card-plain">
      <div class="card-header p-0 mt-n4 mx-3">
        <a class="d-block shadow-xl border-radius-xl">
          <img src="${src}" alt="${name}" class="img-fluid shadow border-radius-xl">
        </a>
      </div>
      <div class="card-body p-3">
        <p class="mb-0 text-sm">${type}</p>
        <a href="javascript:;">
          <h5>
            ${name}
          </h5>
        </a>
        <p class="mb-4 text-sm">
          <b>Price: </b> $ ${price}
        </p>
      </div>
    </div>
  </div>
  
    `
    return nuevoProducto;
}


let loadProducts = ()=> {
  let URLjson = `https://raw.githubusercontent.com/Bootcamp-Espol/FSD02/main/S03D03/clase/recursos/products.json`
  let listaProductos = document.getElementById("productList");
  let request = ( myURL ) => {

    fetch( myURL )
      .then(response => response.json() ) /* Convierte el response a JSON */
      .then(result => {

        /* Callback por éxito: Procese el result */
        
        for (let producto of result ){
          listaProductos.insertAdjacentHTML(beforeend, nuevoProducto(producto))
        }        
      
      })
      .catch(error => {
        
        /* Callback por fallo: Procese el error */

        console.log( error );

      });
    
  }

  request(URL);
    
 
} 

loadProducts ();