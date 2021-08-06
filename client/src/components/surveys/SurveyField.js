//SurveyField contains logic to render a single lable and input
import React from 'react';

export default ({ input, label, meta: { error, touched } }) => { //error and touched is es6 destructuring, nested destructuring with how I wrote it with meta
    //console.log(meta);
    return (
        <div>
            <label>{label}</label>
            <input {...input} style={{ marginBottom: '5px' }} />
            <div className="red-text" style={{ marginBottom: '20px' }}>
            {touched && error}
            </div>
        </div>
    );
};