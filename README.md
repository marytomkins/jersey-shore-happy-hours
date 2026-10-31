# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Data: Instagram Reel links (`reel`)

Each restaurant in the Happy Hours gist (`happyHours.json`) can have an optional `reel` field with the URL of the Instagram Reel we posted about it. When it's set, the card (and the map popup) shows a Reel icon. On the website it opens in a new tab; in the iOS/Android app it opens in the Instagram app when installed, otherwise the browser. Every tap sends a PostHog `reel_tap` event with `restaurant`, `town` and `platform` (`web`, `ios`, `android`).

- One Reel per restaurant. To show a newer Reel, replace the URL.
- Accepted: `https://www.instagram.com/reel/<id>/` or `https://www.instagram.com/p/<id>/` (`instagram.com` without `www` works too). Tracking params like `?igsh=...` are stripped automatically, so the "Copy link" URL from Instagram can be pasted as is.
- Anything else (empty, `http://`, a profile link, another site) is ignored and no icon shows.
- Restaurants without a Reel: leave the field out.
- It's read at runtime from the gist, so adding a Reel needs no app update or store review.

```json
{
  "name": "10th Ave Burrito",
  "town": "Belmar",
  "link": "https://tenthaveburrito.com/specials/",
  "reel": "https://www.instagram.com/p/DfFS4hZxZNe/",
  ...
}
```
