const Status = ({ onTaskUpdate, info }) => {

    function color(info) {
        if (info === 'IN PROGRESS')
            return '#fdab3d'; //orangeish
        if (info === 'STUCK')
            return '#e2445c'; //red
        if (info === 'DONE')
            return '#00c875'; //green
        else
            return 'coral';
    }

    const style = { backgroundColor: color(info), width: '100%', height: '100%' }; // Corrected here
    return <div className="item white" onClick={() => onTaskUpdate("status update")} style={style}>{info}</div>;
};

export default Status;
