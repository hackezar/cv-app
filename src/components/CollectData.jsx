/* eslint-disable react/prop-types */
import { useState } from 'react'

// Unique Key
import { v4 as uuidv4 } from 'uuid';

//Styles
import "../styles/CollectData.css"

//Icon
import DeleteIcon from "../assets/delete.svg"

// Job Data
import {  jobInputs } from './JobData.jsx';

function CollectDataApp() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [data, setData] = useState([]);
  // Stores the data entered in inputs
  const handleChange = (e) => {
    const newData = data.filter(dataChunk =>
      dataChunk[0] !== e.target.name
    )
    newData.push([e.target.name, e.target.value]);
    setData(newData);
  }

  const buttonPress = function(num, isPractical) {
    setActiveIndex(num);
    if (isPractical) {
      let inputItems = document.querySelectorAll('.inputItem');
      inputItems = Array.from(inputItems);
      let newData = data;
      inputItems.map(item => {
        newData.push([item.name, item.value]);
      })
      setData(newData);
    }
  }

  console.log(data)
  return(
    <>
      {/*Clicking the next button in each section will set the active section to the next one*/}
      <GeneralInfo
      isActive={activeIndex === 0}
      buttonPress={() => buttonPress(1)}
      handleChange={handleChange}
       />
      <EducationalExperience
      isActive={activeIndex === 1}
      buttonPress={() => buttonPress(2)}
      handleChange={handleChange}
      />
      <PracticalExperience
      isActive={activeIndex === 2}
      buttonPress={() => buttonPress(0, true)}
      data={data}
      setData={setData}
      />
    </>
  )
}

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

function InputDropdown() {
  return (
      <li className='college'>
      <label htmlFor='degreeType'>Select Type of Degree</label>
      <select className="inputItem" name="degreeType" id="degreeType">
          <option value="bachelors">Bachelors</option>
          <option value="masters">Masters</option>
          <option value="doctors">Doctors</option>
      </select>
      </li>
  )
}

function GeneralInfo({ isActive, buttonPress, handleChange }) {
  // If isActive is true, will render this section
  return isActive && 
      <div className="generalInfoDiv">
        <form className="inputForm">
          <legend>General Info</legend>
          <ul className="list">
            <InputLi name="name"  labelText="Name" placeholder="Ex: John Doe" handleChange={handleChange} />
            <InputLi name="email" type="email" labelText="Email" placeholder="johndoe@gmail.com" handleChange={handleChange} />
            <InputLi name="phone" type="tel" labelText="Phone" placeholder="555-555-5555" handleChange={handleChange} />
          </ul>
        </form>
        <button className="nextBtn" onClick={buttonPress}>Next</button>
      </div>
    }


function EducationalExperience({ isActive, buttonPress, handleChange }) {
const [isChecked, setIsChecked] = useState(false);
  return isActive &&
      <div className="educationalExperienceDiv">
          <form className="inputForm" >
              <legend>Educational Experience</legend>
              <ul className="list">
                  <InputLi name="highSchoolName" labelText="Enter The Name of your High School" type="text" handleChange={handleChange} />
                  <InputLi name="highSchoolStartDate" labelText="Enter when you first went to high school" type="date" handleChange={handleChange} />
                  <InputLi name="highSchoolEndDate" labelText="Enter when you graduated from high school" type="date"handleChange={handleChange} />
                  <li className="listItem">
                      <label htmlFor='checkbox'>Check if you have a college degree 
                          <input className='inputItem' type="checkbox" name="collegeCheck" id="collegeCheck" onChange={handleChange} onClick={() => {
                              isChecked ? setIsChecked(false) : setIsChecked(true);
                          }} />
                      </label>
                  </li>
                  {isChecked && (
                      <>
                        <InputDropdown />
                        <InputLi name="collegeDegree" labelText="Enter your Degree" handleChange={handleChange} />
                        <InputLi name="collegeStartDate" labelText="When did you start College?" type="date" handleChange={handleChange} />
                        <InputLi name="collegeEndDate" labelText="When did you finish College?" type="date" handleChange={handleChange} />
                      </>
                  )}
              </ul>
          </form>
          <button className="nextBtn" onClick={buttonPress}>Next</button>
      </div>
}

function JobInput ({keyName, handleClick, index, handleChange}) {
  const jobListItems = jobInputs.map(job => {
    let jobName = job.name + index;
    return(
    job.type != 'textarea'
    // Render a Input if the type isnt set as textarea 
    ? 
        <InputLi name={jobName} labelText={job.labelText} type={job.type} key={job.key} className={job.className} value={job.value} handleChange={handleChange}/>
      
    // Otherwise render a Textarea
    : 
        <TextAreaLi name={jobName} labelText={job.labelText} key={job.key} className={job.className} value={job.value} handleChange={handleChange}/>        
    )
  })
  return (
    <div className="jobInputDiv" key={keyName} >
      <h6>{'Job '+ (index)}</h6>
      {jobListItems}
      <img src={DeleteIcon} className="deleteIcon" onClick={handleClick} />
    </div>
  )
}



function PracticalExperience({ isActive, buttonPress }) {
  // This section has a List of jobs that you can add and subtractfrom
  // Press X button to delete a job
  // Click add job to add a job
  // This way you can set as many job experiences as you want in the resume
  const [jobCount, setJobCount] = useState(1);
  const [jobData, setJobData] = useState([{id: 'jobData' + jobCount, key: uuidv4(), label: 'Job #' + jobCount, data: null}]);

  const addJob = () => {
    console.log('job added')
      setJobData([
        ...jobData,
        { id: 'jobData' + (jobCount + 1), key: uuidv4(), data: null}
      ]);
      setJobCount(jobData.length + 1);
  }

  const deleteJobDiv = (removedKey, delIndex) => {
    //Remove the job div if the X icon is clicked
    console.log(delIndex);
    setJobData(
      jobData.filter(job =>
        job.key !== removedKey
      )
    )
  }

  return isActive &&
      <div className="practicalExperienceDiv">
          <legend>Work History</legend>
          <ul className="list">
            {jobData.map((job, index) => (
              <JobInput key={job.key} index={index + 1} handleClick={ () => deleteJobDiv(job.key, (index + 1)) }/>
            ))}
          </ul>
      <div className='buttonsDiv'>
          <button className="addJobBtn" onClick={addJob}>Add Job</button>
      </div>
      <button className="nextBtn" onClick={buttonPress}>Next</button>
  </div>
}

  export {InputLi, TextAreaLi, CollectDataApp, GeneralInfo, EducationalExperience}
  