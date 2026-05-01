
// javascript removido pois a caixa de confirmacao através do google sheets foi substituida pelo link direto

// Esta é a sua base de dados de convidados
const listaVIP = [
    
    // Adicione os nomes sempre em LETRAS MAIÚSCULAS para facilitar a busca depois
];

// 1. Selecionamos os elementos que vamos usar
const btnConfirmar = document.getElementById('btn-confirmar');
const inputNome = document.getElementById('nome-convidado');
const mensagemFeedback = document.getElementById('mensagem-feedback');

// 2. Criamos o "Ouvinte de Eventos" (Escuta o clique do botão)
btnConfirmar.addEventListener('click', function() {
    
    // Pegamos o que foi digitado, transformamos em MAIÚSCULAS e removemos espaços extras
    const nomeDigitado = inputNome.value.toUpperCase().trim();

    // 3. Verificação (A lógica de Negócio)
    if (nomeDigitado === "") {
        mensagemFeedback.innerText = "Por favor, digite um nome.";
        mensagemFeedback.style.color = "orange";
    } 
    else if (listaVIP.includes(nomeDigitado)) {
        // Se o nome estiver na lista
        mensagemFeedback.innerText = "Enviando confirmação...";
        mensagemFeedback.style.color = "blue";

        // URL que você copiou do Google Apps Script
        const urlPlanilha = "inserir link do google sheets";

        // Enviando os dados para o Google Sheets
        fetch(urlPlanilha, {
            method: 'POST',
            mode: 'no-cors', // Importante para evitar erros de política de segurança simples
            body: JSON.stringify({ nome: nomeDigitado }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(() => {
            mensagemFeedback.innerText = "Confirmado com sucesso na nossa lista! 🎉";
            mensagemFeedback.style.color = "green";
            inputNome.value = "";
        })
        .catch(erro => {
            mensagemFeedback.innerText = "Erro ao conectar. Tente novamente.";
            mensagemFeedback.style.color = "red";
        });
    }
    else {
        // Se o nome NÃO estiver na lista
        mensagemFeedback.innerText = "Desculpe, este nome não consta na lista de convidados. Verifique a grafia ou entre em contato com os noivos.";
        mensagemFeedback.style.color = "red";
    }
});
