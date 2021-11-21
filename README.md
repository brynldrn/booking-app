# Getting Started

* Start by cloning the repository `git@github.com:brynldrn/booking-app.git`
* Run `cd booking-app`
* Run `yarn && yarn dev`
* If `yarn` is not installed, kindly check this [guide](https://yarnpkg.com/getting-started/install)
* Open `http://localhost:3000` in your browser

## Notes

* The server used in this project is provided by [Mock API](https://mockapi.io/). Please contact me if any changes are needed in the API.
* If the page is not loading, and no cards are being shown, it might be due to Mock API not responding due to high server load.

## Assumptions and Improvements

* I will really be using a date library to solve time-related problems -- and I did!
* Form validation client-side is like a paper firewall, if I had more time, I could have written my own server and do validations there as well.
* Write a more robust data handling than the confusing single component renderer
* Add JS helpers, especially debounce and throttle, to properly execute network expensive functions
* Write or use a GraphQL mock server rather than using plain REST -- I researched providers but none of them are as performant as the REST Mock API I found so I went with it to consume less time
* Write my own styles and UIs instead -- I used Material UI so I can create it faster

## Credits

* [Material UI](https://github.com/mui-org/material-ui)
* [Next JS Framework](https://github.com/vercel/next.js)