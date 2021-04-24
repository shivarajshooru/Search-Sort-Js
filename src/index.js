const api = "https://randomuser.me/api";
const adduser = document.getElementById("usr-btn");
const mainApp = document.getElementById("list");
const searchEle = document.getElementById("search");
const ascsrtbtn = document.getElementById("sort-asc");
const dscsrtbtn = document.getElementById("sort-desc");

const appState = [];

class User {
  constructor(title, firstname, lastname, gender, eamil) {
    this.title = title;
    this.name = ` ${firstname} ${lastname}`;
    this.email = `${eamil}`;
    this.gender = `${gender}`;
  }
}

adduser.addEventListener("click", async () => {
  const userData = await fetch(api, {
    method: "get"
  });
  const userJson = await userData.json();

  const user = userJson.results[0];

  const classUser = new User(
    user.name.title,
    user.name.first,
    user.name.last,
    user.gender,
    user.email
  );
  appState.push(classUser);

  domRender(appState);
});

const domRender = (stateArr) => {
  mainApp.innerHTML = null;
  stateArr.forEach((userObj) => {
    const userEl = document.createElement("div");
    userEl.innerHTML = `<div> Name: ${userObj.title} ${userObj.name}
    <ol>
    <li>${userObj.gender}</li>
    <li>${userObj.email}</li>
    </div>`;
    mainApp.appendChild(userEl);
  });
};

searchEle.addEventListener("keyup", (e) => {
  const filtAppstate = appState.filter(
    (user) =>
      user.name.toLowerCase().includes(searchEle.value.toLowerCase()) ||
      user.gender.toLowerCase().includes(searchEle.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchEle.value.toLowerCase())
  );
  domRender(filtAppstate);
});

ascsrtbtn.addEventListener("click", () => {
  const copyAppState = [...appState];
  copyAppState.sort((a, b) => (a.name > b.name ? 1 : -1));
  domRender(copyAppState);
});

dscsrtbtn.addEventListener("click", () => {
  const copyAppState = [...appState];
  copyAppState.sort((a, b) => (a.name < b.name ? 1 : -1));
  domRender(copyAppState);
});
