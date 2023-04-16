
import { TextField } from "@mui/material";


let renderError = ({ error, touched }: any) => {

    if (error && touched) {
        return (<span className=""> {error} </span>)
    }
    return ''
}

export const renderField = ({ input, label, name, type, meta, value, id }: any) => {
    console.log( input, label, name, type, meta, value, id );
    
    return (<div>
        {/* <label>{label}</label> */}
        <div className='form-group'>

            <TextField error={renderError(meta) === '' ? false : true}  fullWidth={true}
                {...input}  label={label} helperText={renderError(meta)} variant="standard"
            />
            {/* <input  {...input} type={type} className={meta.touched && meta.error ? 'is-invalid form-control' : 'form-control'} value={value} />
         {renderError(meta)} */}
        </div>
    </div>
    )
}

