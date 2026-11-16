let saldo = 1000;

const movimientos = [
  {
    concepto: 'Nómina',
    cantidad: 1200,
    tipo: 'ingreso',
  },
  {
    concepto: 'Alquiler',
    cantidad: 650,
    tipo: 'gasto',
  },
  {
    concepto: 'Supermercado',
    cantidad: 85,
    tipo: 'gasto',
  },
  {
    concepto: 'Clase particular',
    cantidad: 40,
    tipo: 'ingreso',
  },
];

const saldoPantalla = document.querySelector('#saldo-pantalla');
const mensajeEstado = document.querySelector('#mensaje-estado');
const listaMovimientos = document.querySelector('#lista-movimientos');
const totalGastado = document.querySelector('#total-gastado');

const inputConcepto = document.querySelector('#input-concepto');
const inputCantidad = document.querySelector('#input-cantidad');
const btnGasto = document.querySelector('#btn-gasto');
const btnIngreso = document.querySelector('#btn-ingreso');

const btnTodosGastos = document.querySelector('#btn-todos');
const btnSoloGastos = document.querySelector('#btn-solo-gastos');
const btnSoloIngresos = document.querySelector('#btn-solo-ingresos');

const actualizarSaldo = () => {
  saldoPantalla.textContent = `${saldo}€`;

  if (saldo > 500) {
    mensajeEstado.textContent = 'Vas muy bien este mes';
  } else if (saldo >= 100) {
    mensajeEstado.textContent = 'Ojo, queda poco margen';
  } else {
    mensajeEstado.textContent = 'Alerta roja, ¡toca ahorrar!';
  }

  // if (saldo >= 100) {
  //   mensajeEstado.textContent = "⚠️ Ojo, queda poco margen"
  // } else if (saldo > 500) {
  //   mensajeEstado.textContent = "✅ Vas muy bien este mes"
  // } else {
  //   mensajeEstado.textContent = "🚨 ¡Alerta roja! Toca ahorrar"
  // }
};

const mostrarMovimientos = (lista) => {
  listaMovimientos.innerHTML = '';

  // listaMovimientos.replaceChildren() forma moderna de limpiar

  // for (let i = 0; i < lista.length; i++) {
  //   const li = document.createElement("li")
  //   const signo = lista[i].tipo === "ingreso" ? "+" : "-"

  //   // como sería utilizando if/else
  //   // let signo = ""
  //   // if (lista[i].tipo === "ingreso") {
  //   //   signo = "+"
  //   // } else {
  //   //   signo = "-"
  //   // }

  //   li.innerHTML = `
  //    <span>${lista[i].concepto}</span>
  //    <span class="${lista[i].tipo}">${signo}${lista[i].cantidad} €</span>
  //   `

  //   listaMovimientos.appendChild(li)
  // }

  lista.forEach((movimiento) => {
    const li = document.createElement('li');
    const signo = movimiento.tipo === 'ingreso' ? '+' : '-';

    li.innerHTML = `
     <span>${movimiento.concepto}</span>
     <span class="${movimiento.tipo}">${signo}${movimiento.cantidad} €</span>
    `;

    listaMovimientos.appendChild(li);
  });
};

const calcularGastosTotales = () => {
  const gastos = movimientos.filter(
    (movimiento) => movimiento.tipo === 'gasto',
  );

  const totalGastos = gastos.reduce(
    (suma, movimiento) => suma + movimiento.cantidad,
    0,
  );

  // let totalGastos = 0
  // for (let i = 0; i < gastos.length; i++) {
  //   // totalGastos = totalGastos + gastos[i].cantidad
  //   totalGastos += gastos[i].cantidad
  // }

  totalGastado.textContent = `${totalGastos}€`;
};

const registrarMovimiento = (tipo) => {
  const concepto = inputConcepto.value;
  const cantidad = Number(inputCantidad.value);

  if (concepto === '' || cantidad <= 0) {
    alert('Escribe un concepto y una cantidad válida');
    return;
  }

  movimientos.push({
    concepto: concepto,
    cantidad: cantidad,
    tipo: tipo,
  });

  if (tipo === 'gasto') {
    saldo -= cantidad;
    calcularGastosTotales();
  } else {
    saldo += cantidad;
  }

  inputConcepto.value = '';
  inputCantidad.value = '';

  actualizarSaldo();
  mostrarMovimientos(movimientos);
};

// btnGasto.addEventListener("click", () => {
//   const concepto = inputConcepto.value
//   const cantidad = Number(inputCantidad.value)

//   if (concepto === "" || cantidad <= 0) {
//     alert("Escribe un concepto y una cantidad válida")
//     return
//   }

//   movimientos.push({
//     concepto: concepto,
//     cantidad: cantidad,
//     tipo: "gasto",
//   })
//   saldo -= cantidad

//   inputConcepto.value = ""
//   inputCantidad.value = ""
//   actualizarSaldo()
//   mostrarMovimientos(movimientos)
//   calcularGastosTotales()
// })

btnGasto.addEventListener('click', () => registrarMovimiento('gasto'));

// btnIngreso.addEventListener("click", () => {
//   const concepto = inputConcepto.value
//   const cantidad = Number(inputCantidad.value)

//   if (concepto === "" || cantidad <= 0) {
//     alert("Escribe un concepto y una cantidad válida")
//     return
//   }

//   movimientos.push({
//     concepto,
//     cantidad,
//     tipo: "ingreso",
//   })
//   saldo += cantidad

//   inputConcepto.value = ""
//   inputCantidad.value = ""

//   actualizarSaldo()
//   mostrarMovimientos(movimientos)
// })

btnIngreso.addEventListener('click', () => registrarMovimiento('ingreso'));

btnTodosGastos.addEventListener('click', () => {
  mostrarMovimientos(movimientos);
});

btnSoloGastos.addEventListener('click', () => {
  const gastos = movimientos.filter(
    (movimiento) => movimiento.tipo === 'gasto',
  );
  mostrarMovimientos(gastos);
});

btnSoloIngresos.addEventListener('click', () => {
  const ingresos = movimientos.filter(
    (movimiento) => movimiento.tipo === 'ingreso',
  );
  mostrarMovimientos(ingresos);
});
actualizarSaldo();
mostrarMovimientos(movimientos);
calcularGastosTotales();
