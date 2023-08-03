/* eslint-disable react/prop-types */
const BlockDays = (props) => {
    const { precentDaysRef, days } = props;
    return (
        <div ref={precentDaysRef} className='time-block' id='days'>
            <div>
                <ul>
                    <li>{days < 10 ? `0${days}` : days}</li>
                    <li>Days</li>
                </ul>
            </div>
        </div>
    );
};

export default BlockDays;
