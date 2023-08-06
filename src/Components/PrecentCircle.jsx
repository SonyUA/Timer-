/* eslint-disable react/prop-types */

const PrecentCircle = ({ children, ...props }) => {
    const { precentRef } = props;
    console.log(children);
    return (
        <div ref={precentRef} className='time-block'>
            {children}
        </div>
    );
};

export default PrecentCircle;
