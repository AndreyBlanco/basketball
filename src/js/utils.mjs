import { doc } from "prettier";

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function renderListWithTemplate(templateFn, el, list, position="afterbegin", clear=true) {
  if (clear) {
    el.innerHTML = "";
  }
  const htmlString = list.map(templateFn);
  el.insertAdjacentHTML(position, htmlString.join(""));
};


export async function renderWithTemplates(templateFn, el, data, callback, position="afterbegin", clear=true) {
  if (clear) {
    el.innerHTML = "";
  }
  const htmlString = await templateFn(data);
  el.insertAdjacentHTML(position, htmlString);
  if (callback) {
    callback(data);
  }
};

function loadTemplate(path) {
  return async function () {
    const res = await fetch(path);
    if (res.ok) {
    const html = await res.text();
    return html;
    }
  };
}

export async function loadHeaderFooter() {
  const headerTemplateFn = loadTemplate("/partials/header.html");
  const footerTemplateFn = loadTemplate("/partials/footer.html");
  const elHeader = document.querySelector("#headerTem");
  const elFooter = document.querySelector("#footerTem");

  renderWithTemplates(headerTemplateFn, elHeader);
  renderWithTemplates(footerTemplateFn, elFooter); 
}

export function alertMessage(message, scroll=true) {
  const alert = document.createElement('div');
  alert.classList.add('alert');
  alert.innerHTML = `<p>${setAlertMessage(message)}</p><span>X</span>`;

  alert.addEventListener('click', function(e) {
    if (e.target.tagName == "SPAN" ) {
      main.removeChild(this);
    }
  });

  const main= document.querySelector('main');
  main.prepend(alert);

  if (scroll) window.scrollTo(0,0);

}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) =>
    document.querySelector("main").removeChild(alert)
  );
}

function setAlertMessage(message) {
  var errorMessage = ""
  switch (message) {
    case 0:
      return "Add a First Name";
      break;
    case 1:
      return "Add a Last Name";
      break;
    case 2:
      return "Add a Street";
      break;
    case 3:
      return "Add a City";
      break;
    case 4:
      return "Add a State";
      break;
    case 5:
      return "Add a Zip code";
      break;
    case 6:
      return "Add a valid Card Number";
      break;
    case 7:
      return "Add a valid Expiration Date MM/YY";
      break;
    case 8:
      return "Add a valid three digits Security Code";
      break;
    };
}
