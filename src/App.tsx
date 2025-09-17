import styles from './App.module.css';
import './global.css';
import { Header } from './components/Header'
import { Prancheta } from './components/Prancheta';

//App é componente raiz da aplicação. Exibe o cabeçlho <header> e a seção pincpal da lista de tarefas

function App() {
  return (
    <div>
      <Header/>

      <main className={styles.mainPrancheta}>
        <Prancheta />
      </main>
    </div>
  );
}

export default App
