import React from 'react'


const DropDown = ({selected, onSelectChange}) => {

    const handleChange = (event) => {
        onSelectChange(event.target.value)
    }

    return (
        <select value={selected} onChange={handleChange}>
            <option >Select Company</option>
            <option value="AMZN">Amazon</option>
            <option value="MSFT">Microsoft</option>
            <option value="META">Meta</option>
            <option value="GOOGL">Google</option>
            <option value="AAPL">Apple</option>
        </select>
    )
}
export default DropDown;

