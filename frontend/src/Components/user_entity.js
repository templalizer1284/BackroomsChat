import "../Styles/common.css";
import "../Styles/user_entity.css";

export default function USER_ENTITY(props) {
    return(
        <div className="user_entity" id={"ue_id-".concat(props.id)} key={props.id}>
	    <img alt={"ue_alt-".concat(props.id)} id={"ue_img-".concat(props.id)} src={props.img}/>
	    <div className="user_entity_online_status" id={"ue_status-".concat(props.id)}></div>
	    <p className="user_entity_username" id={"ue_username-".concat(props.id)}>{props.username}</p>
	</div>
    );
}
