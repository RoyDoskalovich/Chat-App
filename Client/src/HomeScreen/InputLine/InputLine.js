import {useState} from "react";

function InputLine({id, label, type, name, placeholder, errorMessage, pattern, onChange, onPicChange}) {

    const [focused, setFocused] = useState(false);
    const handleFocus = () => {
        setFocused(true);
    }
    const handleInputChange = (e) => {
        if (type === "file" && onPicChange) {
            onPicChange(e);
        } else {
            onChange(e);
        }
    };

    return (
        <div className="form-group row">
            <label htmlFor={id} className="col-sm-2 col-form-label">{label}</label>
            <input
                type={type}
                id={id}
                className="form-control"
                name={name}
                errormessage={errorMessage}
                pattern={pattern}
                placeholder={placeholder}
                onChange={handleInputChange}
                onBlur={handleFocus}
                focused={focused.toString()}
                required></input>
            <span className="error">{errorMessage}</span>
        </div>
    );
}

export default InputLine;