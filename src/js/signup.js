const uri = `${location.href}/v1`;

addEventListener("submit", async(e) => {
  e.preventDefault();

  let data = Object.fromEntries(new FormData(e.target));
  let config = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  }
  console.log(uri)
  console.log(config.body)
  let peticion = await fetch(uri, config);
  let res = await peticion.json();
  if(res.status == 201) location.href = "/logIn";
  alert(JSON.stringify(res.message));
})