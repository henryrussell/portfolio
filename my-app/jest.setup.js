jest.mock('./src/app/globals.css', () => ({})); 
jest.mock('fbjs/lib/warning', () => require('fbjs/lib/emptyFunction'));
