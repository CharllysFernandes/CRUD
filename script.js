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

      // criando a célula para os botões de ação
      const acaoCell = document.createElement("td");


      // adicionando botão "Alterar"
      const btnAlterar = document.createElement("button");
      btnAlterar.innerText = "Alterar";
      btnAlterar.classList.add("btn", "btn-success", "me-2");
      btnAlterar.addEventListener("click", () => {
        // adicionar a função para alterar o cliente aqui
      });
      acaoCell.appendChild(btnAlterar);

      // adicionando botão "Excluir"
      const btnExcluir = document.createElement("button");
      btnExcluir.innerText = "Excluir";
      btnExcluir.classList.add("btn", "btn-danger");
      btnExcluir.addEventListener("click", () => {
        excluirCliente(btnExcluir);
      });
      acaoCell.appendChild(btnExcluir);

      row.appendChild(acaoCell);

      // adicionando a linha na tabela
      tableBody.appendChild(row);
    });
  }
}

function excluirCliente(btnExcluir) {
  const rowIndex = btnExcluir.closest('tr').rowIndex - 1; // obtém o índice da linha da tabela
  const clientesArray = JSON.parse(localStorage.getItem("clientes")); // obtém o array de clientes salvos no localStorage
  clientesArray.splice(rowIndex, 1); // remove o cliente correspondente do array
  localStorage.setItem("clientes", JSON.stringify(clientesArray)); // salva o array atualizado no localStorage
  renderizaClientesNaTabela(); // atualiza a tabela exibida na página
}




btnSalvar.addEventListener("click", salvarDados);
document.getElementById("input-celular").addEventListener('input', function (event) {
  var phoneNumber = event.target.value;
  event.target.value = formatPhoneNumber(phoneNumber);
});

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-alterar")) {
    // Obtem a linha da tabela onde o botão "Alterar" foi clicado
    const linha = event.target.parentNode.parentNode;

    // Obtem os dados do cliente selecionado na tabela
    const nome = linha.querySelector("td:nth-child(1)").innerText;
    const email = linha.querySelector("td:nth-child(2)").innerText;
    const celular = linha.querySelector("td:nth-child(3)").innerText;
    const cidade = linha.querySelector("td:nth-child(4)").innerText;

    // Define os valores dos inputs no modal
    const inputNome = document.getElementById("input-nome");
    const inputEmail = document.getElementById("input-email");
    const inputCelular = document.getElementById("input-celular");
    const inputCidade = document.getElementById("input-cidade");

    inputNome.value = nome;
    inputEmail.value = email;
    inputCelular.value = celular;
    inputCidade.value = cidade;

    // Adiciona um atributo data-cliente-id com o id do cliente para ser usado na hora de salvar as alterações
    const clienteId = linha.getAttribute("data-cliente-id");
    const btnSalvar = document.getElementById("btn-salvar");
    btnSalvar.setAttribute("data-cliente-id", clienteId);
  }
});
