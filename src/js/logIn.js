const uri = `${location.href}/v1`;

addEventListener("submit", async(e) => {
  e.preventDefault();

  let data = Object.fromEntries(new FormData(e.target));
  let config = {
    method: "POST",
    headers: {'Content-Type': 'application/json',},
    body: JSON.stringify(data)
  }
  let peticion = await fetch(uri, config);
  let res = await peticion.json();
  alert(res.message)

  if(res.status == 200) location.href = "/product";
})