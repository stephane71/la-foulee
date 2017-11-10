/**
 *
 * Asynchronously loads the component for StrideEdition
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
