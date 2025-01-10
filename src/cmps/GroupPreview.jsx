/* eslint-disable react/prop-types */
import Date from "./dynamicCmps/Date";
import Member from "./dynamicCmps/Member";
import { Status } from "./dynamicCmps/Status";
import TaskTitle from "./dynamicCmps/TaskTitle";
import Priority from "./dynamicCmps/Priority";
import { useState } from "react";
import { addItem, removeGroup, removeTask } from "../store/boards/boards.actions";

const GroupPreview = ({ labels, group, cmpOrder, progress, boardId }) => {

    const [expanded, setExpanded] = useState(true)
    const [newTaskTitle, setNewTaskTitle] = useState('')
    //.............................
    function onTaskUpdate(taskInfo) {
        console.log("onTaskUpdate", taskInfo); // TODO MUST CHANGE THIS 
    }
    //................................

    function handleAddTask() {
        addItem(boardId, group.id, newTaskTitle)
    }
    //.....................

    function handleDeleteTask(boardId, groupId, taskId) {
        removeTask(boardId, groupId, taskId)
    }


    //.......

    function handleDelete(groupId) {
        removeGroup(boardId, groupId)
    }

    const style = { borderLeft: `0.3rem solid ${group.color}` }
    const titleHead = { color: group.color }
    const progressComponents = ["date", "priority", "status"];
    return (<>

        <div>

            <h2 style={titleHead}>{group.title} <span className="arrow" onClick={(() => setExpanded(prev => !prev))}>{expanded ? '👇🏻' : '👉🏻'}</span> </h2>
            <button onClick={() => handleDelete(group.id)}>X</button>
        </div>
        <section className="group-list">
            {/* Render group labels by labels array */}

            {expanded && <> <section className="labels-grid" style={style}>
                {cmpOrder.map((cmp, index) => (
                    <div key={`label-${index}`}>{labels[index] || ""}</div>
                ))}
            </section>

                {/* Render tasks by cmp order */}
                {group.tasks.map((task) => (
                    <section className="group grid" key={`task-${task.id}`} style={style}>

                        {cmpOrder.map((cmp, idx) => (
                            <section
                                className={`grid-item ${cmp}`}
                                key={`task-${task.id}-cmp-${idx}`}
                            >
                                <DynamicCmp
                                    handleDeleteTask={handleDeleteTask}
                                    groupId={group.id}
                                    boardId={boardId}
                                    taskId={task.id}
                                    cmpType={cmp}
                                    info={task[cmp]}
                                    onTaskUpdate={onTaskUpdate}
                                />

                            </section>
                        ))}
                    </section>
                ))}

                <div>
                    <input type="text" placeholder="+Add Task" value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} />
                    <button onClick={handleAddTask}>add+</button>
                </div>

                {/* Render progress by progress array */}
                <section className="progress-grid" style={style}>
                    {cmpOrder.map((cmp, index) =>
                        progressComponents.includes(cmp) ? (
                            <div className={`with-${cmp}`} key={`progress-${index}`}>
                                {progress[index]}
                            </div>
                        ) : (
                            <div className={cmp} key={`progress-${index} `}></div>
                        )
                    )}
                </section>


            </>
            }


        </section>
    </>
    );
};

const DynamicCmp = (props) => {

    switch (props.cmpType) {

        case "priority":
            return <Priority {...props} />;
        case "taskTitle":
            return <TaskTitle {...props} />;
        case "status":
            return <Status {...props} />;
        case "members":
            return <Member {...props} />;
        case "date":
            return <Date {...props} />;
        default:
            console.error(`Unknown component type: ${props.cmpType}`);
            return <div>Unknown component: {props.cmpType}</div>;
    }
};

export default GroupPreview;
