# music-library-api
Music Library Management API that allows users within an organization to manage their collection of Artists, Tracks, and Albums. Each organization has a single Admin who oversees the system and its users. The API also provides functionality for users to mark their favorite Artists, Albums, and Tracks for quick access and personalization.
Project Overview:
What the API does (e.g., "A Music Library Management API to manage users, artists, albums, tracks, and favorites").
Endpoints:
List all endpoints, their HTTP methods, and request/response formats.
Example:
markdown
Copy code
### Create Artist
- **URL**: `/api/v1/artists`
- **Method**: `POST`
- **Headers**:
  - Authorization: Bearer `<JWT Token>`
- **Body**:
  ```json
  {
      "name": "Adele",
      "grammy": true,
      "hidden": false
  }
Response:
json
Copy code
{
    "message": "Artist created successfully",
    "artist": {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "name": "Adele",
        "grammy": true,
        "hidden": false
    }
}
Copy code
Setup Instructions:
How to clone and run the project locally.
Example:
markdown
Copy code
### Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/prajwalbr1110/music-library-api.git
Install dependencies:
bash
Copy code
npm install
Run the server:
bash
Copy code
npm start
Copy code
Environment Variables:
List all required .env variables and their purposes.
