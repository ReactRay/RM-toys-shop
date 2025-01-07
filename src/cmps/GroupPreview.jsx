import Date from "./dynamicCmps/Date";
import Member from "./dynamicCmps/Member";
import Side from "./dynamicCmps/Side";
import Status from "./dynamicCmps/Status";
import TaskTitle from "./dynamicCmps/TaskTitle";
import Priority from "./dynamicCmps/Priority";

const GroupPreview = ({ labels, group, cmpOrder, progress }) => {
    function onTaskUpdate(taskInfo) {
        console.log("onTaskUpdate", taskInfo);
    }

    const style = { borderLeft: `0.3rem solid ${group.color}` }
    const titleHead = { color: group.color }
    const progressComponents = ["date", "priority", "status"];
    return (
        <section className="group-list">
            <h2 style={titleHead}>{group.title}</h2>
            {/* Render group labels by labels array */}
            <section className="labels-grid" style={style}>
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
                                cmpType={cmp}
                                info={task[cmp]}
                                onTaskUpdate={onTaskUpdate}
                            />
                        </section>
                    ))}
                </section>
            ))}

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
        </section>
    );
};

const DynamicCmp = ({ cmpType, info, onTaskUpdate }) => {
    console.log("Rendering component:", cmpType, "with info:", info);

    switch (cmpType) {

        case "priority":
            return <Priority info={info} onTaskUpdate={onTaskUpdate} />;
        case "taskTitle":
            return <TaskTitle info={info} onTaskUpdate={onTaskUpdate} />;
        case "status":
            return <Status info={info} onTaskUpdate={onTaskUpdate} />;
        case "members":
            return <Member info={info} onTaskUpdate={onTaskUpdate} />;
        case "date":
            return <Date info={info} onTaskUpdate={onTaskUpdate} />;
        default:
            console.error(`Unknown component type: ${cmpType}`);
            return <div>Unknown component: {cmpType}</div>;
    }
};

export default GroupPreview;
