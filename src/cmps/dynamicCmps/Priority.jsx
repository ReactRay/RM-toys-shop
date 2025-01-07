



const Priority = ({ info, onTaskUpdate }) => {
    console.log("priority", info);


    function color(info) {
        if (info === 'HIGH')
            return '#fdab3d'; //orangeish
        if (info === 'MEDIUM')
            return '#579bfc'; //blue
        if (info === 'LOW')
            return '#4eb648'; //green
        else
            return 'coral';
    }

    const style = { backgroundColor: color(info), width: '100%', height: '100%' }; // Corrected here

    return <div className="item white" onClick={() => onTaskUpdate("priority update")} style={style}>{info}</div >;
};

export default Priority;
