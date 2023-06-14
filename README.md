# Link Shortener with SSRF Vulnerability Demo

## Description

This is a simple project that demonstrates a Server Side Request Forgery (SSRF) vulnerability in a Link Shortener application. The application is built using React.js for the frontend, Node.js and Express.js for the backend, and MongoDB for the database.

## How to launch the application

1. Clone the repository
2. Install Node.js and MongoDB if you haven't already.
3. Install dependencies:

```
cd link-shortener-ssrf-demo
npm install
cd client
npm install
```

4. Launch the MongoDB service:

```
mongod
```

5. Run the backend and frontend separately:

-   For the backend, in the root folder of the project, run:
    ```
    npm start
    ```
-   For the frontend, in the client folder, run:
    ```
    npm start
    ```

6. The frontend application should be accessible at `localhost:3000`, and the backend API at `localhost:5000`.

## Demonstrate the SSRF vulnerability

1. Start the application.
2. Create a new link by providing a name and a `file://` URL.
3. Use the "View content of the URL" button to fetch the content of the URL. If the URL points to a local file, the content of the file will be displayed.

## ⚠️ WARNING - Security Risks ⚠️

This application is intentionally vulnerable to SSRF for demonstration purposes, and should NEVER be used in a production environment. Handling `file://` URLs or any user-supplied URLs can lead to serious security issues such as SSRF or Local File Inclusion (LFI). This can allow attackers to make requests to internal resources, read local files, or perform other malicious actions.

## License

This project is licensed under the MIT License.
