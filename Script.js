const atualizarDados = (id, nome, hora, dia, mes, ano) => {
    let novadiv = document.createElement('div');
    novadiv.classList.add('campo');
  
 
    novadiv.setAttribute('data-id', id);
  
    novadiv.innerHTML = `
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Horas Feitas:</strong> ${hora}</p>
        <p><strong>Data:</strong> ${dia}/${mes}/${ano}</p>
        <button onclick="excluirCampo(this)">Excluir</button>`;
  
    document.getElementById('camposExibidos').appendChild(novadiv);
  }
  
  const buscarDados = async () => {
    const Formulario = Parse.Object.extend('Formulario');
    const query = new Parse.Query(Formulario);
    try {
        const results = await query.find();
        for (const object of results) {
            atualizarDados(
                object.id,
                object.get('nome'),
                object.get('hora'),
                object.get('dia'),
                object.get('mes'),
                object.get('ano'),
            );
        }
    } catch (error) {
        console.error('Error while fetching Formulario', error);
    }
  }
  
  const excluirCampo = async (button) => {

    let id = button.parentElement.getAttribute('data-id');
  
    const query = new Parse.Query('Formulario');
    try {
        const object = await query.get(id);
        try {
            const response = await object.destroy();
            console.log('Deleted ParseObject', response);
            
            button.parentElement.remove();
            
        } catch (error) {
            console.error('Error while deleting ParseObject', error);
        }
    } catch (error) {
        console.error('Error while retrieving ParseObject', error);
    }
  }  
  
  function pagina() {
    window.location.href = "index.html"
  }
  
  
  function calcular() {
    let horaIn = document.getElementById('startTime').value;
    let horaF = document.getElementById('endTime').value;
  
    let diferenca = calculardiferenteshoras(horaIn, horaF);
  
    document.getElementById('result').innerHTML = "Diferença de tempo " + diferenca;
  }
  
  function calculardiferenteshoras(horaIn, horaF) {
    let inicio = new Date("1970-01-01T" + horaIn + "Z");
    let fim = new Date("1970-01-01T" + horaF + "Z");
  
    let diferenca = fim.getTime() - inicio.getTime();
  
    let horas = Math.floor(diferenca / (1000 * 60 * 60));
    let minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
  
    return horas + " horas e " + minutos + " minutos";
  }
  
  window.addEventListener('load', function () {
  
  
    // Adicionar tabela
    document.getElementById('adicionarCampo').onclick = function adicionarCampo() {
        let hora = document.getElementById('hora').value;
        let nome = document.getElementById('nome').value;
        let mes = document.getElementById('mes').value;
        let ano = document.getElementById('ano').value;
        let dia = document.getElementById('dia').value;
  
        (async () => {
            const myNewObject = new Parse.Object('Formulario');
            myNewObject.set('hora', hora);
            myNewObject.set('nome', nome);
            myNewObject.set('mes', mes);
            myNewObject.set('ano', ano);
            myNewObject.set('dia', dia);
            try {
                const result = await myNewObject.save();
                console.log(result);
                atualizarDados(
                    result.id,
                    result.get('nome'),
                    result.get('hora'),
                    result.get('dia'),
                    result.get('mes'),
                    result.get('ano'),
                );
            } catch (error) {
                console.error('Error while creating Formulario: ', error);
            }
        })();
    }
  
    buscarDados();
  });
  
  document.getElementById('calculartudo').onclick = async function calcularTudo() {
      const Formulario = Parse.Object.extend('Formulario');
      const query = new Parse.Query(Formulario);
      try {
          const results = await query.find();
          let somaTotalHoras = 0; 
          for (const object of results) {
              const horaString = object.get('hora'); // Obtém a hora como string
              const horaArray = horaString.split('.'); // Divide a hora em partes separadas por ponto
              const horas = parseInt(horaArray[0]); // Obtém a parte inteira das horas
              const minutos = parseInt(horaArray[1]) || 0; // Obtém a parte decimal das horas (se existir)
              const horaDecimal = horas + (minutos / 60); // Calcula a hora total como um valor decimal
              somaTotalHoras += horaDecimal; // Adiciona a hora atual à soma total
          }
          // Converte a soma total de horas para o formato de horas e minutos
          const horasTotal = Math.floor(somaTotalHoras);
          const minutosTotal = Math.round((somaTotalHoras % 1) * 60);
          // Exibe a soma total das horas na página
          document.getElementById('somaTotal').textContent = `Soma total de horas: ${horasTotal} horas e ${minutosTotal} minutos`;
      } catch (error) {
          console.error('Error while fetching data', error);
      }
  }
  
  
  
  
  
  // tabela antiga nunca apagar
  
  
  // window.addEventListener('load', function() {
  //   // Troca de pagina botao
  //     function pagina(){
  //       window.location.href = "Horas.html"
  //     }
  
  //     function calcular() {
  //       let horaIn = document.getElementById('startTime').value;
  //       let horaF = document.getElementById('endTime').value;
  
  //       let diferenca = calculardiferenteshoras(horaIn, horaF);
  
  //       document.getElementById('result').innerHTML = "Diferença de tempo " + diferenca;
  //     }
  
  //     function calculardiferenteshoras(horaIn, horaF) {
  //       let inicio = new Date("1970-01-01T" + horaIn + "Z");
  //       let fim = new Date("1970-01-01T" + horaF + "Z");
  
  //       let diferenca = fim.getTime() - inicio.getTime();
  
  //       let horas = Math.floor(diferenca / (1000 * 60 * 60));
  //       let minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
  
  //       return horas + " horas e " + minutos + " minutos";
  //     }
  
  //     // adicionar tabela
  //     document.getElementById('adicionarCampo').onclick = function adicionarCampo(){
  //       let hora = document.getElementById('hora').value;
  //       let nome = document.getElementById('nome').value;
  //       let mes = document.getElementById('mes').value;
  //       let ano = document.getElementById('ano').value;
  //       let dia = document.getElementById('dia').value;
        
  //       (async () => {
  //           const myNewObject = new Parse.Object('Formulario');
  //           myNewObject.set('hora', hora);
  //           myNewObject.set('nome', nome);
  //           myNewObject.set('mes',  mes);
  //           myNewObject.set('ano',  ano);
  //           myNewObject.set('dia',  dia);
  //           try {
  //             const result = await myNewObject.save();
  //             console.log(result);
  //             atulalizarDados(
  //               result.id,
  //               result.get('nome'),
  //               result.get('hora'),
  //               result.get('dia'),
  //               result.get('mes'),
  //               result.get('ano'),
  //             );
  //           } catch (error) {
  //             console.error('Error while creating Formulario: ', error);
  //           }
  //         })();      
  //     }
  
  
  
  //     const atulalizarDados = (id,nome,hora,dia,mes,ano)=>{
  //         let novadiv = document.createElement('div');
  //         novadiv.classList.add('campo');
  
  //         novadiv.innerHTML = `
  //           <p><strong>Id:</strong> ${id}</p>
  //           <p><strong>Nome:</strong> ${nome}</p>
  //           <p><strong>Horas Feitas:</strong> ${hora}</p>
  //           <p><strong>Data:</strong> ${dia}/${mes}/${ano}</p>
  //           <button onclick="excluirCampo('${id}')">Excluir</button>`
  
  //         document.getElementById('camposExibidos').appendChild(novadiv)
  //     }
  
  
  //     const buscarDados = ()=>{
  //       (async () => {
  //         const Formulario = Parse.Object.extend('Formulario');
  //         const query = new Parse.Query(Formulario);
  //         // You can also query by using a parameter of an object
  //         // query.equalTo('objectId', 'xKue915KBG');
  //         try {
  //           const results = await query.find();
  //           for (const object of results) {
  
  //             atulalizarDados(
  //               object.id,
  //               object.get('nome'),
  //               object.get('hora'),
  //               object.get('dia'),
  //               object.get('mes'),
  //               object.get('ano'),
  //             );
  //           }
  //         } catch (error) {
  //           console.error('Error while fetching Formulario', error);
  //         }
  //       })();
  //     }
  
  //     buscarDados();
  
  
      
      
      
      
  //   })
    
  //   function excluirCampo(id) {
  //     (async () => {
  //       const query = new Parse.Query('Formulario');
  //       try {
  //         // here you put the objectId that you want to delete
  //         const object = await query.get(id);
  //         try {
  //           const response = await object.destroy();
  //           console.log('Deleted ParseObject', response);
  //         } catch (error) {
  //           console.error('Error while deleting ParseObject', error);
  //         }
  //       } catch (error) {
  //         console.error('Error while retrieving ParseObject', error);
  //       }
  //     })();
    
  //     // let campoParaExcluir = bot.parentElement;
  //     // campoParaExcluir.remove();
  //   }
  