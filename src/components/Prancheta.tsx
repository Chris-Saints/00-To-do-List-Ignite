import styles from "./Prancheta.module.css";
import ImgPrancheta from "../assets/Prancheta.svg";
import { Plus } from 'phosphor-react';
import { useState } from "react";
import { Task } from "./Task";

//Componente que mosta o formulario de criacao, gerencia a lista de tarefas e renderiza as tarefas com <task>

    //Use state é usado para criar estados reativos
    //Task é o componente filho que renderiza cada tarefa

interface TarefaTipo {
    id: string; //representa o id que deve ser unico
    content: string; //conteudo escrito da tarefa
    completa: boolean; //representa se a tarefa esta ou nao feita pelo checkbox
}

export function Prancheta() {

    const [tarefas, setTarefas] = useState<TarefaTipo[]>([]); //Armazena todas as tarefas criadas

    const [novaTarefa, setNovaTarefa] = useState(""); // armazena o conteudo digitado no input

    function criarTarefa(e: React.FormEvent) {
        e.preventDefault(); // impede o reload da pagina

        
        if (novaTarefa.trim() === "") return; //Impede que uma nova tarefa vazia seja criada

        const nova = { //Cria uma const que servira de base para a colocas as informaçoes da nova tarefa
            id: crypto.randomUUID(), //Cria uma id aleatoria (que nao se repete)
            content: novaTarefa, //salva em content o conteudo presente dentro do input
            completa: false, //ganha a propriedade de complete que começa com false (ou seja, nao esta feita ainda)
        }

        setTarefas([...tarefas, nova]); //utiliza a funcao setTarefas para criar uma nova array com todas existentes anteriormente com ...tarefas e depois adicionando a nova tarefa com nova
        setNovaTarefa(""); //limpa o input
    }

    function alternarTarefa(id: string) {
        const novas = tarefas.map((t) => //map percorre cada tarefa do array
            t.id === id ? {...t, completa : !t.completa} : t // t.id === id confere se é o mesmo id da tarefa clicada. Se for, usamos o ...t para copiar todos os campos da tarefa, e substituímos só o campo completa com !t.completa (negação booleana = alternar). Se não for essa tarefa, apenas devolvemos ela igual.
        );
        setTarefas(novas); //salva novamente essa modificacao 
    }

    function deletarTarefa(id: string) {
        const novas = tarefas.filter((t) => t.id !== id); //cria um novo array com apenas as tarefas que nao tem o id passado, ou seja. filtra todas as tarefas que possuem o t.id diferente de id
        setTarefas(novas); //salva a modificacao
    }

    return(
        <section>
            <form className={styles.div} onSubmit={criarTarefa}>
                <input /* Input com value e on Change */
                    name="tarefa" 
                    type="text" 
                    placeholder="Adicione uma nova tarefa" 
                    value={novaTarefa} /* Value sendo diretamente o usestate nova tarefa */
                    onChange={(e) => setNovaTarefa(e.target.value)} /* guarda tudo o que for digitado no input */
                />
                <button >Criar <Plus size={16}/></button> {/* Botao dispara o Onsubmit */}
            </form>
            <article>
                <header className={styles.header}>
                    <div className={styles.align}>
                        <span className={styles.span1}>Tarefas criadas</span>
                        <p>{tarefas.length}</p>
                    </div>

                    <div className={styles.align}>
                        <span className={styles.span2}>Concluídas</span>
                        <p>{tarefas.length === 0 ? tarefas.length : `${tarefas.filter((t) => t.completa).length} de ${tarefas.length}`}</p> {/* A logica de mostrar quantas tarefas foram concluidas é a seguinte "se o tamanho da lista de tarefas for extritamente igual a 0 entao mostre o tamanho da quantidade das tarefas, senao filtre as tarefas que possuem a propriedade completa true e mostre a quantidade delas + de + a quantidade total de tarefas concluidas e nao concluidas"*/}
                    </div>
                </header>
                
                <div className={styles.fieldTask}>
                    {tarefas.length === 0 ? (              /* Se a quantidade de tarefas for igual a 0 mostre essa mensagem padrao, se nao mostre uma lista de tarefas*/
                        <div className={styles.default}>
                            <img src={ImgPrancheta}/>
                            <span>Você ainda não tem tarefas cadastradas</span>
                            <p>Crie tarefas e organize seus itens a fazer</p>
                        </div>
                    ) : (
                            tarefas.map((tarefa)  => ( // Para cada tarefa no array, cria um <Task /> e passas os props content, completa e duas funcoes
                                <Task
                                    key={tarefa.id} //O React precisa de uma key unica para cada item de uma lista
                                    content={tarefa.content} //adiciona o conteudo da tarefa
                                    completa={tarefa.completa} //adiciona o false ou true na tarefa
                                    aoAlternar={() => alternarTarefa(tarefa.id)} //adiciona a funcao de alternar feito e nao feito
                                    aoDeletar={() => deletarTarefa(tarefa.id)} // adiciona a funcao de apagar a tarefa pelo id
                                />
                            ))
                        )}

                </div>
            </article>
        </section>
    )
}