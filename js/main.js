import { adverts } from './data.js';
import { createAdvert, advertsMap, advertsFragment } from './adverts.js';
import './form.js';

createAdvert(adverts[0]);
advertsMap.appendChild(advertsFragment);
