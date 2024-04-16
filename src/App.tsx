import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type ValuesFilterType = 'all' | 'completed' | 'active'

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'Typescript', isDone: false},
        {id: v1(), title: 'RTK query', isDone: false},
    ])

    const removeTask = (taskId: string) => {
        const newState = tasks.filter(t => t.id !== taskId);
        setTasks(newState);
    }
    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1 (),
            title: title,
            isDone: false}
        const newState=[newTask, ...tasks]
        setTasks(newState);
    }
    const changeTaskStatus=(taskId: string, newIsDone: boolean)=>{
        const newState=tasks.map(t => t.id === taskId? {...t, isDone: newIsDone}: t);
        setTasks(newState);
    }

    // const [filter, setFilter] = useState<ValuesFilterType>('all');
    // const changeTodolistFilter=(nextFilter: ValuesFilterType) => {
    //     setFilter(nextFilter);
    // }
    //
    // const getTasksForTodolist = (allTasks: Array<TaskType>, nextFilterValue: ValuesFilterType) => {
    //     switch (nextFilterValue) {
    //         case 'active':
    //             return allTasks.filter(t=> t.isDone===false);
    //          case 'completed':
    //              return allTasks.filter(t=> t.isDone===true);
    //         default:
    //             return allTasks;
    //     }
    //
    // }
    // const tasksForTodolist = getTasksForTodolist(tasks, filter)

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasks} //tasksForTodolist
                      removeTask={removeTask} //changeTodolistFilter={changeTodolistFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
            />

        </div>
    );
}

export default App;
