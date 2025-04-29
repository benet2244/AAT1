const preguntas = [
  { pregunta: "¿Qué significa HTML?", respuestas: ["HyperText Markup Language", "Hyperlink Text Marking", "Home Tool Markup Language"], correcta: 0 },
  { pregunta: "¿Qué hace CSS?", respuestas: ["Proporciona estructura", "Agrega interactividad", "Aplica estilos"], correcta: 2 },
  { pregunta: "¿Cuál es el lenguaje para programar lógica en el navegador?", respuestas: ["Java", "Python", "JavaScript"], correcta: 2 },
  { pregunta: "¿Qué estructura permite repetir código?", respuestas: ["if", "for", "else"], correcta: 1 },
  { pregunta: "¿Qué símbolo se usa para comentarios de una línea en JS?", respuestas: ["//", "/* */", ""], correcta: 0 },
  { pregunta: "¿Cuál es la etiqueta para insertar una imagen en HTML?", respuestas: ["<image>", "<img>", "<src>"], correcta: 1 },
  { pregunta: "¿Qué propiedad en CSS cambia el color del texto?", respuestas: ["font-color", "color", "text-color"], correcta: 1 },
  { pregunta: "¿Qué significa CSS?", respuestas: ["Cascading Style Sheets", "Creative Style Syntax", "Colorful Style System"], correcta: 0 },
  { pregunta: "¿Cuál no es un tipo de dato en JS?", respuestas: ["boolean", "float", "undefined"], correcta: 1 },
  { pregunta: "¿Qué operador se usa para comparar igualdad estricta en JS?", respuestas: ["==", "!=", "==="], correcta: 2 }
];

let indice = 0;
let puntuacion = 0;

// Elementos del DOM
const contenedorPregunta = document.getElementById("question"); 
const contenedorRespuestas = document.getElementById("answers");
const botonReiniciar = document.getElementById("next");
const resultado = document.getElementById("result");


function mostrarPregunta() {
  const actual = preguntas[indice];
  contenedorPregunta.textContent = actual.pregunta;
  contenedorRespuestas.innerHTML = "";
  resultado.textContent = "";

  for (let i = 0; i < actual.respuestas.length; i++) {
    const btn = document.createElement("button");
    btn.textContent = actual.respuestas[i];
    btn.className = "btn";
    btn.addEventListener("click", function () {
      verificarRespuesta(i, btn);
    });
    contenedorRespuestas.appendChild(btn);
  }
}

function verificarRespuesta(seleccion, boton) {
  const correcta = preguntas[indice].correcta;
  const botones = document.querySelectorAll(".btn");

  for (let i = 0; i < botones.length; i++) {
    botones[i].disabled = true;
    if (i === correcta) {
      botones[i].classList.add("correct");
    } else if (i === seleccion) {
      botones[i].classList.add("incorrect");
    }
  }

  if (seleccion === correcta) {
    puntuacion++;
  }

  setTimeout(() => {
    indice++;
    if (indice < preguntas.length) {
      mostrarPregunta();
    } else {
      mostrarResultado();
    }
  }, 1000);
}

function mostrarResultado() {
  contenedorPregunta.textContent = "Cuestionario completado.";
  contenedorRespuestas.innerHTML = "";
  resultado.textContent = `Puntuación: ${puntuacion} de ${preguntas.length}`;
  botonReiniciar.style.display = "block";
}

// Botton para Reiniciar el cuestionario
botonReiniciar.addEventListener("click", () => {
  indice = 0;
  puntuacion = 0;
  botonReiniciar.style.display = "none";
  mostrarPregunta();
});

// Iniciar Cuestionario
mostrarPregunta();