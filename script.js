// selecionando o botão "Salvar" dentro do modal
const btnSalvar = document.querySelector("#btn-salvar");
const tableBody = document.querySelector("#table-body");

// verificando se há clientes salvos no localStorage ao carregar a página
if (localStorage.getItem("clientes")) {
  renderizaClientesNaTabela();
}

// adicionando um evento de clique no botão "Salvar"

function validarCampos() {
  const nome = document.querySelector("#input-nome").value;
  const email = document.querySelector("#input-email").value;
  const celular = formatPhoneNumber(document.querySelector("#input-celular").value);
  const cidade = document.querySelector("#input-cidade").value;
  
  if (!nome || !email || !celular || !cidade) {
    alert("Por favor, preencha todos os campos.");
    return false;
  }
  btnSalvar.setAttribute("data-bs-dismiss", "modal");
  return true;
}

function salvarDados() {
  if (!validarCampos()) {
    return;
  }

  const nome = document.querySelector("#input-nome").value;
  const email = document.querySelector("#input-email").value;
  const celular = formatPhoneNumber(document.querySelector("#input-celular").value);
  const cidade = document.querySelector("#input-cidade").value;
  
  const formData = {
    nome,
    email,
    celular,
    cidade,
  };
  
  const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
  
  clientes.push(formData);
  
  localStorage.setItem("clientes", JSON.stringify(clientes));
  
  const modal = document.querySelector("#myModal");
  const modalBootstrap = bootstrap.Modal.getInstance(modal);
  modalBootstrap._backdrop.remove();
  modalBootstrap.hide();
  
  const form = document.querySelector("#myForm");
  form.reset();
  renderizaClientesNaTabela();
}

function formatPhoneNumber(phoneNumberString) {
  // Remove tudo que não é número
  const cleaned = phoneNumberString.replace(/\D/g, "");

  // Verifica se o número tem 10 ou 11 dígitos
  const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
  if (match) {
    // Formata o número com 10 dígitos
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }

  const match9 = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
  if (match9) {
    // Formata o número com 9 dígitos
    return `(${match9[1]}) ${match9[2]}-${match9[3]}`;
  }

  // Se o número não tem 10 ou 11 dígitos, retorna o número original
  return phoneNumberString;
}

function renderizaClientesNaTabela() {
  if (localStorage.getItem("clientes")) {
    // recuperando os dados salvos do localStorage
    const clientesArray = JSON.parse(localStorage.getItem("clientes"));

    // limpando o conteúdo da tabela
    tableBody.innerHTML = "";

    // percorrendo o array de dados e adicionando as linhas na tabela
    clientesArray.forEach((cliente) => {
      // criando a linha da tabela
      const row = document.createElement("tr");

      // criando as células da linha com os dados do cliente
      const nomeCell = document.createElement("td");
      nomeCell.innerText = cliente.nome;
      row.appendChild(nomeCell);

      const emailCell = document.createElement("td");
      emailCell.innerText = cliente.email;
      row.appendChild(emailCell);

      const celularCell = document.createElement("td");
      celularCell.innerText = cliente.celular;
      row.appendChild(celularCell);

      const cidadeCell = document.createElement("td");
      cidadeCell.innerText = cliente.cidade;
      row.appendChild(cidadeCell);

      // adicionando a linha na tabela
      tableBody.appendChild(row);
    });
  }
}



btnSalvar.addEventListener("click", salvarDados);
document.getElementById("input-celular").addEventListener('input', function(event) {
  var phoneNumber = event.target.value;
  event.target.value = formatPhoneNumber(phoneNumber);
});
