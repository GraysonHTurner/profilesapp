# AWS Profiles App — Grayson Turner

Implementation of AWS Build a Basic Web Application, Tasks 1–5:
https://docs.aws.amazon.com/hands-on/latest/build-web-app-s3-lambda-api-gateway-dynamodb/build-web-app-s3-lambda-api-gateway-dynamodb.html

## What the app does

- Amplify Authenticator provides email sign-up, verification, sign-in, password reset, and sign-out.
- A Cognito post-confirmation Lambda creates a UserProfile through the AppSync GraphQL API.
- DynamoDB persists the profile. Owner authorization restricts each profile to its signed-in owner.
- The React interface loads the stored email and visibly displays Grayson Turner.

The Lambda uses the current Amplify runtime configuration helper, avoiding the tutorial's separate generated GraphQL mutations. Its resource belongs to the auth group to avoid circular stack dependencies.

## Local development

```sh
npm ci
npx ampx sandbox
npm run dev
```

Configure an AWS profile for local development first. The sandbox generates amplify_outputs.json, which is intentionally ignored by Git. Do not create a placeholder configuration.

## Hosting

The main branch of GraysonHTurner/profilesapp is connected to the existing AWS Amplify app. amplify.yml deploys backend resources, generates configuration, and builds the frontend on each push.

## Task 5 verification and screenshot

1. Open the deployed app or the local development URL.
2. Choose Create Account, enter an email you can receive messages at, and choose a password.
3. Enter the emailed verification code, then sign in if prompted.
4. Verify My Profile, Grayson Turner, and the stored email appear.
5. Capture a screenshot of the browser with the name and profile visible.

Keep AWS resources until the screenshot has been captured. Task 6 cleanup is intentionally not performed.
