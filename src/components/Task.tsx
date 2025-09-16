import styles from "./Task.module.css";
import { Trash } from 'phosphor-react';

//Esse é o esqueleto da tarefa em si, como ela sera apresentada e suas funcoes

interface TaskProps {
    content: string;
    completa: boolean;
    aoAlternar: () => void;
    aoDeletar: () => void;
}

export function Task({content, completa, aoAlternar, aoDeletar}: TaskProps){ //Recebe as propriedades obrigatorias da sua interface
    return (
    <div className={styles.task}>
        <label>
            <input type="checkbox" checked={completa} onChange={aoAlternar} /* Checked fica com o valor de completa e o input recebe a funcao de alternar o valor de completa sempre que clicar no checkbox*/ />
            {/* <span className={styles.checkmark}></span> */}
        </label>
        <span className={completa ? styles.completed : ""} /* se completa for true entao recebe a classe completed, senao nao recebe classe nenhuma*/>{content}</span>
        <button onClick={aoDeletar} /*ao clicar ativa a funcao de deletar*/><Trash size={18} /></button>
    </div>
    )
}