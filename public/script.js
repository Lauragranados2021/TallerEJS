
  document.getElementById("addInventario").addEventListener('click', () => {
    const id = document.getElementById("id").value;
    const nombre = document.getElementById("nombre").value;
    const marca = document.getElementById("marca").value;
    const cantidad = document.getElementById("cantidad").value;
    const costo = document.getElementById("costo").value;
    console.log("entro aqui");
    var xhr = new XMLHttpRequest();

    xhr.open("POST", "/add", true);
    xhr.onreadystatechange = ()=>{
      if(xhr.readyState == 4 && xhr.status == 200){
          //window.location.href = xhr.responseText;
      }
      else if (xhr.status == 409) {
    
        alert("id ya existe");

    }
  }
    xhr.setRequestHeader('Content-Type','application/json')
    //clients, service, dateBooking,observations
      const data1 = {
        id: id,
        nombre: nombre,
        marca: marca,
        cantidad: cantidad,
        costo: costo,
      };
      console.log(JSON.stringify(data1));

      xhr.send(JSON.stringify(data1));
  
    
  })

