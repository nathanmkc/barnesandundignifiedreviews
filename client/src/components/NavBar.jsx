import React from 'react';
import {Button, Icon} from 'semantic-ui-react';

function NavBar ({start, end, total, leftArrowClickHandler, rightArrowClickHandler}) {
  return (
    <div className="app-component sort-bar nav-bar">
      <div>
        {start + 1}-{end} of {total} Reviews
      </div>
      <div className="arrows">
        <Button  className="nav-button" onClick={leftArrowClickHandler}>
          <Button.Content style={{color: 'black', width: '30px'}} >
            <Icon name="caret left" size='large' className="left-arrow"/>
          </Button.Content>
        </Button>
        <Button  className="nav-button nav-button-right" onClick={rightArrowClickHandler}>
          <Button.Content style={{color: 'black', width: '30px'}} >
            <Icon name="caret right" size='large' />
          </Button.Content>
        </Button>
        {/* <div className="left-arrow" onClick={leftArrowClickHandler}>Left</div>
        <div onClick={rightArrowClickHandler}>Right</div> */}
      </div>
    </div>
  );
};

export default NavBar;