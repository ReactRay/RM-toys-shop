import React, { useState } from 'react';
import { updateTask } from '../../store/boards/boards.actions';

function Priority(props) {
    const [modal, setModal] = useState(false);
    const [currentPriority, setCurrentPriority] = useState(props.info);
    const [isUpdating, setIsUpdating] = useState(false);  // Track updating status

    console.log(props)
    // Helper function to determine background color based on priority
    function color(priority) {
        if (priority === 'HIGH') return '#fdab3d'; // orangeish
        if (priority === 'MEDIUM') return '#579bfc'; // blue
        if (priority === 'LOW') return '#4eb648'; // green
        return 'coral'; // default color for other priorities
    }

    const style = { backgroundColor: color(currentPriority), width: '100%', height: '100%' };

    // Function to handle priority change and update task
    async function handlePriorityClick(newPriority) {
        setIsUpdating(true);  // Set the updating flag
        const updatedTask = { priority: newPriority };

        try {
            await updateTask(props.boardId, props.groupId, props.taskId, updatedTask);
            setCurrentPriority(newPriority);  // Update local state for UI
            setModal(false);  // Close the modal
        } catch (error) {
            console.error('Error updating task:', error);
        } finally {
            setIsUpdating(false);  // Reset the updating flag
        }
    }

    // Function to handle click outside of the modal
    const handleOutsideClick = () => {
        setModal(false);
    };

    return (
        <div className="item white has-modal" onClick={() => setModal(true)} style={style}>
            {currentPriority}

            {modal && (
                <div className="modal-backdrop" onClick={handleOutsideClick} style={{ zIndex: 1000 }}>
                    <div className="modal" onClick={(e) => e.stopPropagation()} style={{ zIndex: 1001 }}>
                        <h3>Choose a Priority</h3>
                        <div className="color-list">
                            <div
                                className="color-box"
                                onClick={() => handlePriorityClick('HIGH')}
                                style={{ backgroundColor: '#fdab3d' }}
                            >
                                HIGH
                            </div>
                            <div
                                className="color-box"
                                onClick={() => handlePriorityClick('MEDIUM')}
                                style={{ backgroundColor: '#579bfc' }}
                            >
                                MEDIUM
                            </div>
                            <div
                                className="color-box"
                                onClick={() => handlePriorityClick('LOW')}
                                style={{ backgroundColor: '#4eb648' }}
                            >
                                LOW
                            </div>
                        </div>
                        <button className="btn" onClick={() => setModal(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Priority;
