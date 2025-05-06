# File Upload and Sharing App

This project is a file upload and sharing application that allows users to upload files via a drag-and-drop interface, view uploaded files, and manage them with options to download or delete. The application is built with a React frontend and an Express backend.

## Features

- Drag-and-drop file upload interface
- File type restrictions
- Upload progress indicators
- Options to download or delete uploaded files
- Integration with a backend for file storage and retrieval

## Project Structure

```
file-upload-sharing-app
├── backend
│   ├── controllers
│   │   └── fileController.js
│   ├── models
│   │   └── fileModel.js
│   ├── routes
│   │   └── fileRoutes.js
│   ├── services
│   │   └── fileService.js
│   ├── app.js
│   └── package.json
├── frontend
│   ├── public
│   │   └── index.html
│   ├── src
│   │   ├── components
│   │   │   ├── FileUpload.js
│   │   │   ├── FileList.js
│   │   │   └── ProgressBar.js
│   │   ├── styles
│   │   │   └── App.css
│   │   ├── App.js
│   │   ├── index.js
│   │   └── api
│   │       └── fileApi.js
│   └── package.json
├── README.md
└── .gitignore
```

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the backend directory and install dependencies:
   ```
   cd backend
   npm install
   ```

3. Navigate to the frontend directory and install dependencies:
   ```
   cd ../frontend
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```
   cd backend
   node app.js
   ```

2. Start the frontend application:
   ```
   cd ../frontend
   npm start
   ```

### Usage

- Open your browser and navigate to `http://localhost:3000` to access the application.
- Use the drag-and-drop area to upload files.
- View the list of uploaded files and use the provided options to download or delete them.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License

This project is licensed under the MIT License.