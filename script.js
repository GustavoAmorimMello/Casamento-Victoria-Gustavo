
// Esta é a sua base de dados de convidados
const listaVIP = [
    "VICTORIA SILVA","GUSTAVO AMORIM","GABRIEL AMORIM","MARILEZIA AMORIM","VANTOIL MAGALHAES","ELIANA", "ELAINE","MARCOS","CAIO","ELUIZA","CALEBE","EDILEA","EDSON VANDER",
    "NATHALIA","PEDRINHO","SARAH","FHELIPE","PAULO","ISRAEL","PAULA","FRANCESCO","ROSANA","ANDREIA","THAINA","EDSON","ELENITA","BRUNO","VANDER","GEISILANE","JENNIFER","MAICON","LUCAS",
    "TATIANA","MAURICIO","HELENA","BETINHO","PHELIPE","THAYANA","JOSI MELO","TIAGO","JOAO","GABY","CRISTIANE","FERNANDO","MANOELA","NEI","ADRIANA","JORGE","CLAUDIA","TELMA","MATEUS","LARAH",
    "BRUNO BARRETO","ISABELA","LUCAS BOMPET","VICTOR ANDRADE","RICARDO","AFFONSO","BIA","AMAURI","RAQUEL","LUCAS PEREIRA","MARIANA","VIVIANE","MARCELO","CRISTIANE","FABIO","SIMONE","ADRIANA",
    "ALAIDE","VIVIANE","EDUARDO","LOURDES", "MARCELA","GUSTAVO", "MANOELA", "CLAUDIO","ZECA","JOZELIA","LUIZA","ALMIRO","NAIRA","DANIEL","BRUNA","MABEL","JAMYNE","LEO","VANIA","ODILIA","CLAUDIO",
    "CAE","ELO","GERALDO","JOVIRIA","MARCINHO","ROGERIO","SILVANA","LUZIA","FLAVIA","GIGI","CHARLES","GIZELLE","TATIANA","ANDREIA","GERALDO","CIRLEY","TANIA","DIEGO","MARILDA","ROGERIA","ARCANJO",
    "TEANE","THAIZINHA","THAIS","NATHALIA","ALEXANDRE","GUILHERME","MANOEL","VILMA","FELIPE","GABRIELA","MANOELA"
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
        const urlPlanilha = "https://script.google.com/macros/s/AKfycbw6TI56aK1QtMWwtbRj7IcGGzov2tBO8kxWDG1WYld1n9pXTKyfTDwMl3lWCihTi3aJ/exec";

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