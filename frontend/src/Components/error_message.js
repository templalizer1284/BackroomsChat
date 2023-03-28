export default function ERROR_MESSAGE(props) {
    return(
        <div className="error_message">
            <p style={{marginBottom: 15}}>Sorry, we have encountered error. Please contact our support.</p>
            <p><span style={{color: "#eeeeee"}}>Origin:</span> {props.msg}</p>
            <p><span style={{color: "#eeeeee"}}>Status:</span> {props.err.code}</p>
            <p><span style={{color: "#eeeeee"}}>Message:</span> {props.err.message}</p>
            <p style={{marginTop: 15}}>You can check your browser console for more debugging information. We apologize for inconvenience.</p>
	</div>
    );
}
