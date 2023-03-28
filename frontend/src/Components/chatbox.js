import { useRef, setState } from "react";
import axios from "axios";

import "../Styles/common.css";
import "../Styles/chatbox.css";

function send_message(refs) {
    let data = new FormData();
    data.append("message", refs.msg.current.value);
    axios.post("/user/get_message", data)
	.then((res) => {
	    if(res.data === "received") {
		refs.msg.current.value = "";
	    }
	})
	.catch((err) => {
	    console.log(err);
	});
}

export default function CHATBOX(props) {

    let refs = {
	msg: useRef(null)
    };
    
    return(
        <div id="CHATBOX">
            <button id="chatbox_button_add_files">+</button>
            <input ref={refs.msg} type="text" placeholder="Type something..."/>
            <button onClick={() => { send_message(refs) }} id="chatbox_button_send">Send</button>
	</div>
    );
}
