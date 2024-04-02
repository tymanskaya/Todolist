import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type ValuesFilterType = 'all' | 'completed' | 'active'

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
        {id: 5, title: 'Typescript', isDone: false},
        {id: 6, title: 'RTK query', isDone: false},
    ])

    const removeTask = (taskId: number) => {
        const newState = tasks.filter(t => t.id !== taskId);
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
                      />

        </div>
    );
}

export default App;
