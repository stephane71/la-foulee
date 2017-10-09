/*
 * StridePage Messages
 *
 * This contains all the text for the StridePage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'app.components.StridePage.header',
    defaultMessage: 'This is the StridePage component !',
  },
  informations: {
    id: 'app.containers.Stride.informations',
    defaultMessage: 'Informations',
  },
  strideNotFound : {
    id: 'app.containers.Stride.strideNotFound',
    defaultMessage: 'No events has been found at this adress. Go back to the search page!',
  }
});
