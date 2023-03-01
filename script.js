let novaTabela = (i, nome, email, telefone) => `
<th scope="row">${i + 1}</th>
      <td>${nome}</td>
      <td>${email}</td>
      <td>${telefone}</td>
      <td>
      <button type="button" class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#modal-editar-cliente"
      onclick="criarModalEditarCliente(${i})">Alterar</button>    
      </td>
      <td>
        <button type="button" class="btn btn-danger btn-sm" onclick="excluirCliente(${i})">Excluir</button>
      </td>
`
const telefoneInput = document.getElementById("telefone");
const btnModalSalvar = document.getElementById("btnModalSalvar");

btnModalSalvar.addEventListener('click', function () {
  salvarCliente();
})

const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
atualizarTabela(clientes);

function salvarClientesNoLocalStorage(clientes) {
  localStorage.setItem("clientes", JSON.stringify(clientes));
}

function validarCampos(nome, email, telefone) {
  if (nome === "" || email === "" || telefone === "") {
    alert("Preencha todos os campos antes de salvar o cliente.");
    return false;
  }
  return true;
}

function salvarCliente() {
  if (validarCampos(nome, email, telefone)) {
    // código para salvar o cliente
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = formatarTelefone(document.getElementById("telefone").value);

    // Verifica se os campos estão vazios
    if (nome === "" || email === "" || telefone === "") {
      alert("Preencha todos os campos antes de salvar o cliente.");
      return;
    }

    const clienteExistente = clientes.every(cliente => cliente.nome !== nome);
    const emailExistente = clientes.every(cliente => cliente.email !== email);
    const telefoneExistente = clientes.every(cliente => cliente.telefone !== telefone);

    if (!clienteExistente) {
      alert("Este cliente já foi adicionado antes.");
      return;
    }

    if (!emailExistente) {
      alert("Este email já foi adicionado antes.");
      return;
    }

    if (!telefoneExistente) {
      alert("Este telefone já foi adicionado antes.");
      return;
    }


    const novoCliente = {
      nome,
      email,
      telefone,
    };

    clientes.push(novoCliente);

    salvarClientesNoLocalStorage(clientes)
    limparFormulario();
    fecharModal();
    atualizarTabela(clientes);
  }
}

function fecharModal() {
  let modalElement = document.getElementById('exampleModal');
  let modal = bootstrap.Modal.getInstance(modalElement);
  modal.hide();
}

function limparFormulario() {
  const form = document.querySelector("#modal-form");
  form.reset();
}

function atualizarTabela(clientes) {
  const tbody = document.getElementById('tbody');
  tbody.innerHTML = '';

  for (let i = 0; i < clientes.length; i++) {
    const cliente = clientes[i];

    const tr = document.createElement('tr');
    let nome = cliente.nome
    let email = cliente.email
    let telefone = cliente.telefone
    tr.innerHTML = novaTabela(i, nome, email, telefone);

    tbody.appendChild(tr);
  }
}

function excluirCliente(i) {
  clientes.splice(i, 1);

  salvarClientesNoLocalStorage(clientes)
  atualizarTabela(clientes);
}

function formatarTelefone(telefone) {
  const telefoneNumerico = telefone.replace(/\D/g, "");
  if (telefoneNumerico.length < 10 || telefoneNumerico.length > 11) {
    return telefone;
  }
  const ddd = telefoneNumerico.slice(0, 2);
  let numero = telefoneNumerico.slice(2);

  if (numero.length === 8) {
    numero = `${numero.slice(0, 4)}-${numero.slice(4)}`;
  } else {
    numero = `${numero.slice(0, 5)}-${numero.slice(5)}`;
    if (ddd) {
      numero = `(${ddd}) ${numero}`;
    }
  }
  return numero;
}

telefoneInput.addEventListener("input", () => {
  let telefone = telefoneInput.value;
  if (telefone.length >= 11) {
    let telefoneFormatado = formatarTelefone(telefone);
    telefoneInput.value = telefoneFormatado;
  }
});

/**
 * Funcões para alterar
 * 
 */

// Função para criar o modal de edição de cliente
function criarModalEditarCliente(indice) {
  const nomeInput = document.getElementById("editar-nome");
  const emailInput = document.getElementById("editar-email");
  const telefoneInput = document.getElementById("editar-telefone");

  nomeInput.value = clientes[indice].nome;
  emailInput.value = clientes[indice].email;
  telefoneInput.value = clientes[indice].telefone;

  const btnSalvarAlteracoes = document.getElementById("btn-modal-editar-salvar");
  btnSalvarAlteracoes.addEventListener("click", () => {
    if (validarCampos(nomeInput.value, emailInput.value, telefoneInput.value)) {
      // código para salvar o cliente
      const novoNome = nomeInput.value;
      const novoEmail = emailInput.value;
      const novoTelefone = telefoneInput.value;

      // Atualiza os dados do cliente no array de clientes e no localStorage
      clientes[indice].nome = novoNome;
      clientes[indice].email = novoEmail;
      clientes[indice].telefone = novoTelefone;
      salvarClientesNoLocalStorage(clientes);

      // Fecha o modal e atualiza a tabela de clientes
      fecharModalEditarCliente();
      atualizarTabela(clientes);
    }
  });
  abrirModalEditarCliente();

}

function abrirModalEditarCliente() {
  let modalElement = document.getElementById('modal-editar-cliente');
  let modal = bootstrap.Modal.getInstance(modalElement);
  modal.show();
}

// Função para fechar o modal de edição de cliente
function fecharModalEditarCliente() {
  let modalElement = document.getElementById('modal-editar-cliente');
  let modal = bootstrap.Modal.getInstance(modalElement);
  modal.hide();
}

