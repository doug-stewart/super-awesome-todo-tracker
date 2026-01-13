import GitHub from "@assets/github.svg?react";
import { Todos } from "@components/todos/Todos";

import "./App.css";

function App() {
    return (
        <main className="main">
            <header className="header">
                <h1>Super Awesome Todo Tracker*</h1>
                <p>
                    [*] I mean, it's alright&hellip; but it's on
                    <a href="https://github.com/doug-stewart/super-awesome-todo-tracker">
                        <GitHub />
                        GitHub
                    </a>
                    .
                </p>
            </header>
            <Todos />
        </main>
    );
}

export default App;
