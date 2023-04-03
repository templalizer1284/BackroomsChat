import { useRef, useState } from "react";

import axios from "axios";
import { Howl, Howler } from "howler";
import { Base64 } from "js-base64";

import LOADING from "./loading.js";

import FILE from "../Media/notif.mp3";
import FILE_IMG from "../Media/file.svg";

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

    let attachment = document.getElementById("cfu_input_raw");
    console.log(attachment);
    
    if(attachment.files.length === 0) {
	data.append("file", null);
    } else {
	data.append("file", attachment.files[0]);
    }
    
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

    const [state, setState] = useState();
    
    const refs = {
	file: useRef(null)
    };

    function preview_file(refs) {
	// Expand the form and delete any preview if any.
	document.getElementById("chatbox_file_upload").style.height = "250px";
	document.getElementById("cfu_preview").innerHTML = "";
	
	// Determine media type
	const data = refs.file.current.files[0]
	const filename = refs.file.current.files[0].name.toString().split(".");
	const type = refs.file.current.files[0].type;

	let found = false;

	// Recognized file formats
	const pictures = new Array();
	pictures.push("image/jpeg",
		      "image/webp",
		      "image/png");

	const videos = new Array();
	videos.push("video/webm",
		    "video/mp4",
		    "video/ogv");

	const audio = new Array();
	audio.push("audio/mpeg",
		       "audio/ogg");
	
	pictures.forEach((e) => {
	    if(e === type) {
		const image_preview = document.createElement("img");
		image_preview.id = "cfu_image_preview";
		image_preview.src = URL.createObjectURL(new Blob([data]));

		const hook = document.getElementById("cfu_preview");
		hook.appendChild(image_preview);

		document.getElementById("cfu_image_preview").style.opacity = "1.0";
		
		found = true;
		return;
	    }
	});

	if(found === true) {return};

	videos.forEach((e) => {
	    if(e === type) {
		const video_preview = document.createElement("video");
		video_preview.src = URL.createObjectURL(new Blob([data]));
		video_preview.controls = "true";
		video_preview.style.width = "245px";
		video_preview.style.alignSelf = "center";

		const hook = document.getElementById("cfu_preview");
		hook.appendChild(video_preview);

		found = true;
		return;
	    }
	});

	if(found === true) {return};

	audio.forEach((e) => {
	    if(e === type) {
		document.getElementById("chatbox_file_upload").style.height = "95px";
		
		const audio_preview = document.createElement("audio");
		audio_preview.src = URL.createObjectURL(new Blob([data]));
		audio_preview.controls = "true";
		audio_preview.style.width = "100%";
		audio_preview.style.alignSelf = "center";
		
		const hook = document.getElementById("cfu_preview");
		hook.appendChild(audio_preview);
		
		found = true;
		return;
	    }
	});

	if(found === true) {return};

	// If format is not recognized, list it as raw file.
	const other = document.createElement("img");
	other.className = "chatbox_svg";
	other.src = FILE_IMG;

	const hook = document.getElementById("cfu_preview");
	hook.appendChild(other);
    }
    
    return(
        <div id="chatbox_file_upload">
            <div id="cfu_input">
		<input ref={refs.file} id="cfu_input_raw" type="file" onChange={() => { preview_file(refs) }}/>
	    </div>
	    {state}
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
