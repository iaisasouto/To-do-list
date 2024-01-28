import { useState, useEffect } from "react";
import "./App.css";
import TrashIcon from './assets/trash-icon-flaticon.png'

const localStorageKey = 'listaDeTarefas';

function App() {
  const [lista, setLista] = useState([]);
  const [novoItem, setNovoItem] = useState("");

 useEffect(() => {
  const listaSalva = localStorage.getItem(localStorageKey);
  setLista(JSON.parse(listaSalva) || []);
}, []);

useEffect(() => {
  localStorage.setItem(localStorageKey, JSON.stringify(lista));
}, [lista]);

function adicionarNaLista() {
  if (novoItem === "") {
    return;
  }
  const item = {
    text: novoItem,
    checked: false,
  };
  setLista([...lista, item]);
  setNovoItem("");
}

function marcarTarefa(index) {
  setLista(
    lista.map((item, i) => {
      if (i === index) {
        return { ...item, checked: !item.checked };
      }
      return item;
    })
  );
}

function deletarTarefa(index) {
  setLista(lista.filter((item, i) => i !== index));
}


  return (
    <div className="App">
      <div className="container">
        <div className="container-input">
          <input
            type="text"
            placeholder="New task"
            maxLength={42}
            value={novoItem}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                adicionarNaLista();
              }
            }}
            onChange={(event) => setNovoItem(event.target.value)}
          />
          <button type="button" onClick={adicionarNaLista} >
            +
          </button>
        </div>
        <div className="container-list">
          <ul>
            {lista.map((item, index) => (
              <li key={index}>
                <label className="container-checkbox">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => marcarTarefa(index)}
                  />
                  <svg viewBox="0 0 64 64" height="30px" width="30px">
                    <path
                      d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                      pathLength="575.0541381835938"
                      class="path"
                    ></path>
                  </svg>
                </label>
                <span className={item.checked && "checked"}>{item.text}</span>
                <button type="button" onClick={() => deletarTarefa(index)}>
                  <img src={TrashIcon} style={{width: '100%'}}  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
