import { useState, useEffect } from "react";

import axios from "axios";
import { Howl, Howler } from "howler";

import SIDEBAR from "./sidebar.js";
import CHATBOX from "./chatbox.js";
import LOADING from "./loading.js";
import ERROR_MESSAGE from "./error_message.js";

import FILE from "../Media/notif.mp3";

import { MESSAGE_ENTITY } from "./message_entity.js";

function findHighest(arr) {
    let el = 0;
    arr.forEach((e) => {
	if(el < e){
	    el = e;
	}
    });

    return el;
}

export default function ROOMS(props) {

    const [state, setState] = useState(<LOADING mode="dark" />);

    const msg_color = {
	light: "#32313d",
	dark: "inherit"
    };

    let message_contrast = false;

    let sound = new Howl({
	src: [FILE],
	volume: 0.2
    });

    sound.play();
    
    useEffect(() => {

	let track_messages = 0;
	let message_ids = new Array();
	
	const interval = setInterval(() => {
	    axios.get("/user/track_messages")
		.then((res) => {
		    if(track_messages !== res.data) {
			track_messages = res.data;
			setState();
			axios.get("/user/fetch_message_ids")
			    .then((res) => {
				const frontend_highest = findHighest(message_ids);
				const backend_highest = findHighest(res.data);
				if(backend_highest > frontend_highest) {
				    const limit = backend_highest - frontend_highest;
				    let start_index = frontend_highest;
				    for(let i = 0; i < limit; i++) {
					message_ids.push(res.data.at(start_index));
					start_index++;

					let data = {
					    params: {
						id: start_index
					    }
					};
					axios.get("/user/fetch_message_by_id", data)
					    .then((res) => {
						let con;
						if(message_contrast === false) {
						    con = msg_color.light;
						    message_contrast = true;
						} else {
						    con = msg_color.dark;
						    message_contrast = false;
						}
						MESSAGE_ENTITY(res.data.id,
							       res.data.img,
							       res.data.date,
							       res.data.time,
							       res.data.content,
							       res.data.owner_id,
							       con,
							       document.body);
					    })
					    .catch((err) => {
						setState(<ERROR_MESSAGE err={err} msg="While fetching messages by id." />);
					    })
					    .finally(() => {
						// Wait for axios to get data
					    });
				    }
				} else {
				    // fetch all messages here
				}
			    })
			    .catch((err) => {
				setState(<ERROR_MESSAGE err={err} msg="While fetching message ids." />);
			    });
		    }
		})
		.catch((err) => {
		    setState(<ERROR_MESSAGE err={err} msg="While tracking messages." />);
		});
	}, 500);

	return () => {
	    clearInterval(interval);
	};
    }, []);
    
    return(
        <div id="ROOMS">
	    <SIDEBAR
		setter={setState}
	    />
	    <CHATBOX
		setter={setState}
	    />
	    {state}
	</div>
    );
}
