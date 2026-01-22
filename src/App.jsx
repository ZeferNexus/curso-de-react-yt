import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import { v4 } from "uuid";
import Title from "./components/Title";

function App() {
  // pegar do localStorgae
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || [],
  );

  // código comentado abaixo foi usado para testar
  // const [tasks, setTasks] = useState([
  // {
  //   id: 1,
  //   title: "Estudar programação",
  //   description:
  //     "Estudar programação para se tornar um desenvolvedor full-stack",
  //   isCompleted: false,
  // },
  // {
  //   id: 2,
  //   title: "Estudar inglês",
  //   description: "Estudar inglês para se tornar fluente",
  //   isCompleted: false,
  // },
  // {
  //   id: 3,
  //   title: "Estudar matemática",
  //   description:
  //     "Estudar matemática para se tornar um desenvolvedor full-stack",
  //   isCompleted: false,
  // },
  // ]);

  // precisamos que os dados ficam tanto no State quanto no localStorage
  // usando o localstorage, com useEffect do React
  // sintax com arrow function: useEffect(() => {},[])
  // sintax com function convencional: useEffect(function() {},[])
  // useEffect executa a primeira função sempre que algum valor dentro da nossa list "[]" for alterado.
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // // usando a API
  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     // chamar a api, por padrão vem como GET
  //     const response = await fetch(
  //       "https://jsonplaceholder.typicode.com/todos/?_limit=10",
  //       {
  //         method: "GET",
  //       },
  //     );

  //     // pegar os dados que ela retorna
  //     const data = await response.json();

  //     // armazenar / persistir esses dados no state
  //     setTasks(data);
  //   };
  //   // se quiser, você pode chamar uma api para pegar as tarefas
  //   // fetchTasks();
  // }, []);

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      // preciso atualizar essa tarefa
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }

      // não preciso atualizar essa tarefa
      return task;
    });
    setTasks(newTasks);
  }

  function onDeleteTaskClick(taskId) {
    // manter todas as tarefas na lista menos a que estou tentando deletar
    const newTasks = tasks.filter((task) => task.id != taskId);
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    // adicionar uma nova task
    const newTask = {
      id: v4(),
      title,
      description,
      isCompleted: false,
    };
    // sempre que atualizar uma lista, pega a lista antiga e coloca a nova parte na frente
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        {/* <Test /> */}
        <Title>Gerenciador de Tarefas</Title>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;
