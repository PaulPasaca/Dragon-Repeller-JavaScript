let xp = 0;
let salud = 100;
let oro = 50;
let armaActual = 0;
let luchando;
let saludMounstruo;
let inventario = ["palo"];


/*JavaScript interactúa con el HTML utilizando el Modelo de Objetos del Documento, o DOM. 
El DOM es un árbol de objetos que representa el HTML. Puedes acceder al HTML usando el 
objeto documento, que representa todo tu documento HTML.*/
const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const txtXP = document.querySelector("#xpText");
const txtSalud = document.querySelector("#healthText");
const txtOro = document.querySelector("#goldText");
const estadisMounstruo = document.querySelector("#monsterStats");
const nombreMounstruo = document.querySelector("#monsterName");
const txtSaludMounstruo = document.querySelector("#monsterHealth");
const armas = [
  { name: 'palo', power: 5 },
  { name: 'daga', power: 30 },
  { name: 'martillo', power: 50 },
  { name: 'espada', power: 100 }
];
const monsters = [
  {
    name: "limo",
    level: 2,
    health: 15
  },
  {
    name: "bestia del fango",
    level: 8,
    health: 60
  },
  {
    name: "dragon",
    level: 20,
    health: 300
  }
]
const locations = [
  {
    name: "plaza del pueblo",
    "button text": ["Ir a la tienda", "Ir a la cueva", "Luchar contra el dragón"],
    "button functions": [iraTienda, iraCueva, lucharDragon],
    text: "Estás en la plaza del pueblo. Ve un cartel que dice \"Tienda\"."
  },
  {
    name: "tienda",
    "button text": ["Comprar 10 de salud (10 de oro)", "Comprar arma (30 oro)", "Ir a la plaza"],
    "button functions": [comprarSalud, comprarArma, iraCiudad],
    text: "Entras en la tienda."
  },
  {
    name: "cueva",
    "button text": ["Lucha contra el limo", "Lucha contra la bestia", "Ir a la plaza"],
    "button functions": [lucharLimo, lucharBestia, iraCiudad],
    text: "Entras en la cueva. Ves algunos monstruos."
  },
  {
    name: "luchar",
    "button text": ["Atacar", "Esquivar", "Correr"],
    "button functions": [atacar, esquivar, iraCiudad],
    text: "Estás luchando contra un monstruo."
  },
  {
    name: "matar al mounstruo",
    "button text": ["Ir a la plaza", "Ir a la plaza ", "Ir a la plaza "],
    "button functions": [iraCiudad, iraCiudad, iraCiudad],
    text: 'El monstruo grita "¡Arg!" al morir. Ganas puntos de experiencia y encuentras oro.'
  },
  {
    name: "perder",
    "button text": ["REINICIAR?", "REINICIAR?", "REINICIAR?"],
    "button functions": [reiniciar, reiniciar, reiniciar],
    text: "Estás muerto. ☠️"
  },
  {
    name: "ganar",
    "button text": ["REINICIAR?", "REINICIAR?", "REINICIAR?"],
    "button functions": [reiniciar, reiniciar, reiniciar],
    text: "¡Vences al dragón! ¡GANAS EL JUEGO! 🎉"
  },
  {
    name: "huevo de pascua",
    "button text": ["2", "8", "Ir a la plaza del pueblo?"],
    "button functions": [elegirDos, elegirOcho, iraCiudad],
    text: "Encuentra un juego secreto. Elige un número arriba. Se elegirán al azar diez números entre 0 y 10. Si el número que eliges coincide con uno de los números aleatorios, ¡ganas!"
  }
];

/*En JavaScript se puede acceder a las propiedades de dos maneras diferentes. 
La primera es con la notación de puntos. Acceder a la propiedad onclick de 
un botón sería como:*/
// initialize buttons
button1.onclick = iraTienda;
button2.onclick = iraCueva;
button3.onclick = lucharDragon;

/*La propiedad innerText controla el texto que aparece en un elemento HTML. 
Por ejemplo const info = document.querySelector("#info");
info.innerText = "Hello World";
*/

function actualizar(location) {
  estadisMounstruo.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
}

function iraCiudad() {
  actualizar(locations[0]);
}

function iraTienda() {
  actualizar(locations[1]);
}

function iraCueva() {
  actualizar(locations[2]);
}

function comprarSalud() {
  if (oro >= 10) {
    oro -= 10;
    salud += 10;
    txtOro.innerText = oro;
    txtSalud.innerText = salud;
  } else {
    text.innerText = "No tienes suficiente oro para comprar salud.";
  }
}

