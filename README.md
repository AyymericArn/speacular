# Speacular

The MVP for a self-care app, which detects the emotionnal intents in your voice each morning in order to provide a daily advice based on it.

## Get the project running
Clone the repo, cd into it and
```
npm i
```
then 
```
npm run serve
```
## Use Speacular

### Important

Due to some audio encoding differences between browsers, the recorder function may not work as expected everywhere. It is fully functionnal on localhost, Firefox 70, Windows 10 ; you may face an empty recording bug on Chrome. Not tested on linux and mobile for the moment. The bug will be transparent anyway.

To test the project, be sure to have a voice recording device plugged to your machine (a basic webcam mic should do it, as well as the default mic of your phone). Be sure to be online !

* Provide your name so that Speacular can say Hello to you.
* Press the Recorder button. If you're not offline, an inspirationnal quote will appear.
* Read the quote but don't be too long ! Speacular can only treat **10 seconds of recording** to work fine for the moment.
* Let the service process your recording. An advice for the day will be printed according to the dominating mood in your voice !
* Keep track of how well your moods are going through time into Analytics section
* Keep track of the quotes you read in the past in the History section  

## Tests

### Run the end-to-end tests
```
yarn run test:e2e
```

### Run the unit tests
```
yarn run test:unit
```