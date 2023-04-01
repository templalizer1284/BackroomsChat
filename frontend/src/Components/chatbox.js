import { useRef, useState } from "react";
import axios from "axios";

import { Howl, Howler } from "howler";
import FILE from "../Media/notif.mp3";

import "../Styles/common.css";
import "../Styles/chatbox.css";

let attached = false;

function send_message(refs) {

    const sound = new Howl({
	src: [FILE],
	volume: 0.2
    });
    
    let data = new FormData();
    data.append("message", refs.msg.current.value);
    axios.post("/user/get_message", data)
	.then((res) => {
	    if(res.data === "received") {
		refs.msg.current.value = "";
		sound.play();
	    }
	})
	.catch((err) => {
	    console.log(err);
	});
}

function attachEvents(refs) {
    
    if(attached === true) {
	return
    }
    
    let hook = document.getElementById("CHATBOX");
    hook.addEventListener("keydown", (e) => {
	if(e.key === "Enter") {
	    send_message(refs);
	}

	attached = true;
    });
}

function FILE_UPLOAD() {

    const refs = {
	file: useRef(null)
    };

    function preview_file(refs) {
	document.getElementById("chatbox_file_upload").style.height = "250px";
	
	// Determine media type
	const filename = refs.file.current.files[0].name.toString().split(".");
	const type = filename.at(1);
	const name = filename.at(0);
    }
    
    return(
        <div id="chatbox_file_upload">
            <div id="cfu_input">
		<input ref={refs.file} type="file" onChange={() => { preview_file(refs) }}/>
		<button onClick={() => {
			    
			}}>Upload</button>
	    </div>
            <div id="cfu_preview">
		
	    </div>
	</div>
    );
}

export default function CHATBOX(props) {
    
    let refs = {
	msg: useRef(null)
    };

    setTimeout(() => {	
	document.getElementById("chatbox_file_upload").style.visibility = "hidden";
    }, 1000);
    
    return(
        <div id="CHATBOX" onClick={() => { attachEvents(refs) }}>
            <button id="chatbox_button_add_files" onClick={() => {
			if(document.getElementById("chatbox_file_upload").style.visibility === "hidden") {
			    document.getElementById("chatbox_file_upload").style.visibility = "visible";
			} else {
			    document.getElementById("chatbox_file_upload").style.visibility = "hidden";
			}
		    }}>+</button>
            <input ref={refs.msg} type="text" placeholder="Type something..."/>
            <button onClick={() => { send_message(refs) }} id="chatbox_button_send">Send</button>
	    <FILE_UPLOAD />
	</div>
    );
}
