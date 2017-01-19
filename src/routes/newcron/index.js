
import React from 'react';
import Newcron from '../../components/Newcron/';

export default {

  path: '/newcron',

  action({ render, context, error } ) {
    context.setTitle("New Notification");
    return <Newcron />;
  },

};
