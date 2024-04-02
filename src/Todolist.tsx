import {TaskType, ValuesFilterType} from "./App";
import {Button} from "./Button";
import {useState} from "react";

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: number)=>void
    // changeTodolistFilter: (nextFilter: ValuesFilterType) => void
}


export const Todolist = ({title, tasks, removeTask}: PropsType) => {//changeTodolistFilter
    const [filter, setFilter] = useState<ValuesFilterType>('all');


    const getTasksForTodolist = (allTasks: Array<TaskType>, nextFilterValue: ValuesFilterType) => {
        switch (nextFilterValue) {
            case 'active':
                return allTasks.filter(t=> t.isDone===false);
            case 'completed':
                return allTasks.filter(t=> t.isDone===true);
            default:
                return allTasks;
        }

    }
    const tasksForTodolist = getTasksForTodolist(tasks, filter)
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title={'+'}/>
            </div>
            {
                tasks.length === 0
                    ? <p>Тасок нет</p>
                    : <ul>
                        {tasksForTodolist.map((task) => {
                            const removeTaskHandler = () => removeTask(task.id)
                            return <li key={task.id}><input type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                                <button onClick={removeTaskHandler}>x</button>
                            </li>
                        })}
                    </ul>
            }
            <div>
                <button onClick={()=>{setFilter('all')}}>All</button>
                <button onClick={()=>{setFilter('active')}}>Active</button>
                <button onClick={()=>{setFilter('completed')}}>Completed</button>
            </div>
        </div>
    )
}
