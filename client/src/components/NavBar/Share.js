import React, {useState} from 'react';
import SideNav  from 'react-simple-sidenav';
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  ViberShareButton,
  ViberIcon,
  WhatsappShareButton,
  WhatsappIcon
} from "react-share";
import './Share.css';
import {ReactComponent as ShareSvg} from "../../assets/img/share-blue.svg";

const Share = (props) => {
  
  const [showNav, setShowNav] = useState();
  
  const url = "https://movexyz.com";
  const title = 'moveXYZ - Vehicle Tracker'
  
  const items = [
    <EmailShareButton url={url} subject={title}><EmailIcon size={36}/></EmailShareButton>,
    <FacebookShareButton url={url}><FacebookIcon size={36} /></FacebookShareButton>,
    <TwitterShareButton title={title } url={url}><TwitterIcon size={36}/></TwitterShareButton>,
    <ViberShareButton title={title} url={url}><ViberIcon size={36}/></ViberShareButton>,
    <WhatsappShareButton title={title}  url={url}><WhatsappIcon size={36}/></WhatsappShareButton>
  ]
  
  return (
      <div className="share__section" style={{top: props.top + 'px'}}>
        <div onClick={() => setShowNav(true)} >
          <span style={{display: 'flex', alignSelf: 'center', margin: '10px 0 0', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer', border: '2px solid black'}}>
            <ShareSvg style={{height: '24px', width: 'auto'}}/>
            <b style={{marginLeft: '10px'}}>Share</b>
          </span>
        </div>
        <SideNav
          openFromRight={true}
          items={items}
          showNav={showNav}
          onHideNav={() =>
          setShowNav(false)}
          titleStyle={{display: 'none'}}
          itemStyle={{listStyleType: 'none', padding: '5px', outline: 'none'}}
          navStyle={{backgroundColor: 'white',padding: '0'}}
          childeren={
            <div>Hello Kitty</div>}
        />
      </div>
  );
};

export default Share;
