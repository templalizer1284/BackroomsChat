import { useState, useEffect } from "react";
import axios from "axios";
import { Base64 } from "js-base64";

import "../Styles/common.css";
import "../Styles/sidebar.css";

import USER_ENTITY from "./user_entity.js";
import LOADING from "./loading.js";
import ERROR_MESSAGE from "./error_message.js";

export default function SIDEBAR(props) {

    const [state, setState] = useState(<LOADING mode="light" />);
    
    useEffect(() => {
	
	let users_online = 0;
	
	const interval = setInterval(() => {
	    axios.get("/user/track")
		.then((res) => {
		    if(users_online !== res.data) {
			users_online = res.data;
			axios.get("/users/get_online_users")
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
	    {state}
	</div>
    );
}
