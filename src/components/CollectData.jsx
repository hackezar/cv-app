/* eslint-disable react/prop-types */
import { useState } from 'react'

// Unique Key
import { v4 as uuidv4 } from 'uuid';

//Styles
import "../styles/CollectData.css"

//Icon
import DeleteIcon from "../assets/delete.svg"

// Job Data
import {  jobListItems } from '../components/JobData.jsx';


function CollectDataApp() {
  const [data, setData] = useState({});
  const [index, setIndex] = useState(2);
  let WhichForm;
  const storeData = () => {        
    let inputItems = document.querySelectorAll('.inputItem');
    let newData = data;
    let dataChunk = {};
    inputItems.forEach((input) => {
      let inputKey = input.name;
      let inputValue = input.value;
      dataChunk[inputKey] = inputValue;
    })
    //Puts data in general info if index is 0
    if (index === 0)
      newData.generalInfo = dataChunk;
    //Puts data in educational experience if index is 1
    else if(index === 1)
      newData.educationalExperience = dataChunk;
    setData(newData);
    setIndex(index + 1);
  }
  if (index === 0)
      WhichForm = GeneralInfo;
  else if (index === 1)
      WhichForm = EducationalExperience;
  else if (index === 2)
      WhichForm = PracticalExperience;
  return(
    <>
      <WhichForm />
      <button className="nextBtn" onClick={storeData}>Next</button>
    </>
  )
}

function InputLi({name, labelText, type="text", placeholder="", key, className="listItem"}) {
  return(
      <li className={className} key={key}>
        <label htmlFor={name}>{labelText}</label>
        <input className="inputItem" id={name} type={type} name={name} placeholder={placeholder}/>
      </li>
  )
}

function TextAreaLi({name, labelText, key, className='listItem'}) {
  return(
      <li className={className} key={key}>
          <label htmlFor={name}>{labelText}</label>
          <textarea className="inputItem" id={name} name={name} cols={40} rows={5} />
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

function GeneralInfo() {
  return (
    <div className="generalInfoDiv">
      <form className="inputForm">
        <legend>General Info</legend>
        <ul className="list">
          <InputLi name="name"  labelText="Name" placeholder="Ex: John Doe"/>
          <InputLi name="email" type="email" labelText="Email" placeholder="johndoe@gmail.com"/>
          <InputLi name="phone" type="tel" labelText="Phone" placeholder="555-555-5555"/>
        </ul>
      </form>
    </div>
  )
}


function EducationalExperience() {
  const [isActive, setIsActive] = useState(false);
  return(
      <div className="educationalExperienceDiv">
          <form className="inputForm" >
              <legend>Educational Experience</legend>
              <ul className="list">
                  <InputLi name="highSchoolName" labelText="Enter The Name of your High School" type="text" />
                  <InputLi name="highSchoolStartDate" labelText="Enter when you first went to high school" type="date"/>
                  <InputLi name="highSchoolEndDate" labelText="Enter when you graduated from high school" type="date"/>
                  <li className="listItem">
                      <label htmlFor='checkbox'>Check if you have a college degree 
                          <input className='inputItem' type="checkbox" name="collegeCheck" id="collegeCheck" onClick={() => {
                              isActive ? setIsActive(false) : setIsActive(true);
                          }} />
                      </label>
                  </li>
                  {isActive && (
                      <>
                        <InputDropdown />
                        <InputLi name="collegeDegree" labelText="Enter your Degree" />
                        <InputLi name="collegeStartDate" labelText="When did you start College?" type="date" />
                        <InputLi name="collegeEndDate" labelText="When did you finish College?" type="date" />
                      </>
                  )}
              </ul>
          </form>
      </div>
  )
}

function JobInput ({key, handleClick}) {
  return (
    <div className="jobInputDiv" key={key} >
      {jobListItems}
      <img src={DeleteIcon} className="deleteIcon" onClick={handleClick} />
    </div>
  )
}


function PracticalExperience() {
  const [jobCount, setJobCount] = useState(1);
  const [jobData, setJobData] = useState([{id: 'jobData' + jobCount, key: uuidv4()}]);
  const addJob = () => {
    console.log('job added')
      setJobData([
        ...jobData,
        { id: 'jobData' + (jobCount + 1), key: uuidv4()}
      ]);
      setJobCount(jobData.length + 1)
  }
  const deleteJobDiv = (removedKey) => {
    //Remove the job div if the X icon is clicked
    setJobData(
      jobData.filter(job =>
        job.key !== removedKey
      )
    );
  }

  return (
      <div className="practicalExperienceDiv">
      <form className="inputForm" >
          <legend>Work History</legend>
          <ul className="list">
            {jobData.map(job => (
              <JobInput key={job.key} id={job.id} handleClick={ () => deleteJobDiv(job.key) }/>
            ))}
          </ul>
      </form>
      <div className='buttonsDiv'>
          <button className="addJobBtn" onClick={addJob}>Add Job</button>
      </div>
  </div>
  )
}

  

  export {InputLi, TextAreaLi, CollectDataApp, GeneralInfo, EducationalExperience}
  