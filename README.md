This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### This project is deployed on firebase

Please visit https://meldcx-codetest.firebaseapp.com to check, use any email and password "meld123".
If "Something's wrong with the backend" message is shown, the login request is blocked because the browser thinks this page is fetching request from unauthenticated sources. If you are using Chrome, to the right side of the address bar, there's a shield like icon (with red cross), click it , and click "Load unsafe scripts".

### Run this project locally

1. git clone https://github.com/AllenZhang-yz/meldcx-codetest.git
2. Open with VS Code or any IDE
3. run "npm install"
4. run "npm start"
5. Open (http://localhost:3000) to view it in the browser.

### Run Test

1. Open with VS Code or any IDE
2. npm run test

### Functionality of this App

1. Login in with any email and password "meld123".
2. If password is wrong, error message is shown for 2 seconds.
3. If any other error messages get from backend, error message is shown for 2 seconds.
4. After logging in, device numbers are refreshed every 5 seconds.
5. The circles orbit around the number and the number of circles shown equal the number of active devices.
6. Click Log out button to log out.
7. Notify MeldCX

### Skills used in this App

React, React-Router PropTypes Lazyloading styled-components axios Jest Enzyme Firebase
