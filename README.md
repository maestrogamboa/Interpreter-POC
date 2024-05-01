# Interpreter App
Interpreter App Submition for the Google Hackathon project
This is a point of concept to solve for the lack of training software available for companies to train and test their interpreters.
For this project, the user can start an assigment, and gets prompted to interpret at certain points of the video. The video pauses and provides the user a reminder of the sentence to interpret.
The interprataton Audio gets converted fron Video/Webm format to WAV to it can be transformed into text by Google Speech to Text Service via API. 
The generated text and the sentence to interpret from the video, are used to validate the interpretation by using VertexAI to prompt Google Gemini-1.5-pro-preview.

# API
This section is for the backend portion of the app

# Project Setup
The project uses Docker for development purposes. Here's how to get setup.
1. Clone the respository
3. Open Docker desktop app or make sure is running in the background
4. in the terminal navitage to the InterpreterAPI folder of your project
   ```bash
   cd InterpreterAPI/
   ```
6. Create docker image
```bash
docker build -t <DockerImageName> .
```
4. Run docker container
```bash
docker run -p 8080:5000 <DockerImageName>
```

#API Reference
To make a request, reference your hostname (ie localhost) with port 8080:
```bash
http://localhost:8080
```


# Front End
This project is for the Front End portion of the ap
# Project Setup
1. Clone the respository
2. In the terminal navigate to the root directory of your project
3. Install Dependencies by running the following command
   ```bash
   npm install
   ```
3. Start the application by running the following command
   ```bash
   npm start
   ```



