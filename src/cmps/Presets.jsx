
import { useSelector } from "react-redux";
import { updateUser } from "../store/user/user.actions.js";
const colorPalette = [
    { backgroundImage: "linear-gradient(120deg, #8D0B41 30%, #B35B72 70%)", color: "#FFFFFF" }, // Firebrick Red to a lighter red (diagonal with stops)
    { backgroundImage: "linear-gradient(160deg, #4C585B 40%, #60707C 80%)", color: "#FFFFFF" }, // Bright Blue to a muted blue (diagonal with stops)
    { backgroundImage: "linear-gradient(200deg, #86A788 20%, #A2C1A0 90%)", color: "#FFFFFF" }, // Medium Green to a lighter green (diagonal with stops)
    { backgroundImage: "linear-gradient(180deg, #9A7E6F 50%, #C0A88F 50%)", color: "#000000" }, // Bright Yellow to a light tan (vertical with sharp split)
    { backgroundImage: "linear-gradient(45deg, #7ED4AD 10%, #9FF4C3 90%)", color: "#FFFFFF" }, // Purple to a pale purple/green (diagonal with stops)
    { backgroundImage: "linear-gradient(60deg, #0288D1 50%, #3E8CC7 50%)", color: "#FFFFFF" }, // Deep Sky Blue to a softer blue (diagonal with sharp split)
    { backgroundImage: "linear-gradient(135deg, #F57C00 60%, #FFA500 60%)", color: "#FFFFFF" }, // Orange to a lighter orange (diagonal with sharp split)
    { backgroundImage: "linear-gradient(90deg, #89A8B2 30%, #A7BCC7 80%)", color: "#FFFFFF" }, // Pink to a muted light pink (horizontal with stops)
    { backgroundImage: "linear-gradient(100deg, #512DA8 25%, #6A4B9F 75%)", color: "#FFFFFF" }, // Deep Purple to a lighter purple (diagonal with stops)
    { backgroundImage: "linear-gradient(150deg, #FF748B 15%, #FF9EAE 85%)", color: "#FFFFFF" },  // Sky Blue to a soft pinkish hue (diagonal with stops)

    // New colors
    { backgroundImage: "linear-gradient(130deg, #F44336 40%, #FF7043 80%)", color: "#FFFFFF" }, // Red to Coral (diagonal with stops)
    { backgroundImage: "linear-gradient(90deg, #FFEB3B 20%, #FFC107 80%)", color: "#000000" },  // Yellow to Amber (horizontal with stops)
    { backgroundImage: "linear-gradient(45deg, #00C853 30%, #1DE9B6 70%)", color: "#FFFFFF" }, // Green to Teal (diagonal with stops)
    { backgroundImage: "linear-gradient(200deg, #9C27B0 25%, #E040FB 75%)", color: "#FFFFFF" }, // Purple to Deep Purple (diagonal with stops)
    { backgroundImage: "linear-gradient(110deg, #8BC34A 10%, #388E3C 90%)", color: "#FFFFFF" }, // Light Green to Dark Green (diagonal with stops)
    { backgroundImage: "linear-gradient(160deg, #03A9F4 50%, #0288D1 50%)", color: "#FFFFFF" }, // Light Blue to Blue (diagonal with sharp split)
    { backgroundImage: "linear-gradient(180deg, #FF9800 30%, #FF5722 70%)", color: "#FFFFFF" }, // Orange to Deep Orange (vertical with stops)
    { backgroundImage: "linear-gradient(45deg, #673AB7 40%, #512DA8 60%)", color: "#FFFFFF" }, // Deep Purple to Purple (diagonal with stops)
    { backgroundImage: "linear-gradient(135deg, #607D8B 20%, #455A64 80%)", color: "#FFFFFF" }, // Blue Grey to Blue Dark Grey (diagonal with stops)
    { backgroundImage: "linear-gradient(90deg, #2196F3 10%, #64B5F6 90%)", color: "#FFFFFF" }, // Blue to Light Blue (horizontal with stops)
    { backgroundImage: "linear-gradient(120deg, #795548 50%, #3E2723 50%)", color: "#FFFFFF" }, // Brown to Dark Brown (diagonal with sharp split)
    { backgroundImage: "linear-gradient(150deg, #CDDC39 30%, #8BC34A 70%)", color: "#000000" }, // Lime to Light Green (diagonal with stops)
];





export function Presets() {


    const user = useSelector(state => state.userModule.user)

    function handleClick(idx) {
        const newUser = { ...user, prefs: colorPalette[idx] }
        updateUser(newUser)
    }


    return (
        <div>

            <h1 style={{ textAlign: 'center' }}>i hope your favorite color is here 🥲</h1>
            <div className="color-flex">
                {colorPalette.map((color, idx) => {
                    return (
                        <div className="color-unit" style={color} key={idx} onClick={() => handleClick(idx)}></div>
                    )
                })}
            </div>
        </div>
    )

}