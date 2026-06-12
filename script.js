document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       1. SISTEMA DE SEÇÕES EXPANSÍVEIS (ACCORDION)
       ========================================================================== */
    const accordionTriggers = document.querySelectorAll('.accordion-trigger');

    accordionTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const currentItem = this.parentElement;
            const content = currentItem.querySelector('.accordion-content');
            const isActive = currentItem.classList.contains('active');

            // Fechar todos os outros accordions (Efeito de sanfona único)
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.accordion-content').style.maxHeight = null;
                item.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
            });

            // Alternar o atual
            if (!isActive) {
                currentItem.classList.add('active');
                content.style.maxHeight = content.scrollHeight + "px";
                this.setAttribute('aria-expanded', 'true');
            }
        });
    });

    /* ==========================================================================
       2. RECURSOS DE ACESSIBILIDADE FLUTUANTE
       ========================================================================== */
    let currentFontSize = 100; // Porcentagem do tamanho padrão
    const bodyElement = document.body;

    // Controle de Fonte
    document.getElementById('btn-increase-font').addEventListener('click', () => {
        if (currentFontSize < 140) {
            currentFontSize += 10;
            bodyElement.style.fontSize = `${currentFontSize}%`;
        }
    });

    document.getElementById('btn-decrease-font').addEventListener('click', () => {
        if (currentFontSize > 80) {
            currentFontSize -= 10;
            bodyElement.style.fontSize = `${currentFontSize}%`;
        }
    });

    // Alternador de Tema (Modo Claro / Escuro com alto contraste)
    document.getElementById('btn-toggle-theme').addEventListener('click', () => {
        bodyElement.classList.toggle('light-theme');
    });

    /* ==========================================================================
       3. LEITURA POR VOZ (SPEECH SYNTHESIS API)
          Lê apenas o conteúdo principal da página
       ========================================================================== */
    const speakBtn = document.getElementById('btn-speak');
    const stopBtn = document.getElementById('btn-stop-speak');
    let speechUtterance = null;

    speakBtn.addEventListener('click', () => {
        // Interrompe qualquer leitura em andamento
        window.speechSynthesis.cancel();

        // Alvo: Conteúdo Principal estruturado
        const contentContainer = document.getElementById('main-content');
        if (!contentContainer) return;

        // Captura apenas o texto corrido visível das tags de artigo e títulos
        const textToRead = contentContainer.innerText;

        speechUtterance = new SpeechSynthesisUtterance(textToRead);
        speechUtterance.lang = 'pt-BR';
        speechUtterance.rate = 1.0; // Velocidade padrão

        // Efeitos visuais opcionais no botão
        speakBtn.textContent = "🔊 Lendo...";
        
        speechUtterance.onend = () => {
            speakBtn.textContent = "🔊 Ouvir";
        };

        window.speechSynthesis.speak(speechUtterance);
    });

    stopBtn.addEventListener('click', () => {
        window.speechSynthesis.cancel();
        speakBtn.textContent = "🔊 Ouvir";
    });

    /* ==========================================================================
       4. INTERAÇÃO INTERATIVA: CAIXA DE COMENTÁRIOS
       ========================================================================== */
    const commentForm = document.getElementById('comment-form');
    const commentText = document.getElementById('comment-text');
    const commentsDisplay = document.getElementById('comments-display');

    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const message = commentText.value.trim();
        if (message === '') return;

        // Cria o card de comentário dinamicamente
        const commentBlock = document.createElement('div');
        commentBlock.className = 'comment-block';
        
        // Formata data e hora do envio simulado
        const now = new Date();
        const formattedDate = now.toLocaleDateString('pt-BR') + ' às ' + now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

        commentBlock.innerHTML = `
            <p style="font-size: 0.85rem; color: var(--color-laranja); font-weight: bold; margin-bottom: 5px;">
                Especialista Conectado • ${formattedDate}
            </p>
            <p style="color: var(--text-primary); font-size: 0.95rem;">${message}</p>
        `;

        // Insere no início da lista de exibição
        commentsDisplay.insertBefore(commentBlock, commentsDisplay.firstChild);

        // Limpa o formulário
        commentText.value = '';
    });

    /* ==========================================================================
       5. VALIDAÇÃO SIMPLIFICADA DO FORMULÁRIO DE INSCRIÇÃO
       ========================================================================== */
    const signupForm = document.getElementById('signup-form');
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Inscrição realizada com sucesso no Seminário Online AgroForte!');
        signupForm.reset();
    });
});