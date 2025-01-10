


const TaskTitle = ({ info, onTaskUpdate, handleDeleteTask, groupId, taskId, boardId }) => {

    return <div><span >{info}</span>
        <button onClick={() => handleDeleteTask(boardId, groupId, taskId)}>X</button></div>;
};

export default TaskTitle;
