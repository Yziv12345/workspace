const uname = document.querySelector("#login-username");
const pword = document.querySelector("#login-password");
function doLogin() {
  const auth = `Basic ${btoa(`${uname.value}:${pword.value}`)}`;
  uname.value = "";
  pword.value = "";
  return fetch("http://localhost:3000/users/foo", {
    headers: new Headers({
      Authorization: auth
    })
  }).then(response => {
    if (!response.ok) throw new Error(response.status);
    return response.json();
  });
}
