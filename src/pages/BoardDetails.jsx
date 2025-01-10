/* eslint-disable react-hooks/exhaustive-deps */
import "../styles/_Board-Details.scss";
import GroupPreview from "../cmps/GroupPreview";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { addGroup, loadBoards } from "../store/boards/boards.actions";
import { useSelector } from "react-redux";


const BoardDetails = () => {
    const [groupName, setGroupName] = useState('');
    const { boardId } = useParams();
    const navigate = useNavigate();

    const boards = useSelector((state) => state.boardModule.boards);


    const currentBoard = boards.find((board) => board._id === boardId);

    const groups = currentBoard?.groups || [];

    //.........................
    useEffect(() => {
        onLoadBoards()

    }, [boards.groups])

    async function onLoadBoards() {
        await loadBoards()

    }

    //...............................



    function handleAddGroup() {
        addGroup(boardId, groupName);
    }

    //.....................

    const cmpOrder = [
        "taskTitle",
        "priority",
        "status",
        "members",
        "date",
    ];

    const uid = () => Math.random().toString(36).slice(2);
    const labels = ["item", "priority", "status", "members", "date"];
    const progress = [null, "priority", "status", null, "date"];
    //.......................
    return (
        <>
            <button onClick={() => navigate('/index')}>Go back to boards</button>
            <div>
                <input
                    type="text"
                    placeholder="Add a new group here"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                />
                <button onClick={handleAddGroup}>Submit</button>
            </div>
            <section className="group-list">
                {groups.map((group) => (
                    <GroupPreview
                        group={group}
                        labels={labels}
                        cmpOrder={cmpOrder}
                        progress={progress}
                        boardId={boardId}
                        key={uid()}
                    />
                ))}
            </section>
        </>
    );
};

export default BoardDetails;
