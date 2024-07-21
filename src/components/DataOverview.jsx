/* eslint-disable react/prop-types */

import '../styles/dataOverview.css';
function DataOverview({isActive, data, collegeCount, setActiveIndex, createResume}) {
    // Render the Practical Experience List Items
    function PracticalItems(){
        let practicalItems=[];
        for (let i=1; i<=data.jobCount; i++){
            let jobTitle = 'Job #' + i;
            practicalItems.push(
                <div>
                    <h4>{jobTitle}</h4>
                    <ul className="dataOverviewList">
                        <li><div className="boldText">Company Name: </div>{data.practicalExperience['companyName' + i]}</li>
                        <li><div className="boldText">Position Title: </div>{data.practicalExperience['positionTitle' + i]}</li>
                        <li><div className="boldText">Job Responsibilities: </div>{data.practicalExperience['jobRespons' + i]}</li>
                        <li><div className="boldText">Date Started: </div>{data.practicalExperience['dateTo' + i]}</li>
                        <li><div className="boldText">Last Date of Employment: </div>{data.practicalExperience['dateFrom' + i]}</li>
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
                <div className="dataOverviewList">
                    <h4>{collegeTitle}</h4>
                    <li><div className="boldText">College Name: </div>{data.educationalExperience['collegeName' + i]} </li>
                    <li><div className="boldText">Degree Type: </div>{data.educationalExperience['degreeType' + i]} </li>
                    <li><div className="boldText">Degree Name: </div>{data.educationalExperience['degreeName' + i]} </li>
                    <li><div className="boldText">Start Date: </div>{data.educationalExperience['collegeStartDate' + i]} </li>
                    <li><div className="boldText">Date Finished: </div>{data.educationalExperience['collegeEndDate' + i]} </li>
                </div>
            )
        }
        return collegeItems
    }
    
    return isActive &&
        <div className="dataOverview">
            <h3 className="overviewHeader">Review your information</h3>
            <div className="dataOverviewDiv">
                <div className="overviewSubHeader">General Information</div>
                <ul className="dataOverviewList">
                    <li>
                        <div className="boldText">Name: </div>{data.generalInfo.name}
                    </li>
                    <li>
                        <div className="boldText">Email: </div>{data.generalInfo.email}
                    </li>
                    <li>
                        <div className="boldText">Phone #: </div>{data.generalInfo.phone}
                    </li>
                    <li>
                        <div className="boldText">About Me: </div>{data.generalInfo.aboutMe}
                    </li>
                </ul>
                <button className="buttonStyle editBtn" onClick={() =>setActiveIndex(0)}>Edit</button>
            </div>
            <div className="dataOverviewDiv">
                <div className="overviewSubHeader">Educational Experience</div>
                <ul className="dataOverviewList">
                    <h4>High School</h4>
                    <li>
                        <div className="boldText">High School Name: </div>{data.educationalExperience.highSchoolName}
                    </li>
                    <li>
                        <div className="boldText">Date Started: </div>{data.educationalExperience.highSchoolStartDate}
                    </li>
                    <li>
                        <div className="boldText">Date Finished: </div>{data.educationalExperience.highSchoolEndDate}
                    </li>
                    {data.educationalExperience.collegeCheck && 
                        <CollegeItems />
                    }
                </ul>
                <button className="buttonStyle editBtn" onClick={() => setActiveIndex(1)}>Edit</button>
                </div>

            <div className="dataOverviewDiv">
                <div className="overviewSubHeader">Practical Experience</div>
                <PracticalItems />
                <button className="buttonStyle editBtn" onClick={() => setActiveIndex(2)}>Edit</button>
            </div>
            <div className="createResumeBtnDiv">
                <button className="buttonStyle createResumeBtn" onClick={createResume}>Create Resume</button>
            </div>

        </div>
}

export {DataOverview}