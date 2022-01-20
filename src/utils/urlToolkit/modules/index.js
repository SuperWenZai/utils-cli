import * as commonUrls from './commonUrls';
import * as comsUrls from './comsUrls';
import * as somsUrls from './somsUrls';
import * as oprsUrls from './oprsUrls';

// eslint-disable-next-line import/prefer-default-export
export const urlProjects = {
  comsUrls: {
    ...comsUrls,
    ...commonUrls,
  },
  somsUrls: {
    ...somsUrls,
    ...commonUrls,
  },
  oprsUrls: {
    ...oprsUrls,
    ...commonUrls,
  },
};
