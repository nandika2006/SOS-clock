## SOS Clock App

## Overview
SOS Clock is a discreet emergency alert application designed to enhance personal safety. Disguised as a clock, it allows users to trigger an SOS alert, capturing video evidence and notifying trusted contacts with their real-time location. The app integrates blockchain to ensure the security and authenticity of captured media.

## Features
- **SOS Alert System:** Sends an emergency message with the user's location to trusted contacts.
- **Automatic Video Capture:** Starts recording video upon SOS activation.
- **Blockchain Integration:** Securely stores media files on IPFS with blockchain verification.
- **Geofencing:** Detects unsafe areas and provides real-time alerts.
- **Anonymous Women’s Community Forum:** A safe space for discussions and support.
- **AI Chatbot Integration:** Provides instant assistance and emergency tips.

## Technologies Used
- **Backend:** Node.js, Express.js, Twilio API
- **Frontend:** Kotlin (Android App Development)
- **Blockchain:** Ethereum, Web3.js, IPFS
- **Database:** Firebase / MongoDB

## Installation
### Prerequisites
Ensure you have the following installed:
- Node.js & npm
- Truffle & Ganache (for blockchain development)
- MetaMask (for Ethereum wallet integration)
- Android Studio (for Kotlin development)

### Setup
#### Backend
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/sos-clock.git
   cd sos-clock
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add your Twilio credentials:
   ```sh
   TWILIO_SID=your_twilio_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   TWILIO_PHONE_NUMBER=your_twilio_phone_number
   ```
4. Start the backend server:
   ```sh
   node server.js
   ```

#### Frontend
1. Open the Kotlin project in Android Studio.
2. Configure dependencies in `build.gradle`.
3. Run the app on an emulator or physical device.

## Blockchain Integration
1. Install Web3 and IPFS client:
   ```sh
   npm install web3 ipfs-http-client
   ```
2. Deploy smart contract:
   ```sh
   truffle migrate --network development
   ```
3. Ensure MetaMask is configured with the correct Ethereum network.

## Usage
1. Open the app and set trusted contacts.
2. In an emergency, press the SOS button.
3. The app will automatically start video capture and send alerts.
4. Videos will be securely stored on IPFS with blockchain verification.

## screenshots/output
terminal code
![image](https://github.com/user-attachments/assets/dc0e2dcd-3896-448c-91b4-436e787fcb29)

output screenshot
![image](https://github.com/user-attachments/assets/cef8a7f3-9f88-4d72-a2b6-2824c7ea0caa)

when double tapped
![image](https://github.com/user-attachments/assets/80e7d180-4581-4389-a076-c1228cb8941b)

sos button
![image](https://github.com/user-attachments/assets/032d55d7-0597-4726-a5d0-0f28286e9dcf)

![image](https://github.com/user-attachments/assets/60b7e5e0-1188-47a4-bbdd-1a046787dafa)

![image](https://github.com/user-attachments/assets/5728b0a0-7ada-431f-b724-e6b37c9198eb)

![image](https://github.com/user-attachments/assets/3831374b-c10d-4ff4-b598-21fd68cdac1c)

![image](https://github.com/user-attachments/assets/0a7a06c8-d967-42e6-8dea-b2695cd65b16)

![image](https://github.com/user-attachments/assets/5724268f-c1c4-46d4-a7a2-b63013703529)

![image](https://github.com/user-attachments/assets/a530689f-363e-490f-ab39-190862746864)

![image](https://github.com/user-attachments/assets/d102634c-f74f-4ef9-b4f1-c1d90914e4cb)

![image](https://github.com/user-attachments/assets/49249b5e-b0f1-43a0-b5e2-8cb5feb0a0c8)

![image](https://github.com/user-attachments/assets/0777dfcf-be0b-448b-94da-0c8215a47f3a)
