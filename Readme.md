# LUMSafar

A social hub application for LUMS students. 

Developed using: 
- [Expo](https://github.com/expo/expo)
- [Node](https://github.com/nodejs/node)
- [Express](https://github.com/expressjs/express) 
- [MongoDB](https://www.mongodb.com/)
- [NativeBase](https://github.com/GeekyAnts/NativeBase)

# Build and Deployment Status 
![Client EAS Build](https://github.com/AhsanSarwar45/LUMSafar/actions/workflows/client-eas-build.yml/badge.svg)
![Server Build and Test](https://github.com/AhsanSarwar45/LUMSafar/actions/workflows/server-build-and-test.yml/badge.svg)
![Heroku Deployment](https://pyheroku-badge.herokuapp.com/?app=lumsafar&path=/test&style=flat)

# Setting up dev environment

## Requirements

- PC running Windows/Mac/Linux
- [NodeJS](https://nodejs.org/en/download/)
- Expo CLI `npm install --global expo-cli`
- Nodemon (Optional) `npm install -g nodemon`

## Steps

1. Clone the repository to local machine using
```git clone https://github.com/AhsanSarwar45/LUMSafar```.
2. Open the cloned directory in VSCode either manually or using ```code LUMSafar```.
3. Create an `.env` file in the `client/` directory and add `LUMSAFAR_SERVER_URL='http://<your ipv4 address>:3001'`.

### Client


1. Navigate to client directory using `cd client`.
2. Install required packages using ```npm ci```. Go watch Better Caul Saul while your computer does its thing.
3. Start Expo using `expo start`. Duh. `npm start` also works.

### Server

1. Navigate to client directory using `cd server`.
2. Install required packages using `npm ci`.
4. Start the server using `npm run start`, or if you have nodemon `npm run start-n`. With nodemon, the server gets automatically restarted when you save any changes.


# Running the Client

After running `expo start`, you can run the client either on a physical device or an emulator. The app will reload automatically when you save any changes.

### Physical Device
1. Download Expo Go app on your smartphone.
2. Open developer tools at ```http://localhost:19002/``` in your browser.
3. Scan the QR code using Expo Go app.

### Emulator
1. Download [Android Studio](https://developer.android.com/studio).
2. Install an AVD Device. Refer to [this](https://developer.android.com/studio/run/managing-avds) guide.
3. Start the AVD Device.
2. After running `npm start`, press <kbd>A</kbd> and Expo will start the app on the emulator.


