import React from 'react';
import InputMask from 'react-input-mask';
import { Form } from 'react-bootstrap';

const MaskedFormControl = ({ mask, onChange,value, onBlur ,id,...rest }) => {
    return (
        <Form.Control
            as={InputMask}
            mask={mask}
            onChange={onChange}
            value={value}
            onBlur={onBlur}
            id={id}
            {...rest}
        />
    );
};

export default MaskedFormControl;