import React from 'react'

//adds dropdown option and selects assigned stock code
const DropDown = ({selected, onSelectChange}) => {

    //handle event value and change it
    const handleChange = (event) => {
        onSelectChange(event.target.value)
    }

    //return dropdown menu
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

