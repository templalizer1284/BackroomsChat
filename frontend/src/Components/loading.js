import LOADING_LIGHT from "../Media/loading_light.gif";
import LOADING_DARK from "../Media/loading_dark.gif";

export default function LOADING(props) {
    if(props.mode === "light") {
	return(
            <div className="loading_gif">
		<img draggable="false" alt="light_loader" src={LOADING_LIGHT}/>
	    </div>
	);
    }

    if(props.mode === "dark") {
	return(
            <div className="loading_gif">
		<img draggable="false" alt="dark_loader" src={LOADING_DARK}/>
	    </div>
	);
    }
}
