const botao = document.getElementById('botao');
    const container = document.getElementById('imagem-container');
    const spotifyPlayer = document.getElementById('spotify-player');
    const contadorWrapper = document.getElementById('contador-wrapper');
    const contadorEl = document.getElementById('contador');
    const declaracao = document.getElementById('declaracao');
    const separador = document.getElementById('separador');
    const slides = container.querySelectorAll('.slide');
    let index = 0;

    botao.addEventListener('click', () => {
      botao.style.display = 'none';
      container.style.display = 'block';
      atualizarContador();

      setTimeout(() => {
        spotifyPlayer.classList.add('visible');
        contadorWrapper.classList.add('visible');
        declaracao.classList.add('visible');
        separador.classList.add('visible');
      }, 100);

      setInterval(() => {
        const atual = slides[index];
        index = (index + 1) % slides.length;
        const proximo = slides[index];

        slides.forEach(slide => {
          slide.classList.remove('ativo', 'saindo');
          slide.style.transform = 'translateX(100%)';
          slide.style.zIndex = '1';
        });

        atual.classList.add('saindo');
        atual.style.transform = 'translateX(-100%)';

        proximo.classList.add('ativo');
        proximo.style.transform = 'translateX(0)';
        proximo.style.zIndex = '2';
      }, 3000);
    });

    function soltarCoracoes() {
      for (let i = 0; i < 25; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 2 + 2) + 's';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
      }
    }

    function atualizarContador() {
      const inicio = new Date("2023-06-07T00:00:00");
      const agora = new Date();

      let anos = agora.getFullYear() - inicio.getFullYear();
      let meses = agora.getMonth() - inicio.getMonth();
      let dias = agora.getDate() - inicio.getDate();
      let horas = agora.getHours() - inicio.getHours();
      let minutos = agora.getMinutes() - inicio.getMinutes();
      let segundos = agora.getSeconds() - inicio.getSeconds();

      if (segundos < 0) { segundos += 60; minutos--; }
      if (minutos < 0) { minutos += 60; horas--; }
      if (horas < 0) { horas += 24; dias--; }
      if (dias < 0) {
        const mesAnterior = new Date(agora.getFullYear(), agora.getMonth(), 0);
        dias += mesAnterior.getDate();
        meses--;
      }
      if (meses < 0) { meses += 12; anos--; }

      contadorEl.textContent = `${anos} ano(s), ${meses} mês(es), ${dias} dia(s), ${horas}h ${minutos}min ${segundos}s`;
    }

    setInterval(atualizarContador, 1000);
