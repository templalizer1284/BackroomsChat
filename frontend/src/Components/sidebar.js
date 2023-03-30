import { useState, useEffect } from "react";
import axios from "axios";
import { Base64 } from "js-base64";

import "../Styles/common.css";
import "../Styles/sidebar.css";

import USER_ENTITY from "./user_entity.js";
import LOADING from "./loading.js";
import ERROR_MESSAGE from "./error_message.js";
import ADMIN_TOOLS from "./admintools.js";

let current_user_role = "user";

function get_current_user(setter, user) {
    setTimeout(() => {
	axios.get("/user/get_current_auth")
	    .then((res) => {
		
		if(res.data.role === "admin") {
		    current_user_role = "admin";
		}
		
		document.getElementById("ue_username-current").textContent = res.data.username;
		user = res.data.username;
		document.getElementById("ue_img-current").src = URL.createObjectURL(new Blob([Base64.toUint8Array(res.data.avatar)]));
		document.getElementById("ue_status-current").style.backgroundColor = "#00F000";
	    })
	    .catch((err) => {
		setter(<ERROR_MESSAGE err={err} msg="While getting current auth." />);
	    });
    }, 1000);
}

export default function SIDEBAR(props) {

    const [state, setState] = useState(<LOADING mode="light" />);
    const [currentUser, setCurrentUser] = useState(<USER_ENTITY id="current" />);
    const [adminTools, setAdminTools] = useState();

    setTimeout(() => {
	if(current_user_role === "admin") {
	    setAdminTools(<ADMIN_TOOLS />);
	}
    }, 2000);
    
    useEffect(() => {
	
	let users_online = 0;
	
	get_current_user(setState, props.user);

	const interval = setInterval(() => {
	    axios.get("/user/track")
		.then((res) => {
		    if(users_online !== res.data) {
			users_online = res.data;
			axios.get("/user/get_online_users")
			    .then((res) => {
				console.log(res.data);
			    })
			    .catch((err) => {
				setState(<ERROR_MESSAGE err={err} msg="While getting online users." />);
			    });
		    }
		})
		.catch((err) => {
		    setState(<ERROR_MESSAGE err={err} msg="While sending tracking request." />);
		});
	}, 2000);

	return () => {
	    clearInterval(interval);
	};
    }, []);
    
    return(
        <div id="SIDEBAR">
	    {currentUser}
	    {state}
	    {adminTools}
	</div>
    );
}
