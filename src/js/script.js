

const reiniciar = document.getElementById("reiniciar")
let novaTabela = (i, nome, email, telefone) => `
<th scope="row">${i + 1}</th>
      <td>${nome}</td>
      <td>${email}</td>
      <td>${telefone}</td>
      <td>
        <button type="button" class="btn btn-warning btn-sm"
          data-bs-toggle="modal" data-bs-target="#modal-editar-cliente"
          onclick="criarModalEditarCliente(${i})">
            Alterar
        </button>    
      </td>
      <td>
        <button type="button" class="btn btn-danger btn-sm"
          onclick="excluirCliente(${i})">
          Excluir
        </button>
      </td>
`
const telefoneInput = document.getElementById("telefone");
const btnModalSalvar = document.getElementById("btnModalSalvar");

btnModalSalvar.addEventListener('click', function () {
  salvarCliente();
})

const clientes = JSON.parse(localStorage.getItem("clientes")) || [
  
    {
        "nome": "Cliente 1",
        "email": "cliente1@email.com",
        "telefone": "(00) 98765-4321"
    },
    {
        "nome": "Cliente 2",
        "email": "cliente2@email.com",
        "telefone": "(99) 87654-3210"
    },
    {
        "nome": "Cliente 3",
        "email": "cliente3@email.com",
        "telefone": "(88) 76543-2109"
    }
];
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
  // Obter os valores dos campos do formulário
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const telefone = formatarTelefone(document.getElementById("telefone").value.trim());

  // Validar os campos
  if (!nome || !email || !telefone) {
    alert("Preencha todos os campos antes de salvar o cliente.");
    return;
  }

  if (!validarEmail(email)) {
    alert('Email inválido. Por favor, verifique o email informado.');
    return;
  }

  // Verificar se já existe um cliente com os mesmos dados
  const duplicataEncontrada = verificarDuplicata(clientes, {nome, email, telefone});
  if (duplicataEncontrada) {
    alert("Este cliente já foi adicionado antes.");
    return;
  }

  // Adicionar o novo cliente ao array de clientes
  const novoCliente = {nome, email, telefone};
  clientes.push(novoCliente);

  // Salvar o array atualizado no localStorage, limpar o formulário, fechar o modal e atualizar a tabela
  salvarClientesNoLocalStorage(clientes);
  limparFormulario();
  fecharModal();
  atualizarTabela(clientes);
}

// Função auxiliar para verificar se um novo cliente é uma duplicata de um cliente existente
function verificarDuplicata(clientes, novoCliente) {
  return clientes.some(cliente =>
    (cliente.nome === novoCliente.nome) ||
    (cliente.email === novoCliente.email) ||
    (cliente.telefone === novoCliente.telefone)
  );
}


function fecharModal() {
  let modalElement = document.getElementById('exampleModal');
  let modal = bootstrap.Modal.getInstance(modalElement);
  modal.hide();
  alert("Cliente Salvo com Sucesso!")
}

function limparFormulario() {
  const form = document.querySelector("#modal-form");
  form.reset();
}

// Atualiza a tabela de clientes na página.
function atualizarTabela(clientes) {
  // Obtém a tabela do DOM.
  const tbody = document.getElementById('tbody');
  // Remove todos os elementos filhos da tabela.
  tbody.innerHTML = '';

  // Itera sobre cada cliente e cria uma nova linha na tabela.
  clientes.forEach((cliente, i) => {
    const { nome, email, telefone } = cliente;
    const tr = document.createElement('tr');
    tr.innerHTML = novaTabela(i, nome, email, telefone);
    tbody.appendChild(tr);
  });
}


function excluirCliente(i) {
  clientes.splice(i, 1);

  salvarClientesNoLocalStorage(clientes)
  atualizarTabela(clientes);
}

function validarEmail(email) {
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(email);
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
  // Impede a entrada de letras
  if (isNaN(telefone.slice(-1))) {
    telefoneInput.value = telefone.slice(0, -1)
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
      const novoTelefone = formatarTelefone(telefoneInput.value);

      if (!validarEmail(novoEmail)) {
        alert('Email inválido. Por favor, verifique o email informado.');
        return
      }

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
const modificarTelefone = document.getElementById("editar-telefone")
modificarTelefone.addEventListener("input", function () {
  let telefone = modificarTelefone.value
  if (telefone.length >= 11) {
    let telefoneFormatado = formatarTelefone(telefone)
    modificarTelefone.value = telefoneFormatado
  }
  
  // Impede a entrada de letras
  if (isNaN(telefone.slice(-1))) {
    modificarTelefone.value = telefone.slice(0, -1)
  }

})

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
// Define a ação a ser tomada quando o botão "Reiniciar" for clicado.
reiniciar.addEventListener("click", () => {
  // Verifica se o usuário realmente deseja excluir o localStorage.
  if (confirm("Deseja realmente excluir o localStorage?")) {
    // Remove o item "clientes" do localStorage.
    localStorage.removeItem("clientes");
    // Recarrega a página para refletir a alteração.
    window.location.reload();
  } else {
    // Se o usuário não quiser excluir o localStorage, exibe uma mensagem informativa.
    exibirMensagemClientesNormalmente();
  }
});

// Define uma função auxiliar para exibir uma mensagem informando que os clientes ainda estão armazenados.
function exibirMensagemClientesNormalmente() {
  alert("Continue adicionando clientes normalmente");
}
