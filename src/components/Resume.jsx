/* eslint-disable react/prop-types */
// This stylesheet is a module. It will only apply to this module
import styles from '../styles/Resume.module.css'

// icons

import Email from '../assets/email.svg'
import Phone from '../assets/phone.svg'
import Location from '../assets/location.svg'

function Resume({activeApp, returnToInfoEditor}) {
    let data = JSON.parse(sessionStorage.getItem('storedData'))

    function CollegeItems() {
        let collegeItems = []
        for (let i=1; i<=data.collegeCount; i++){
            collegeItems.push(
                <div>
                    <li className={styles.collegeBold}>{data.educationalExperience['degreeType' + i]} Degree</li>
                    <li className={styles.collegeBold}>{data.educationalExperience['degreeName' + i]} </li>
                    <li>{data.educationalExperience['collegeName' + i]}</li>
                    <li>{data.educationalExperience['collegeStartDate' + i]} - {data.educationalExperience['collegeEndDate' + i]}</li>
                </div>
            )
        }
        return collegeItems
    }

    function JobItems(){
        let practicalItems=[];
        for (let i=1; i<=data.jobCount; i++){
            practicalItems.push(
                <div className={styles.jobDiv}>
                    <div className={styles.companyNameAndDates}>
                        <h4 className={styles.header}>{data.practicalExperience['companyName' + i]}</h4>
                        <div className={styles.dates}>
                            <p>{data.practicalExperience['dateFrom' + i]}</p>
                            <p> - </p>
                            <p>{data.practicalExperience['dateTo' + i]}</p>
                        </div>
                    </div>
                    <p className={styles.positionTitle}>{data.practicalExperience['positionTitle' + i]}</p>
                    <p className={styles.jobRespons}>{data.practicalExperience['jobRespons' + i]}</p>
                </div>
            )
        }
        return practicalItems
    }

        return activeApp &&
            <div className={styles.resumeOuter}>
                <div className={styles.space}></div>
                <div className={styles.resume}>
                    <header className={styles.title}>
                        <div className={styles.drawLine}/>
                        <div className={styles.name}>{data.generalInfo.name}</div>
                    </header>
                    <div className={styles.aboutMe}>
                        <div className={styles.contact}>
                            <div>
                                <img src={Phone} className={styles.icons} />
                                {data.generalInfo.phone}
                            </div>
                            <div className={styles.email}>
                                <img src={Email} className={styles.icons} />
                                <div>
                                    {data.generalInfo.email}
                                </div>
                            </div>
                            <div>
                                <img src={Location} className={styles.icons} />
                                <div className={styles.address}>
                                    <p>{data.generalInfo.address}</p>
                                    <p>{data.generalInfo.state} {data.generalInfo.zipCode}</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.bio}>
                            <p className={styles.header}>About Me</p>
                            <p>{data.generalInfo.aboutMe}</p>
                        </div>
                    </div>
                    <div className={styles.education}>
                        <p className={`${styles.header} ${styles.educationHeader}`}>Education</p>
                        <div className={styles.collegeDiv}>
                            <CollegeItems />
                        </div>
                    </div>
                    <div className={styles.workExperience}>
                    <p className={`${styles.header} ${styles.workHeader}`}>Work Experience</p> 
                    <JobItems/>
                    </div>
                </div>
                <div className={styles.buttonDiv}>
                    <button className={styles.button}type="button" onClick={returnToInfoEditor}>Edit Info</button>
                </div>
            </div>
    }   


export {Resume}