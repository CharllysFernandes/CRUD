let novaTabela = (i, nome, email, telefone) => `
<th scope="row">${i + 1}</th>
      <td>${nome}</td>
      <td>${email}</td>
      <td>${telefone}</td>
      <td>
      <button type="button" class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal"
      onclick="editarCliente(${i})">Alterar</button>    
      </td>
      <td>
        <button type="button" class="btn btn-danger btn-sm" onclick="excluirCliente(${i})">Excluir</button>
      </td>
`

const btnModalSalvar = document.getElementById("btnModalSalvar");

btnModalSalvar.addEventListener('click', function () {
  salvarCliente();
})

const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
atualizarTabela(clientes);

function salvarCliente() {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const telefone = formatarTelefone(document.getElementById("telefone").value);

  // Verifica se os campos estão vazios
  if (nome === "" || email === "" || telefone === "") {
    alert("Preencha todos os campos antes de salvar o cliente.");
    return;
  }

  const novoCliente = {
    nome,
    email,
    telefone,
  };

  clientes.push(novoCliente);
  localStorage.setItem("clientes", JSON.stringify(clientes));
  limparFormulario();
  fecharModal();
  atualizarTabela(clientes);

}

function verficarCamposVazio() {
  if (nome === "" || email === "" || telefone === "") {
    alert("Preencha todos os campos antes de salvar o cliente.");
    return;
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
  localStorage.setItem("clientes", JSON.stringify(clientes));
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

// TO-DO corrija input do telefone.

const telefoneInput = document.getElementById("telefone");

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

