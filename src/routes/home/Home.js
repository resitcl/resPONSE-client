

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './Home.css';
import StatWidget from '../../components/Widget';
import Reports from '../../components/Reports';

const title = 'resPONSE liveness tool';

function Home(props, context) {
  context.setTitle(title);
  return (
    <div>
      <Reports></Reports>
    </div>
  );
}

Home.propTypes = {
  // news: PropTypes.arrayOf(PropTypes.shape({
  //   title: PropTypes.string.isRequired,
  //   link: PropTypes.string.isRequired,
  //   contentSnippet: PropTypes.string,
  // })).isRequired,
};
Home.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Home);
