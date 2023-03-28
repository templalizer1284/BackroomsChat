import "../Styles/common.css";
import "../Styles/message_entity.css";

export function MESSAGE_ENTITY(id, img, date, msg, parent) {
    const root_div = document.createElement("div");
    root_div.className = "message_entity";
    root_div.id = "me_id".concat(id);

    const pic_div = document.createElement("div");
    pic_div.className = "message_entity_pic";

    const pic = document.createElement("img");
    pic.src = img;
    pic_div.appendChild(pic);

    root_div.appendChild(pic_div);

    const content_div = document.createElement("div");
    content_div.className = "message_entity_content";

    const content_date = document.createElement("p");
    const content_message = document.createElement("p");

    content_date.textContent = date;
    content_date.style.fontSize = "12px";
    
    content_message.textContent = msg;

    content_div.append(content_date, content_message);

    root_div.appendChild(content_div);
    
    parent.appendChild(root_div);
}