function comprarArma() {
  if (armaActual < armas.length - 1) {
    if (oro >= 30) {
      oro -= 30;
      armaActual++;
      txtOro.innerText = oro;
      let newWeapon = armas[armaActual].name;
      text.innerText = "Ahora tiene un " + newWeapon + ".";
      inventario.push(newWeapon);
      text.innerText += " En tu inventario tienes: " + inventario;
    } else {
      text.innerText = "No tienes suficiente oro para comprar un arma.";
    }
  } else {
    text.innerText = "¡Ya tienes el arma más poderosa!";
    button2.innerText = "Vender arma por 15 de oro";
    button2.onclick = venderArma;
  }
}


function venderArma() {
  if (inventario.length > 1) {
    oro += 15;
    txtOro.innerText = oro;
    let currentWeapon = inventario.shift();
    text.innerText = "Usted vendió " + currentWeapon + ".";
    text.innerText += " En tu inventario tienes: " + inventario;
  } else {
    text.innerText = "¡No vendas tu única arma!";
  }
}

function lucharLimo() {
  luchando = 0;
  irLuchar();
}

function lucharBestia() {
  luchando = 1;
  irLuchar();
}

function lucharDragon() {
  luchando = 2;
  irLuchar();
}



function irLuchar() {
  actualizar(locations[3]);
  saludMounstruo = monsters[luchando].health;
  estadisMounstruo.style.display = "block";
  /*Ahora, establece la propiedad innerText de monsterName para que sea la 
  propiedad name del monstruo actual.Haz lo mismo para monsterHealthText y 
  la propiedad health.*/
  nombreMounstruo.innerText = monsters[luchando].name;
  txtSaludMounstruo.innerText = saludMounstruo;

}

function atacar() {

  text.innerText = "El " + monsters[luchando].name + " ataca.";
  text.innerText += " Lo atacas con tu " + armas[armaActual].name + ".";
  salud -= obtenerValorAtaqueMous(monsters[luchando].level);
  if (golpeMounstruo()) {
    saludMounstruo -= armas[armaActual].power + Math.floor(Math.random() * xp) + 1;
  } else {
    text.innerText += " Fallaste.";
  }
  txtSalud.innerText = salud;
  txtSaludMounstruo.innerText = saludMounstruo;
  if (salud <= 0) {
    perder();
  } else if (saludMounstruo <= 0) {
    if (luchando === 2) {
      ganarJuego();
    } else {
      derrotarMounstruo();
    }
  }
  if (Math.random() <= .1 && inventario.length !== 1) {
    text.innerText += " Tu " + inventario.pop() + " se rompe.";
    armaActual--;
  }
}

function obtenerValorAtaqueMous(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  /*Las funciones ejecutan bloques específicos de código cuando son
  invocadas, pero también pueden devolver un valor. Este valor
  puede asignarse a una variable y utilizarse en otras partes 
  del código.
  Utilice la palabra clave return para devolver el valor de hit al final de la función. */
  /* El operador ternario es un operador condicional y puede utilizarse como 
  una sentencia if-else de una sola línea. 
  La sintaxis es: condición ? expresiónIfTrue : expresiónIfFalse. */
  return hit > 0 ? hit : 0;

}

function golpeMounstruo() {
  return Math.random() > .2 || salud < 20;
}

function esquivar() {
  text.innerText = "Esquivas el ataque del " + monsters[luchando].name;
}

function derrotarMounstruo() {
  oro += Math.floor(monsters[luchando].level * 6.7);
  xp += monsters[luchando].level;
  txtOro.innerText = oro;
  txtXP.innerText = xp;
  actualizar(locations[4]);
}


function perder() {
  actualizar(locations[5]);
}

function ganarJuego() {
  actualizar(locations[6]);
}

function reiniciar() {
  xp = 0;
  salud = 100;
  oro = 50;
  armaActual = 0;
  inventario = ["palo"]
  txtOro.innerText = oro;
  txtSalud.innerText = salud;
  txtXP.innerText = xp;
  iraCiudad();
}

function huevoPascua() {
  actualizar(locations[7]);
}

function elegirDos() {
  elegir(2);
}

function elegirOcho() {
  elegir(8);
}

function elegir(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "Elegiste " + guess + ". Aquí están los números aleatorios:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Muy bien! ¡Ganas 20 de oro!";
    oro += 20;
    txtOro.innerText = oro;
  } else {
    text.innerText += "Incorrecto! ¡Pierdes 10 puntos de salud!";
    health -= 10;
    txtSalud.innerText = health;
    if (health <= 0) {
      perder();
    }
  }
}