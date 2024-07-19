// Unique Key
import { v4 as uuidv4 } from 'uuid';


/* eslint-disable react/prop-types */
function InputLi({name, labelText, type="text", placeholder="", keyName=uuidv4(), className="listItem", handleChange, value, getDefaultValue=""}) {
    return(
        <li className={className} key={keyName}>
          <label htmlFor={name}>{labelText}</label>
          <input className="inputItem" id={name} type={type} onChange={handleChange} name={name} placeholder={placeholder} value={value} defaultValue={getDefaultValue}/>
        </li>
    )
  }
  
  function TextAreaLi({name, labelText, keyName=uuidv4(), className='listItem', handleChange, value}) {
    return(
        <li className={className} key={keyName}>
            <label htmlFor={name}>{labelText}</label>
            <textarea className="inputItem" id={name} name={name} cols={40} rows={5} onChange={handleChange} value={value}/>
        </li>
    )
  }
  
  function InputDropdown({handleChange, name, keyName=uuidv4(), value, getDefaultValue=""}) {
    return (
        <li className='college' key={keyName}>
        <label htmlFor='degreeType'>Select Type of Degree</label>
        <select className="inputItem" name={name} id="degreeType" defaultValue={getDefaultValue} onChange={handleChange}>
            <option value=""></option>
            <option value="Bachelors">Bachelors</option>
            <option value="Masters">Masters</option>
            <option value="Doctorate">Doctors</option>
        </select>
        </li>
    )
  }
  
  export { InputLi, InputDropdown, TextAreaLi }