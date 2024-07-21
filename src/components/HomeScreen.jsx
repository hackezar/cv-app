/* eslint-disable react/prop-types */
import LogoJpg from '../assets/images/reardenDigitalLogo.jpg'
import '../styles/homeScreen.css'
function HomeScreen({activeApp, renderCollectData}) {
    if (activeApp)
        {
        return (
            <div className="homeScreen">
                <header className="header">
                    <div>Resume Builder</div>
                    <div className="subText">Enter your information and create your own modern Resume in minutes</div>
                </header>
                <div className="startBtnDiv">
                    <button type="button" onClick={renderCollectData}>Get Started</button>
                </div>
                <footer className="footer" >
                    <picture >
                        <source srcSet={LogoJpg} type="image/jpeg" />
                        <img className="logo" src={LogoJpg}/>
                    </picture>
                    <div className="plug">
                        Rearden Digital
                    </div>
                </footer>
            </div>
        )
    }
}

export {HomeScreen}