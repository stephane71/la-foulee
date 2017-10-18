/**
*
* HelmetIntl
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { injectIntl } from 'react-intl';


function HelmetIntl({ intl, title, content }) {
  return (
    <Helmet>
      <title>{intl.formatMessage(title, title.values)}</title>
      <meta name={`description`} content={intl.formatMessage(content)} />
    </Helmet>
  );
}

HelmetIntl.propTypes = {
  title: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired
};

export default injectIntl(HelmetIntl);
