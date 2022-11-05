import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import Input from "./components/Input";

export type FilterValuesType = "all" | "active" | "completed";
type TodolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()


    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })


    let [filter, setFilter] = useState<FilterValuesType>("all");


    function removeTask( todolistID:string,taskID: string) {
        setTasks({...tasks,[todolistID]:tasks[todolistID].filter(t=>t.id!==taskID)})
    }

    function addTask(title:string,todolistID:string) {
        let newTask = {id:v1(), title:title , isDone:false}
        setTasks({...tasks,[todolistID]:[newTask,...tasks[todolistID]]})
    }

    function changeStatus(todolistID:string,taskId: string, isDone: boolean) {
        setTasks({...tasks,[todolistID]:tasks[todolistID].map(t=>t.id===taskId ? {...t,isDone:isDone} : t)})
    }

    function changeFilter(todolistID: string, filterValue: FilterValuesType) {
        setTodolists(todolists.map(el=>el.id===todolistID ? {...el,filter:filterValue} : el));
    }
    const removeTodolist = (todolistID:string) => {
        setTodolists(todolists.filter(t=>t.id !== todolistID))
        delete tasks[todolistID];
    }
    const addTodolistHandler = (newTitle:string) => {
        const newTodolistID = v1();
        const newTodolist:TodolistsType = {id: newTodolistID, title: newTitle, filter: 'all'}
        setTodolists([newTodolist,...todolists])
        setTasks({...tasks,[newTodolistID]:[]})
    }


    return (
        <div className="App">
            <Input callback={addTodolistHandler}/>
            {
                todolists.map(el => {
                        let tasksForTodolist = tasks[el.id];

                        if (el.filter === "active") {
                            tasksForTodolist = tasks[el.id].filter(t => t.isDone === false);
                        }
                        if (el.filter === "completed") {
                            tasksForTodolist = tasks[el.id].filter(t => t.isDone === true);
                        }
                        return (
                            <Todolist title={el.title}
                                      todolistID={el.id}
                                      tasks={tasksForTodolist}
                                      removeTask={removeTask}
                                      changeFilter={changeFilter}
                                      addTask={addTask}
                                      changeTaskStatus={changeStatus}
                                      filter={filter}
                                      removeTodolist={removeTodolist}
                            />)
                    }
                )
            }
        </div>
    );
}

export default App;
