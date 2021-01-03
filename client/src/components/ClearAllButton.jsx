import React from 'react';
import {Icon} from 'semantic-ui-react';

function ClearAllButton({clearAllClickHandler}) {
  return (
    <div className="clear-filter" onClick={clearAllClickHandler}>
      Clear All <Icon className='clear-filter-x' circular color='white' size='tiny' name='close' />
    </div>
  );
}

export default ClearAllButton;