/* eslint-disable react/prop-types */
const InputDate = (props) => {
    const { getTime } = props;
    return (
        <div>
            <input type='date' name='date' id='input-date' onChange={getTime} />
        </div>
    );
};

export default InputDate;
