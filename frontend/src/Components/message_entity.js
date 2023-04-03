import { Base64 } from "js-base64";
import axios from "axios";

import "../Styles/common.css";
import "../Styles/message_entity.css";

export function MESSAGE_ENTITY(id, img, date, time, msg, owner_id, file, filename, filetype, contrast, parent) {
    const root_div = document.createElement("div");
    root_div.className = "message_entity";
    root_div.id = "me_id".concat(id);
    root_div.style.backgroundColor = contrast;

    const pic_div = document.createElement("div");
    pic_div.className = "message_entity_pic";

    const pic = document.createElement("img");
    
    const data = {
	params: {
	    id: owner_id
	}
    };
    
    axios.get("/user/fetch_avatar_by_id", data)
	.then((res) => {
	    pic.src = URL.createObjectURL(new Blob([Base64.toUint8Array(res.data.avatar)]));
	    pic.className = "avatar_me";
	})
	.catch((err) => {
	    root_div.textContent = "There was an error while fetching this message.";
	});
    pic_div.appendChild(pic);

    root_div.appendChild(pic_div);

    const content_div = document.createElement("div");
    content_div.className = "message_entity_content";

    const content_date = document.createElement("p");
    const content_message = document.createElement("p");

    if(date === "Today") {
	content_date.textContent = date;
	content_date.textContent += " " + time[0] + ":" + time[1] ;
    } else {
	content_date.textContent = date[0] + "." + date[1] + "." + date[2] + " " + time[0] + ":" + time[1];	
    }

    content_date.style.fontSize = "12px";

    content_message.className = "content_text";
    content_message.textContent = msg;

    if(file === null) {
	content_div.append(content_date, content_message);
    } else {
	let el_type;
	let element;
	const format = filetype.toString().split("/");

	switch(format.at(0)) {
	case "image":
	    el_type = "img";
	    break;
	case "video":
	    el_type = format.at(0);
	    break;
	case "audio":
	    el_type = format.at(0);
	    break;
	}

	element = document.createElement(el_type);
	element.src = URL.createObjectURL(new Blob([Base64.toUint8Array(file)]));
	
	if(el_type === "video" || el_type === "audio") {
	    element.controls = "true";
	}

	content_div.append(content_date, element, content_message);
    }

    // File Content

    root_div.appendChild(content_div);
    
    parent.appendChild(root_div);
}
