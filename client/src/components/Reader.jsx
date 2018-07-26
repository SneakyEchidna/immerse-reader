import React from 'react';

const Reader = () => (
  <p>
    We create callApi method to interact with our Express API Back-end, then we
    call this method in componentDidMount and finally set the state to the API
    response, which will be Hello From Express. Notice we didn’t use a fully
    qualified URL http://localhost:5000/api/hello to call our API, even though
    our React app runs on a different port (3000). This is because of the proxy
    line we added to the package.json file earlier.
  </p>
);
export default Reader;
