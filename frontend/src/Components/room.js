import { useState } from "react";

import SIDEBAR from "./sidebar.js";
import CHATBOX from "./chatbox.js";
import LOADING from "./loading.js";
import ERROR_MESSAGE from "./error_message.js";

export default function ROOMS(props) {

    const [state, setState] = useState(<LOADING mode="dark" />);
    
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
