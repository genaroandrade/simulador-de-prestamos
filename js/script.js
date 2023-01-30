//guardamos el estado incial en el local storage, para poder recuperarlo mas tarde
localStorage.setItem(
  "initial_state",
  JSON.stringify({
    loanAmount: 0,
    quota: 3,
    interest: 30,
    total: 0,
  })
);

//declaramos un objeto que servirá para ir guardando los valores de los inputs, usamos destructuring para
// copiar las propiedades de nuestro estado inicial
let state = {
  ...JSON.parse(localStorage.getItem("initial_state")),
};

//caputarmos el input desde el DOM
const loanAmountInput = document.getElementById("capital");

//agregamos el event listener onInput
loanAmountInput.oninput = (element) => {
  //usamos el operador ternario para asignar solo los valores que sean mayores a 0
  state.loanAmount =
    Number(element.target.value) > 0
      ? Number(element.target.value)
      : console.error("los valores ingresados deben ser mayores a 0");
};

//caputarmos el select de las cuotas
const interesInput = document.getElementById("interes");

//le asignamos el valor que tiene en nuestro estado
interesInput.value = state.interest;

//caputarmos el elemento que muestra el interes
const quotaInput = document.getElementById("couta");

//le asignamos un event listener
quotaInput.onchange = (element) => {
  //evaluamos el valor seleccionado para actualizar nuestro estado
  switch (Number(element.target.value)) {
    case 3:
      state.interest = 30;
      break;
    case 6:
      state.interest = 50;
      break;
    case 12:
      state.interest = 80;
      break;
    default:
      state.interest = 30;
  }
  //asignamos el valor del estado para que se muestre en el input
  interesInput.value = state.interest;
};

//capturamos el boton de calculo
const calculos = document.getElementById("btnCalc");
const fondo = document.getElementById("color");

//capturamos los elementos de la tabla para mostrar totales
const totCapital = document.getElementById("t1");
const totInteres = document.getElementById("t2");
const totAPagar = document.getElementById("t3");

//agregamos un event listener al boton de calculo
calculos.addEventListener("click", () => {
  //asignamos los valores calculados
  state.total = state.loanAmount + (state.loanAmount * state.interest) / 100;

  totCapital.textContent = state.loanAmount.toString();

  totInteres.textContent = (
    (state.loanAmount * state.interest) /
    100
  ).toString();

  totAPagar.textContent = state.total.toString();
  fondo.classList.toggle("dark");
});

const buttonRestart = document.getElementById("btnRestart");

//reiniciamos el estado, y los valores de cada input y tabla

buttonRestart.addEventListener("click", () => {
  setTimeout(() => {
    state = {
      ...JSON.parse(localStorage.getItem("initial_state")),
    };
  
    loanAmountInput.value = null;
  
    totCapital.textContent = "";
  
    totInteres.textContent = "";
  
    totAPagar.textContent = "";
  
    quotaInput.value = "3";
  
    interesInput.value = state.interest;
  
    console.log("state", state);
    
  }, 1500);
  
  
  // agregando libreria
  let timerInterval;
  Swal.fire({
    title: "Reiniciando prestamo",
    html: " En <b></b> Milisegundos.",
    timer: 1500,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const b = Swal.getHtmlContainer().querySelector("b");
      timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft();
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  }).then((result) => {
    
    if (result.dismiss === Swal.DismissReason.timer) {
      
    }
  });
});
