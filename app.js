const btnTheme = document.getElementById("btn-theme");
const body = document.body;

btnTheme.addEventListener("click", () => {
    body.classList.toggle("dark");
});

// Seleciona o botão de cadastro pelo id
const btnCadastro = document.getElementById("btn-cadastro");

// Adiciona um listener de evento ao botão de cadastro
btnCadastro.addEventListener("click", function() {
  // Seleciona o modal de cadastro pelo id
  const modalCadastro = document.getElementById("modal-cadastro");
  
  // Abre o modal de cadastro
  const modal = new bootstrap.Modal(modalCadastro);
  modal.show();
  
  // Seleciona o botão de salvar do modal pelo id
  const btnSalvar = document.getElementById("btn-salvar");

  // Adiciona um listener de evento ao botão de salvar
  btnSalvar.addEventListener("click", function() {
    // Captura os dados dos inputs
    const nome = document.getElementById("input-nome").value;
    const email = document.getElementById("input-email").value;
    const celular = document.getElementById("input-celular").value;
    const cidade = document.getElementById("input-cidade").value;

    // Realiza o cadastro dos dados
    // ...
    
    // Fecha o modal de cadastro
    modal.hide();
  });
});
