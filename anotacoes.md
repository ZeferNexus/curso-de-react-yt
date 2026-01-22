# Anotações sobre TypeScript (TS)

## Links
* Curso de React para Completos Iniciantes [2024]
    * https://www.youtube.com/watch?v=2RWsLmu8yVc


## Requisitos
* HTML & CSS
* JavaScript (ES6+)
    * Estrutura de dados, funções objetos
    * Destructuring, arrow functions
    * Promises & Async/Await
* VS Code ou outra IDE
* Node.js + NPM (vem com o Node)
* Tailwind CSS with Vite


## O que é o React?
* O React é uma biblioteca usada para criar interfaces de usuários interativas.


## Por que aprender React?
* Desenvolvida pelo Facebook (Meta)
* Aprenda uma vez, use em qualquer lugar
    * iOS & Android (React Native)
    * Desktop (Electron)
* É a tecnologia mais demandada pelo mercado atualmente (e isso já há vários anos)
    * É praticamente o padrão da indústria quando o assunto é criação de aplicações web.
    * Sai muito na frente de seus concorretnes (Vue e Angular)
* É utilizado por empresas multibilionárias como:
    * Facebook
    * Instagram
    * Netflix
    * Airbnb
    * LinkedIn
    * Spotify


## Componentes
* No React, dividimos a aplicação em pequenos componentes.
* Vários componentes, quando combinados, formam grandes estruturas.
* Pense neles como se fossem peças de LEGO.
* Usamos .jsx para escrevê-los. JSX = HTML misturado com JS.


## Configurando o nosso ambiente de desenvolvimento.
* Ter instalado:
    * Node.js
* Extensões do VS Code:
    * Tailwind
    * Prettier
    * ESLint
* No terminal:
    * Versão do seu node, para verificar que está instalado
        > node -v
    * Abre a pasta onde vai criar o seu projeto
    * Navegar para sua pasta criada
    * Instalar o Vite (usando a mesma versão do curso)
        > npm create vite@5.5.2 .
    * Escolhe:
        * Framework: React
        * Variant: JavaScript
    * Instalar pacotes que vai precisar para rodar o projeto
        > npm install
    * Inicializar o projeto
        > npm run dev


## Vantagens de SPAs
* Velocidade: navegação entre páginas é muit mais rápido, pois não exige chamadas para um servidor.
* Experiência do usuário: SPAs são altamente interativas e performáticas.


## Anotações
* O React gera SPA (Single Page Application)
* O conteúdo é inserido por meio de JS (React)
* Sempre que for renderizar um componente precisa-se que ele seja com letra maiúscula para que o .jsx identifica o que é  html consegue entender o que é e não é html.
* Recomendação de usar inglês para os nomes nos projetos.
* Exemplo de App.jsx
    ```jsx
    import { useState } from "react";

    function App() {
    // State (Estado) = uma variável que você altera no React e faz com que o componente seja renderizado novamente (atualiza a interface)
    // um hook do React
    const [message, setMessage] = useState("Olá mundo!");
    // não podemos retornar mais de um elemento no return()
    return (
        <div className="">
        <h1>{message}</h1>
        <button
            onClick={() => {
            setMessage("Olá, fui clicado!");
            }}
        >
            Mudar mensagem
        </button>
        </div>
    );
    }

    export default App;
    ```
