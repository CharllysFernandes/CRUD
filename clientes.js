function salvarClientesNoLocalStorage(clientes) {
    localStorage.setItem("clientes", JSON.stringify(clientes));
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
  
  function excluirCliente(i, clientes) {
    clientes.splice(i, 1);
  
    salvarClientesNoLocalStorage(clientes)
    atualizarTabela(clientes);
  }
  
  export { salvarClientesNoLocalStorage, formatarTelefone, atualizarTabela, excluirCliente };
  