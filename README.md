# About

This is the corresponding repository to article on [how to set up AppSync with offline support and react hooks](https://dev.to/willsamu/how-to-get-aws-appsync-running-with-offline-support-and-react-hooks-678).

## Setup

```
git clone https://github.com/willsamu/appsync-offline-mutations.git && cd appsync-offline-mutations
```

```
npm install -g @aws-amplify/cli expo-cli
```
[Configure global amplify settings](https://docs.amplify.aws/cli/start/install#install-the-amplify-cli) with `amplify configure`

In the `appsync-offline-mutations` directory, initialize the amplify project:
```
amplify init
```
Add a Cognito User Pool with default settings:
```
amplify add auth
```
Attach a GraphQL API (default settings / todo schema) to it:
```
amplify add api
```
Finally run 
```
amplify push
```
Install dependencies using `npm install` or `yarn install`. 

Start the the project on an emulator or on your mobile device using the Expo app ([IOS](https://apps.apple.com/de/app/expo-client/id982107779) / [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)):

```
expo start
``` 
