       let elementoIzquierdo = null;
        let conexionesCorrectas = 0;
        const totalConexiones = 4; // Muestra 4 parejas por partida

        const canvas = document.getElementById('lienzo');
        const ctx = canvas.getContext('2d');
        let lineasGuardadas = [];

        // Banco de datos: Cada vocal tiene asignada una lista con 5 imágenes alternativas
        const bancoVocales = [
            {
                letra: 'A',
                imagenes: ['avion.png', 'abeja.png', 'arbol.png', 'anillo.png', 'arana.png']
            },
            {
                letra: 'E',
                imagenes: ['elefante.png', 'estrella.png', 'escoba.png', 'espejo.png', 'erizo.png']
            },
            {
                letra: 'I',
                imagenes: ['isla.png', 'iglu.png', 'iman.png', 'iglesia.png', 'incendio.png']
            },
            {
                letra: 'O',
                imagenes: ['oso.png', 'ojo.png', 'oreja.png', 'olla.png', 'oveja.png']
            },
            {
                letra: 'U',
                imagenes: ['uva.png', 'unicornio.png', 'uno.png', 'una.png', 'urracca.png']
            }
        ];

        function generarElementosAleatorios() {
            const colIzquierda = document.getElementById('col-izquierda');
            const colDerecha = document.getElementById('col-derecha');
            
            colIzquierda.innerHTML = '';
            colDerecha.innerHTML = '';

            // 1. Mezclar las 5 vocales base y elegir 4 para la partida actual
            let vocalesMezcladas = [...bancoVocales].sort(() => Math.random() - 0.5);
            let seleccionadas = vocalesMezcladas.slice(0, totalConexiones);

            let bloquesIzq = [];
            let bloquesDer = [];

            // 2. Construir los contenedores cuadrados de imágenes (Izquierda)
            seleccionadas.forEach(item => {
                // Elige una imagen al azar de las 5 disponibles para esta vocal
                let imagenAlAzar = item.imagenes[Math.floor(Math.random() * item.imagenes.length)];

                let div = document.createElement('div');
                div.className = 'bloque';
                div.setAttribute('data-vocal', item.letra); // Identificador de coincidencia
                div.onclick = function() { seleccionarIzquierda(this); };
                
                // Insertamos la etiqueta HTML de la imagen local
                div.innerHTML = `<img src="${imagenAlAzar}" alt="Dibujo">`;
                bloquesIzq.push(div);
            });

            // 3. Construir los contenedores cuadrados de letras (Derecha)
            seleccionadas.forEach(item => {
                let div = document.createElement('div');
                div.className = 'bloque';
                div.setAttribute('data-vocal', item.letra);
                div.onclick = function() { seleccionarDerecha(this); };
                div.innerHTML = `<div class="item-vocal">${item.letra}</div>`;
                bloquesDer.push(div);
            });

            // 4. Barajar el orden vertical de ambas columnas por separado
            bloquesIzq.sort(() => Math.random() - 0.5);
            bloquesDer.sort(() => Math.random() - 0.5);

            // 5. Renderizar los bloques en la pantalla
            bloquesIzq.forEach(b => colIzquierda.appendChild(b));
            bloquesDer.forEach(b => colDerecha.appendChild(b));
        }

        function ajustarCanvas() {
            const container = document.getElementById('juego');
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
            redibujarLineas();
        }

        window.addEventListener('load', () => {
            generarElementosAleatorios();
            ajustarCanvas();
        });
        window.addEventListener('resize', ajustarCanvas);

        function seleccionarIzquierda(elemento) {
            if (elementoIzquierdo) {
                elementoIzquierdo.classList.remove('seleccionado');
            }
            elementoIzquierdo = elemento;
            elementoIzquierdo.classList.add('seleccionado');
        }

        function seleccionarDerecha(elementoDerecho) {
            if (!elementoIzquierdo) {
                alert("¡Primero selecciona un dibujo del lado izquierdo!");
                return;
            }

            // Validación por el identificador de la vocal
            if (elementoIzquierdo.getAttribute('data-vocal') === elementoDerecho.getAttribute('data-vocal')) {
                elementoIzquierdo.classList.remove('seleccionado');
                elementoIzquierdo.classList.add('correcto');
                elementoDerecho.classList.add('correcto');

                guardarCoordenadasLinea(elementoIzquierdo, elementoDerecho);
                conexionesCorrectas++;
                elementoIzquierdo = null;

                if (conexionesCorrectas === totalConexiones) {
                    setTimeout(() => {
                        alert("🎉 ¡Excelente trabajo! Completaste toda la actividad de las vocales. 🌟");
                        document.getElementById('btn-reinicio').style.display = 'inline-block';
                    }, 300);
                }
            } else {
                alert("❌ ¡Inténtalo de nuevo! Escucha con cuidado el sonido inicial del dibujo.");
                elementoIzquierdo.classList.remove('seleccionado');
                elementoIzquierdo = null;
            }
        }

        function guardarCoordenadasLinea(elIzq, elDer) {
            const rectJuego = document.getElementById('juego').getBoundingClientRect();
            const rectIzq = elIzq.getBoundingClientRect();
            const rectDer = elDer.getBoundingClientRect();

            const x1 = rectIzq.right - rectJuego.left;
            const y1 = (rectIzq.top + rectIzq.height / 2) - rectJuego.top;
            
            const x2 = rectDer.left - rectJuego.left;
            const y2 = (rectDer.top + rectDer.height / 2) - rectJuego.top;

            lineasGuardadas.push({x1, y1, x2, y2});
            dibujarLinea(x1, y1, x2, y2);
        }

        function dibujarLinea(x1, y1, x2, y2) {
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = "#2ed573"; 
            ctx.lineWidth = 5;
            ctx.lineCap = "round";
            ctx.stroke();
        }

        function redibujarLineas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            lineasGuardadas.forEach(l => dibujarLinea(l.x1, l.y1, l.x2, l.y2));
        }

        function reiniciarJuego() {
            conexionesCorrectas = 0;
            lineasGuardadas = [];
            elementoIzquierdo = null;

            document.getElementById('btn-reinicio').style.display = 'none';

            generarElementosAleatorios();

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            setTimeout(ajustarCanvas, 50);
        }

