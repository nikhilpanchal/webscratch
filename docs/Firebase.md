# Firebase Hosting

## Deploying 
Deploying the project to firebase is pretty simple. Once you have your project developed, and a production build run
just run through the following steps to deploy the project to firebase

 * Install firebase `npm install -g firebase-tools`
 * Login to firebase `firebase login`
 * Initialize the project `firebase init`
   * Choose the *Hosting: Configure and deploy Firebase Hosting sites* option by using the down arrow and hitting the
   space key to select it
   * The next step is important: Set the public directory. Select the directory that contains the production build of the
   resources of your app
   * Choose not to overwrite index.html in the next couple of steps
 * Create a firebase project by going to console.firebase.google.com
 * Use the created project `firebase use --add`
 * Deploy the project `firebase deploy`
 
Thats it !  