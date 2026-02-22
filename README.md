Student Management System
A modern, interactive React application for managing student records. Features a beautiful UI with a hero carousel, glass‑morphism forms, and a responsive data table. Perfect for learning CRUD operations with a mock backend.

✨ Features
View Students – Table with alternating row colors, sticky header, and hover effects.

Add Student – Glass‑morphism form with background image and validation.

Edit Student – Pre‑populated form to update existing records.

Delete Student – Centered confirmation modal with blur backdrop.

Hero Carousel – Auto‑playing image carousel (pauses on hover) with manual controls.

Fully Responsive – Works seamlessly on mobile, tablet, and desktop.

🛠️ Technologies Used
React (with Hooks)

React Router DOM – Navigation

Axios – HTTP requests

Tailwind CSS – Styling

JSON Server – Mock REST API (optional)

🚀 Getting Started
Prerequisites
Node.js (v16 or higher)

npm or yarn

JSON Server (if using the provided mock backend)

Installation
Clone the repository

bash
git clone https://github.com/your-username/student-management.git
cd student-management
Install dependencies

bash
npm install
Start the JSON Server (if using the mock backend)

bash
npx json-server --watch db.json --port 8080
Make sure db.json exists with an initial students array. Example:

json
{
  "students": [
    { "id": 1, "name": "John Doe", "email": "john@example.com", "address": "New York" }
  ]
}
Start the React development server

bash
npm run dev
The app will be available at http://localhost:5173.

📸 Screenshots
Add your own screenshots here. Below are placeholders.

List Page with Carousel	Add Student Form
https://./screenshots/list-page.png	https://./screenshots/add-student.png
Edit Student Form	Delete Confirmation Modal
https://./screenshots/edit-student.png	https://./screenshots/delete-modal.png
📁 Project Structure
text
frontendapp/
├── public/
│   └── assets/          # Hero images (Image1.jpg, Image2.jpg, Image3.jpg)
├── src/
│   ├── Components/
│   │   ├── ListOfData.jsx        # Main table with carousel
│   │   ├── PostDataUsing.jsx     # Add student form
│   │   ├── EditComponent.jsx     # Edit student form
│   │   └── ...                   # Other components
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
└── README.md
📄 API Endpoints (Mock)
Method	Endpoint	Description
GET	/students	Get all students
GET	/students/:id	Get a single student
POST	/students/save	Add a new student
PUT	/students/edit/:id	Update a student
DELETE	/students/:id	Delete a student
🎨 Customization
Background Image – Replace the backgroundImage URLs in each component with your own local paths (e.g., /assets/your-image.jpg).

Carousel Images – Update the heroImages array in ListOfData.jsx with your own image URLs.

Colors – Modify Tailwind classes to match your brand (e.g., change from-indigo-600 to-purple-600 in the table header).

🤝 Contributing
Contributions, issues, and feature requests are welcome!
Feel free to open an issue or submit a pull request.
