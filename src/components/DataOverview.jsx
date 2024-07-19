/* eslint-disable react/prop-types */
import { mockData } from "./EducationAndJobData.jsx";

function DataOverview({isActive, isChecked, data, setData, collegeCount, jobCount, setActiveIndex}) {
    //Store All Submitted Data
        

    // Render the Practical Experience List Items
    function PracticalItems(){
        let practicalItems=[];
        for (let i=1; i<=jobCount; i++){
            let jobTitle = 'Job #' + i;
            practicalItems.push(
                <div>
                    <h4>{jobTitle}</h4>
                    <ul>
                        <li>Company Name: {data.practicalExperience['companyName' + i]}</li>
                        <li>Position Title: {data.practicalExperience['positionTitle' + i]}</li>
                        <li>Job Responsibilities: {data.practicalExperience['jobRespons' + i]}</li>
                        <li>Date Started: {data.practicalExperience['dateTo' + i]}</li>
                        <li>Last Date of Employment: {data.practicalExperience['dateFrom' + i]}</li>
                    </ul>
                </div>
            )
        }
        return practicalItems
    }

    function CollegeItems() {
        let collegeItems = []
        for (let i=1; i<=collegeCount; i++){
            let collegeTitle = 'College Degree #' + i
            collegeItems.push(
                <div>
                    <h4>{collegeTitle}</h4>
                    <li>College Name: {data.educationalExperience['collegeName' + i]} </li>
                    <li>Degree Type: {data.educationalExperience['degreeType' + i]} </li>
                    <li>Degree Name: {data.educationalExperience['degreeName' + i]} </li>
                    <li>Start Date: {data.educationalExperience['collegeStartDate' + i]} </li>
                    <li>Date Finished: {data.educationalExperience['collegeEndDate' + i]} </li>
                </div>
            )
        }
        return collegeItems
    }
    
    return isActive &&
        <div className="dataOverview">
            <h3>Review your information</h3>
            <div>
                <h4>General Information</h4>
                <ul>
                    <li>
                        Name: {data.generalInfo.name}
                    </li>
                    <li>
                        Email: {data.generalInfo.email}
                    </li>
                    <li>
                        Phone #: {data.generalInfo.phone}
                    </li>
                </ul>
                <button onClick={() =>setActiveIndex(0)}>Edit</button>
            </div>
            <div>
                <h4>Educational Experience</h4>
                <ul>
                    <li>
                        High School: {data.educationalExperience.highSchoolName}
                    </li>
                    <li>
                        Date Started: {data.educationalExperience.highSchoolStartDate}
                    </li>
                    <li>
                        Date Finished: {data.educationalExperience.highSchoolEndDate}
                    </li>
                    {isChecked && 
                    <CollegeItems />
                    }
                </ul>
                <button onClick={() => setActiveIndex(1)}>Edit</button>
                </div>

            <div>
                <h4>Practical Experience</h4>
                <PracticalItems />
                <button onClick={() => setActiveIndex(2)}>Edit</button>
            </div>
            <button>Create CV</button>

        </div>
}

export {DataOverview}