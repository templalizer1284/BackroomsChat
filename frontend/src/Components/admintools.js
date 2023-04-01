import "../Styles/common.css";
import "../Styles/admintools.css";

import { useState } from "react";

import axios from "axios";
import { Base64 } from "js-base64";

function FORM_SOUND_UPLOAD() {

    const [notif, setNotif] = useState();
    
    return(
        <div id="amf_upload_sound">
            <input id="amf_upload_sound_input" type="file" />
            <button onClick={() => {
			let hook = document.getElementById("amf_upload_sound_input");
			if(hook.files.length === 0) {
			    setNotif("File form is empty, please select the file.");
			    hook.style.borderColor = "red";
			}
		    }}>Upload</button>
	    {notif}
	</div>
    );
}

function MODAL() {

    function NAV() {
	return(
	    <div style={{columnGap: 10, display: "flex", flexDirection: "row", justifyContent: "center"}}>
		<button onClick={() => {
			    
			}}>Sound Settings</button>
		<button onClick={() => {
			    
			}}>User Management</button>
	    </div>
	);
    };
    
    const [state, setState] = useState(<NAV />);
    
    return(
        <div id="admin_modal_overlay">
	    <div id="admin_modal">
                <button onClick={() => {
			    document.getElementById("admin_modal_overlay").style.visibility = "hidden";
			}} style={{position: "absolute", top: -1, left: -1}}>X</button>
		{state}
	    </div>
	</div>
    );
}

export default function ADMIN_TOOLS() {
    return(
        <div id="admin_tools">
            <button onClick={() => {
			document.getElementById("admin_modal_overlay").style.visibility = "visible";
		    }}>Admin Panel</button>
	    <MODAL />
	</div>
    );
}
