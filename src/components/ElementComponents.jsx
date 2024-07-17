/* eslint-disable react/prop-types */
function InputLi({name, labelText, type="text", placeholder="", keyName, className="listItem", handleChange}) {
    return(
        <li className={className} key={keyName}>
          <label htmlFor={name}>{labelText}</label>
          <input className="inputItem" id={name} type={type} onChange={handleChange} name={name} placeholder={placeholder}/>
        </li>
    )
  }
  
  function TextAreaLi({name, labelText, keyName, className='listItem', handleChange}) {
    return(
        <li className={className} key={keyName}>
            <label htmlFor={name}>{labelText}</label>
            <textarea className="inputItem" id={name} name={name} cols={40} rows={5} onChange={handleChange} />
        </li>
    )
  }
  
  function InputDropdown({handleChange}) {
    return (
        <li className='college'>
        <label htmlFor='degreeType'>Select Type of Degree</label>
        <select className="inputItem" name="degreeType" id="degreeType" onChange={handleChange}>
            <option value="bachelors">Bachelors</option>
            <option value="masters">Masters</option>
            <option value="doctors">Doctors</option>
        </select>
        </li>
    )
  }
  
  export { InputLi, InputDropdown, TextAreaLi }