* Criar seus components em "src/components"
* Tailwind.css
    * Usado no lugar de .css normal
    * Instalar o Tailwind Css with Vite (versão do curso)
        > npm install -D tailwindcss@3.4.10 postcss@8.4.41 autoprefixer@10.4.20
    * Depois:
        > npx tailwindcss init -p
    * Copiar e colocar o template para o arquivo tailwind.config.js:
        ```js
        /** @type {import('tailwindcss').Config} */
        export default {
        content: ["*./index.html", ".src/**/*.{js,ts,jsx,tsx}"],
        theme: {
            extend: {},
        },
        plugins: [],
        };
        ```
    * O mesmo para index.css
        ```css
        @import "tailwindcss";
        ```
    * Para evitar mostrar o underline vermelho de erro adiciona em "eslint.config.js em "rules":
        > "react/prop-types": "off",
    * Icons (versão do vídeo):
        > npm install lucide-react@0.435.0
    * UUID para ids aleatórios (versão do vídeo):
        > npm install uuid@10.0.0
    * React Router (versão do vídeo)
        > npm install react-router-dom@6.26.1
    * Após instalado o React Router precisamos adicionar o que está na documentação ao nosso `main.jsx`
        ```jsx
        import { createBrowserRouter, RouterProvider } from "react-router-dom";

        const router = createBrowserRouter([
        {
            path: "/",
            element: <App />,
        },
        ]);

        createRoot(document.getElementById("root")).render(
        <StrictMode>
            <RouterProvider router={router} />
        </StrictMode>,
        );
        ```
    * Criar pasta `pages` na pasta `src`
        * Aqui dentro criar um arquivo chamado `TaskPage.jsx`
    * Para lembrar o que já foi adicionado podemos usar o `localStorage`.
        * Ele é um armazenamento de todo navegador.
        * Podemos armazenar texto aqui dentro, mesmo que a gente recarrega/fecha a página/navegador ele fica lá.
        * Exemplo de como usá-lo.
            ```jsx
            // app.jsx
            import { useEffect, useState } from "react";
            import AddTask from "./components/AddTask";
            import Tasks from "./components/Tasks";
            import { v4 } from "uuid";

            function App() {
            const [tasks, setTasks] = useState(
                JSON.parse(localStorage.getItem("tasks")) || [],
            );

            // precisamos que os dados ficam tanto no State quanto no localStorage
            // usando o localstorage, com useEffect do React
            // sintax com arrow function: useEffect(() => {},[])
            // sintax com function convencional: useEffect(function() {},[])
            // useEffect executa a primeira função sempre que algum valor dentro da nossa list "[]" for alterado.
            useEffect(() => {
                localStorage.setItem("tasks", JSON.stringify(tasks));
            }, [tasks]);

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
                    <h1 className="text-3xl text-slate-100 font-bold text-center">
                    Gerenciador de Tarefas
                    </h1>
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
            ```
        * Isso vai ser importante saber porque esses dados podem vir de um API.
    * Fluxo de API
        * JSON Placeholder = API que vamos usar para dados testes.
            ```js
            import { useEffect, useState } from "react";
            import AddTask from "./components/AddTask";
            import Tasks from "./components/Tasks";
            import { v4 } from "uuid";

            function App() {
            // usando a API
            useEffect(() => {
                const fetchTasks = async () => {
                // chamar a api, por padrão vem como GET
                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/todos/?_limit=10",
                    {
                    method: "GET",
                    },
                );

                // pegar os dados que ela retorna
                const data = await response.json();

                // armazenar / persistir esses dados no state
                setTasks(data);
                };
                // se quiser, você pode chamar uma api para pegar as tarefas
                // fetchTasks();
            }, []);
            return (
                <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
                <div className="w-[500px] space-y-4">
                    <h1 className="text-3xl text-slate-100 font-bold text-center">
                    Gerenciador de Tarefas
                    </h1>
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
            ```
        * Componente chama o API e o `state` persiste no estado do componente
        * Podemos usar o `axios` ou o próprio `fetch` do JS para chamar a API
    * Fazer nosso deploy = colcoar nossa aplicação online
        * Criar nosso run build
            > npm run build
        * Ele vai criar uma pasta para nós chamada de `dist` com:
            * assets/
                * nome.jse
                * nome.css
            * index.html
            * vite.svg
        * Vamos usar o Vercel para fazer o nosso deploy.
            * Precisa ter uma conta no GitHub para poder fazer o deploy.
            * Entra no Vercel com o seu GitHub.
            * Adicionar o nosso projeto no GitHub.
        * Iniciar o repositorio Git:
            > git init
        * Verificar que o seu .gitignore tenha:
            ```
            node_modules
            dist
            ```
        * Adicionar todos os arquvios dentro desse commit:
            > git add .
        * Commitar o nosso código:
            > git commit -m "commit inicial"
        *
---
