import "../Styles/common.css";
import "../Styles/user_entity.css";

export default function USER_ENTITY(props) {
    return(
        <div className="user_entity" id={props.id} key={props.key}>
            <img alt={"user_image".concat(props.id)} src={props.img}/>
            <div className="user_entity_online_status"></div>
            <p>{props.username}</p>
	</div>
    );
}
