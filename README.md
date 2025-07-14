# Contact List Manager

The **Contact List Manager** is a full-stack web application that helps users efficiently manage their contacts. It features a **Flask-based backend API** for data persistence and a **React.js frontend** for a dynamic and responsive user interface. Users can add, view, search, and delete contacts with a professional and user-friendly experience, including proper notifications and confirmation dialogs.

-----

## Features

  * **Add Contacts**: Easily add new contacts with name and email.
  * **View Contacts**: Display all contacts in a paginated list.
  * **Search Contacts**: Filter contacts by name or email using a search bar.
  * **Delete Contacts**: Securely remove contacts with a confirmation dialog.
  * **Notifications**: User-friendly alerts for successful operations or errors.
  * **Pagination**: Navigate through large lists of contacts efficiently.
  * **Responsive Design**: A clean and intuitive user interface.

-----

## Technologies Used

### Backend (Flask)

  * **Python**: Core programming language.
  * **Flask**: Lightweight web framework for the API.
  * **Flask-CORS**: Handles Cross-Origin Resource Sharing for frontend communication.
  * **Flask-SQLAlchemy**: ORM for interacting with the database.
  * **PostgreSQL**: For robust data management.


### Frontend (React.js)

  * **React.js**: JavaScript library for building user interfaces.
  * **HTML/CSS**: For structuring and styling the application.
  * **JavaScript (ES6+)**: For frontend logic and interactivity.

-----

## Setup and Installation

To set up and run the project locally, follow these steps:

### Prerequisites

  * **Python 3.8+**
  * **PostgreSQL**
  * **Node.js 14+** and **npm** (or Yarn)
  * **Git**

### 1\. Clone the Repository

```bash
git clone <your-repository-url>
cd contact-list-manager
```

### 2\. Backend Setup

##### 2.1. Navigate to the backend directory:

```bash
cd backend
```

##### 2.2. Create a Virtual Environment (Recommended):

```bash
python -m venv venv
```

##### 2.3. Activate the Virtual Environment:

```bash
source venv/bin/activate  # On Unix or macOS
venv\Scripts\activate     # On Windows
```

##### 2.4. Install Dependencies:

```bash
pip install -r requirements.txt
```

##### 2.5. Create a database "contact_manager" using pgAdmin interface:


##### 2.6. Run the Backend Server:

```bash
python app.py
```

### 3\. Frontend Setup

##### 3.1. Navigate to the frontend directory:

```bash
cd frontend
```

##### 3.2. Install Dependencies:

```bash
npm install
```

##### 3.3. Run the Frontend Server:

```bash
npm start
```

##### 3.4. Open Your Browser:

Open your web browser and navigate to `http://localhost:3000` to see the application in action.

-----

### Usage

1.  **Add Contacts**: Use the "Add New Contact" form to add names and email addresses.
2.  **View Contacts**: All added contacts will appear in the list below. Use the pagination controls to navigate through pages.
3.  **Search Contacts**: Type in the search bar to filter contacts by name or email.
4.  **Delete Contacts**: Click the "Delete" button next to a contact. A confirmation dialog will appear. Click "Delete" again to confirm or "Cancel" to abort.
5.  **Notifications**: Watch for green success messages or red error messages at the top of the page.

-----

## Solution Explanation and Trade-offs

### Backend (Python/Flask)

  * **Framework Choice**: **Flask** was chosen for its lightweight nature and flexibility, making it ideal for a small-scale RESTful API.
  * **Database**: **PostgreSQL** is used for simplicity in local development, offering easy setup and can also be used in production environment.
  * **ORM**: **Flask-SQLAlchemy** provides an elegant ORM, abstracting database interactions and promoting clean code.
  * **Search Logic**: Implemented with `ilike` for case-insensitive partial matching, ensuring flexible search capabilities.
  * **Error Handling**: Basic error handling is in place for common issues (e.g., missing fields, duplicates), returning appropriate HTTP status codes.
  * **Trade-offs**:
      * **No Authentication/Authorization**: Not implemented to keep the scope focused on core functionality. This would be essential for a production application.
      * **No Migrations**: Database schema changes are handled by `db.create_all()`. For larger projects, a migration tool (e.g., Flask-Migrate) is recommended.

### Frontend (React.js)

  * **Framework Choice**: **React** was selected for its component-based architecture, which enhances modularity, reusability, and maintainability of the UI.
  * **State Management**: Utilizes React's `useState` and `useEffect` hooks for local component state and side effects. For complex state, a dedicated library (e.g., Redux, Zustand) might be considered.
  * **Data Fetching**: Standard `fetch` API is used for asynchronous communication with the backend.
  * **Dynamic UI**: The contact list updates dynamically based on user actions (add, delete, search, pagination) for a responsive feel.
  * **Custom UI Elements**: Replaced native browser `alert()` and `confirm()` with custom notification and confirmation dialog components for a more integrated and polished user experience.
  * **Trade-offs**:
      * **Basic Styling**: Uses plain CSS. For more complex designs or rapid UI development, a CSS framework (e.g., Tailwind CSS, Bootstrap) or a component library (e.g., Material-UI) could be used.
      * **No Client-Side Routing**: As it's a single-page application, a client-side router (e.g., React Router) was not necessary.

-----

## Contributing

Contributions are welcome\! If you have suggestions or improvements, please:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add new feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.
