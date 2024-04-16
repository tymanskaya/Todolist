import {TaskType, ValuesFilterType} from "./App";
import {Button} from "./Button";
import {ChangeEvent, useState} from "react";
import {keyboardKey} from "@testing-library/user-event/system/keyboard";

type PropsType = {
    title: string
    tasks: TaskType[]
    addTask: (title: string) => void
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean) => void
    // changeTodolistFilter: (nextFilter: ValuesFilterType) => void
}


export const Todolist = ({title, tasks, removeTask, addTask, changeTaskStatus}: PropsType) => {//changeTodolistFilter

    const [filter, setFilter] = useState<ValuesFilterType>('all');
    const [taskTitle, setTaskTitle] = useState<string>('');
    const [taskInputError, setTaskInputError] = useState<string | null>(null)
    const getTasksForTodolist = (allTasks: Array<TaskType>, nextFilterValue: ValuesFilterType) => {
        switch (nextFilterValue) {
            case 'active':
                return allTasks.filter(t => t.isDone === false);
            case 'completed':
                return allTasks.filter(t => t.isDone === true);
            default:
                return allTasks;
        }

    }
    const tasksForTodolist = getTasksForTodolist(tasks, filter)

    const onClickHandlerCreator = (filter: ValuesFilterType) => {
        return () => {
            setFilter(filter)
        }
    }
    const onClickAddTaskHandler = () => {
        const trimmedTaskTitle = taskTitle.trim();
        if (trimmedTaskTitle) {
            addTask(trimmedTaskTitle)

        } else {
            setTaskInputError('Title is required')
        }
        setTaskTitle('')

    }
    const onChangeSetTaskTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskInputError(null)
        setTaskTitle(event.currentTarget.value)
    }
    const onkeyDownAddTaskHandler = (e: keyboardKey) => {
        if (e.key === 'Enter' && (taskTitle && ifTaskCanBeAdded)) {
            onClickAddTaskHandler()
        }
    }
    const isTaskTitleTooLong = taskTitle.length > 15;
    const ifTaskCanBeAdded = taskTitle && !isTaskTitleTooLong
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input className={!!taskInputError?'task-input-error':''}
                       value={taskTitle}
                       onChange={onChangeSetTaskTitle}
                       onKeyDown={onkeyDownAddTaskHandler}/>
                <button onClick={onClickAddTaskHandler}
                        disabled={!ifTaskCanBeAdded}>+
                </button>
                {isTaskTitleTooLong && <div>Your taskTitle is too long</div>}
                {!!taskInputError && <div className={'task-input-error-message'}>{taskInputError}</div>}
            </div>
            {
                tasks.length === 0
                    ? <p>Тасок нет</p>
                    : <ul>
                        {tasksForTodolist.map((task) => {
                            const removeTaskHandler = () => removeTask(task.id)
                            const onChangeSettaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                changeTaskStatus(task.id, e.currentTarget.checked)
                            }
                            return <li key={task.id}>
                                <input type="checkbox"
                                       checked={task.isDone}
                                       onChange={onChangeSettaskStatusHandler}/>
                                <span className={task.isDone ? 'task-done' : "task"}>{task.title}</span>
                                <button onClick={removeTaskHandler}>x</button>
                            </li>
                        })}
                    </ul>
            }
            <div>
                <button className={filter === 'all' ? 'filter-btn-active' : ''}
                        onClick={onClickHandlerCreator('all')}>All
                </button>
                <button className={filter === 'active' ? 'filter-btn-active' : ''}
                        onClick={onClickHandlerCreator('active')}>Active
                </button>
                <button className={filter === 'completed' ? 'filter-btn-active' : ''}
                        onClick={onClickHandlerCreator('completed')}>Completed
                </button>
            </div>
        </div>
    )
}