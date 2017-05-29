# Progressive Web Apps

Web apps with the right vitamins so it looks and behaves like a native app

## Main Technology pieces
The two main pieces of a progressive web app (pwa)

 1. Service Worker: JS code that sits between the browser and the network and acts as a proxy or a cache to serve up
 assets quickly instead of waiting on the network. Can be woken up on certain events to provide push notifications to 
 the user. 
 1. Web app Manifest file: Allows the developer to specify how the PWA appears to the users as native apps and how they
 can launch it.
 
## Structure
In a PWA, the application is divided into the `Application Shell` and the `Application Content`. Essentially these are
the parts of the web app that are mostly fixed and the parts that are dynamic respectively

### Application Shell
The app shell is minimum amount of html, css and js that is required to power the user interface of a PWA. This will 
have fixed data and typically consists of the title, the header bar, the navigation bar etc. Its first load should be
very quick and subsequent loads must always be from the cache. It is the core component of the app that provides 
meaningful visual pixels to get in front of the user immediately to keep the user engaged without getting any data
 
The app shell architecture states that you use service workers to cache the app shell and all of its static resources
to provide near instant rendering of the shell, before you start to fetch any data. This results in your app loading in
stages, and your user seeing something immediately, rather than waiting on a blank screen until data appears.

Typically the app shell should contain
 1. Some of Html, css, images and JS
 2. None of the data
 
### Application Content
This the part of your app that is data driven and is entirely dynamic often differing from user to user. To load the
content you would typically make an asynchronous network call to retrieve the data and once it arrives render your DOM
dynamically based on that data.

## Rendering
Rendering content in a PWA is done using a technique that is a hybrid of server side rendering and ajax calls.

**Server Side Rendering**: This is similar to the way JSPs function where the final HTML DOM is built on the server
and is sent for rendering on the UI. The issue here is data on the front end can quickly get stale if you send back
"ready-made" html from the server. Not to mention the mixing of concerns where the server side is handling the rendering
and the formation of the html DOM which is typically the job of the browser.
 
**AJAX Calls**: The main problem with the AJAX calls, is that it requires an extra http AJAX call on page load. 
Specifically, it needs too wait for the Javascript to load, and then would make another ajax call to get the data, only
then would the content actually appear. This causes a delay in app rendering.

**Hybrid approach**: The hybrid approach has the server injecting the initial data as a JS object right in the Javascript. So when the 
javascript is returned back, it includes the data required to render the initial application content. This eliminates 
the extra request for JSON data on page load and also the data is provided separately from any html rendering. It
does require the JS code to load before this data can be read and the initial DOM formed though.

As an additional speed boost, the web app uses the browsers local database storage apis. Note this is not local storage,
but in fact some other library like `localfarage`. These libs can be used to store things like the users preferences or 
other such data, that can be loaded direct from the browser on repeat visits rather than via remote network calls.

## Service Workers

In laymans terms, a service worker is a javascript file that runs in the background and that has its own event loop. 
Because it runs in the background it does not need the webpage to be open and it can respond to events fired either from
the browser or by the network. For PWAs, where it really shines is in its ability to intercept network calls and provide
content to the browser like a local cache. They can also respond to push notifications sent directly from the server while
the app is offline. The service worker will sit between the app, and the server and intercept calls to the server and respond to the client.

Note that the service worker requires the app to be loaded via https (secure connection), with the only exception being
for apps served via localhost. This is to provide confidence that the service worker that has been installed hasn't been
tampered with en-route across the network.

Service workers are `registered`, at a particular url path. `.register("/path/sw.js")` will get the service worker involved
in all requests under the context /path. Similarly registering the sw at / (origin), will involve the service worker 
in all remote requests for this site.




