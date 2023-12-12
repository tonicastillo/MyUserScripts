// ==UserScript==
// @name         AutoScroll for Thinkdiffusion kohya log
// @namespace    
// @version      0.1
// @description  AutoScroll and replace body content every 4 seconds
// @author       Toni Castillo
// @updateURL    https://github.com/tonicastillo/MyUserScripts/raw/main/ThinkDiffusionKohyaAutoScroll.user.js
// @match        https://*.thinkdiffusion.xyz/images/file_download/%2Fkohya%2Flogging/kohya.txt
// @icon         https://github.com/tonicastillo/MyUserScripts/raw/main/assets/ThinkDiffusionKohyaAutoScroll.svg
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
  
    // Configuración del intervalo de tiempo (en milisegundos)
    let intervalo = 1000; // Puedes cambiar este valor según tus preferencias
  
  
    function escapeHtml(html) {
      const div = document.createElement('div');
      div.textContent = html;
      return div.innerHTML;
    }
  
    function reemplazarYScroll() {
      // Realizar un fetch de la misma página
      fetch(window.location.href)
        .then((response) => response.text())
        .then((html) => {
          // Reemplazar el contenido del body
  
          document.querySelector('body > pre').innerHTML = new DOMParser().parseFromString(escapeHtml(html), 'text/html').body.innerHTML;
  
          // Hacer scroll rápido hasta el final
          window.scrollTo(0, document.body.scrollHeight);
        })
        .catch((error) => console.error('Error en la solicitud fetch:', error));
    }
  
    // Crear un botón de estilo iOS para activar o desactivar el refresco
    const iosButton = document.createElement('div');
    iosButton.style.position = 'fixed';
    iosButton.style.top = '10px';
    iosButton.style.right = '10px';
    iosButton.style.padding = '10px';
    iosButton.style.borderRadius = '10px';
    iosButton.style.background = '#007aff';
    iosButton.style.color = 'white';
    iosButton.style.cursor = 'pointer';
    iosButton.textContent = 'AutoScroll: ON';
  
    // Función para cambiar el estado del AutoScroll y actualizar el texto del botón
    function toggleAutoScroll() {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
        iosButton.textContent = 'AutoScroll: OFF';
      } else {
        intervalId = setInterval(reemplazarYScroll, intervalo);
        iosButton.textContent = 'AutoScroll: ON';
      }
    }
  
    // Asignar la función al evento de clic del botón
    iosButton.addEventListener('click', toggleAutoScroll);
  
    // Agregar el botón al cuerpo del documento
    document.body.appendChild(iosButton);
    document.querySelector('body > pre').style.paddingBottom = '4em';
    let intervalId = setInterval(reemplazarYScroll, intervalo);
  })();
  