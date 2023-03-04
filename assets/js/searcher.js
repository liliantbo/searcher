let nuevoProducto =(name, price, src, type)=>{
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


let loadProducts = (nombreProducto)=> {
  let URLjson = `https://raw.githubusercontent.com/Bootcamp-Espol/Datos/main/products.json`
  let URLxml = `https://raw.githubusercontent.com/Bootcamp-Espol/Datos/main/products.xml`
  let listaProductos = document.getElementById("productList");
  listaProductos.innerHTML = '';

  let requestJson = ( myURL ) => {

    fetch( myURL )
      .then(response => response.json() ) /* Convierte el response a JSON */
      .then(result => {

        /* Callback por éxito: Procese el result */
        
        result.forEach((producto)=>{
          let {name, price, src, type}=producto;
          if (nombreProducto==="ALL" || name.toLowerCase().includes(nombreProducto)|| type.toLowerCase().includes(nombreProducto)){
            listaProductos.insertAdjacentHTML('beforeend', nuevoProducto(name, price, src, type))
          }
        })
      })
      .catch(error => {
        
        /* Callback por fallo: Procese el error */

        console.log( error );

      });
  }

  let requestXML = async ( myURL ) => {

    try {

      let response = await fetch( myURL ); 
      let result = await response.text() /* Convierte el response a texto */
      let xml = (new DOMParser()).parseFromString(result, 'application/xml');

      /* Éxito: Procese el xml */
    
      let productos = xml.getElementsByTagName("product");

      for (let i = 0; i < productos.length; i++) {
    let name = productos[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
    let price = productos[i].getElementsByTagName("price")[0].childNodes[0].nodeValue;
    let src = productos[i].getElementsByTagName("src")[0].childNodes[0].nodeValue;
    let type = productos[i].getElementsByTagName("type")[0].childNodes[0].nodeValue;
    if (nombreProducto==="ALL" || name.toLowerCase().includes(nombreProducto)|| type.toLowerCase().includes(nombreProducto)){
      listaProductos.insertAdjacentHTML('beforeend', nuevoProducto(name, price, src, type))
    }

    }} catch (error) {

      /* Fallo: Procese el error */
      
      console.log( error );

    }

  }

  requestJson(URLjson);
  requestXML( URLxml );
    
 
} 

loadProducts ("ALL");


let input = document.getElementById('text');
let filterBtn = document.getElementById('filter');

filterBtn.addEventListener('click', () => {
  let nombreProducto = input.value.toLowerCase();
  loadProducts(nombreProducto===""?"ALL":nombreProducto);
});


input.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    let nombreProducto = input.value.toLowerCase();
    loadProducts(nombreProducto===""?"ALL":nombreProducto);
  }
});


