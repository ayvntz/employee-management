

# Employee Management System
https://ayvntz.github.io/employee-management/

A **React-based Employee Management System** built with **React**. This app allows users to manage employee records, such as names, birthdays, salaries, and addresses, with validation and API integration for CRUD operations.

---

## Features

- Add, update, and save employee records.
- Integrated validation using `react-hook-form` and `Yup`.
- Real-time salary updates using a range slider.
- API integration for fetching and saving employee records.
- Simple and clean UI with error handling and validation feedback.

---

## Technologies Used

- **Vite**: For fast and optimized development builds.
- **React**: Frontend framework.
- **Axios**: HTTP client for API communication.
- **react-hook-form**: Form management and validation.
- **Yup**: Schema-based validation.
- **CSS**: For styling.

---

## Getting Started

Follow the instructions below to clone, run, and deploy the application.

---

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/employee-management.git
cd employee-management
```

Replace `<your-username>` with your GitHub username.

---

### 2. Install Dependencies

Ensure you have [Node.js](https://nodejs.org/) installed. Run:

```bash
npm install
```

---

### 3. Run the Application Locally

To start the development server:

```bash
npm run dev
```

The app will be available at:

```
http://localhost:5173
```

---

### 4. Build the Application for Production

To create a production-ready build, run:

```bash
npm run build
```

The build files will be generated in the `dist` folder.

---

### 5. Deploy the Application to GitHub Pages

1. Update the `vite.config.js` file to include your GitHub repository name:

   ```javascript
   export default defineConfig({
     plugins: [react()],
     base: '/<your-repo-name>/', // Replace with your repository name
   });
   ```

2. Add the following scripts to `package.json` if not already added:

   ```json
   "scripts": {
     "build": "vite build",
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. Deploy the app with:

   ```bash
   npm run deploy
   ```

This app is live at:

```
https://ayvntz.github.io/employee-management/
```

---

## API Endpoints

The application uses the following API endpoints:

1. **Get Employee Records**  
   **GET** `/api/Record/GetRecords`  
   Fetches the list of employee records.

2. **Save Employee Records**  
   **POST** `/api/Record/SaveRecords`  
   Saves the updated employee records.

   **Request Body Format**:

   ```json
   [
     {
       "Name": "John Doe",
       "DateOfBirth": "1990-01-01",
       "Salary": 50000,
       "Address": "123 Main St"
     }
   ]
   ```

---

## Project Structure

```plaintext
employee-management/
├── public/                # Static assets
├── src/
│   ├── components/        # Reusable components
│   ├── styles/            # CSS files
│   ├── App.jsx            # Main React component
│   ├── main.jsx           # React DOM render
│   └── vite.config.js     # Vite configuration
├── package.json           # Project metadata and dependencies
└── README.md              # Project documentation
```

---

## Troubleshooting

1. **Node.js Version Issues**: Ensure you’re using Node.js version >= 14.
2. **API Connectivity**: Verify the `API_BASE_URL` points to the correct API server.
3. **GitHub Pages Deployment Issues**: Clear previous deployments with:

   ```bash
   gh-pages-clean
   ```
