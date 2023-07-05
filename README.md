# NC-News React App

## Introduction

The NC-News React App is a front-end implementation of a news app that interacts with the [NC-News API](https://github.com/juliaozm/project-news), which serves as the backend for this application. This React app was developed as part of my studies at Northcoders coding bootcamp.

The API is hosted on a **free provider** [render.com](https://julia-ozmitel-backend-project.onrender.com/api). Please note that it **may take up to a minute to serve the first request** as the server needs to spin up. Subsequent requests should be faster.

#### DEMO: The app is live at [NC-News Front-End App](https://juliaozm.netlify.app)

## Features

#### Article Filters:

- Filter articles by selecting a topic from the dropdown menu. Topics are fetched dynamically from the API.
- Sort articles by date, votes, or comments by selecting a sorting option.
- Toggle between ascending and descending order for the selected sorting option.

#### Article Pagination:

- Control the number of articles displayed per page with options for 6, 10, or 24 articles.
- Easily navigate through pages with a current active page indicator and "next" / "prev" buttons.

#### Shareable URL:

- The URL in the address bar updates dynamically based on the chosen topic, sorting, and ordering options.
- Share the URL with others to provide a direct link to a specific article configuration.

#### View Article:

- Each article is displayed with an accompanying image and provides information about the author, topic, date of creation, number of comments, and votes.
- Logged-in users can upvote or downvote articles to express their preference.
- List of comments is associated with each article.

#### List of Comments:

- Logged-in users can post and delete their own comments.
- Users can upvote or downvote individual comments.
- Comment additions and deletions are optimistically rendered on the page.

#### User Authentication:

- Users can register with unique and valid email, username, and password.
- Users can log in using their email and password, which match existing user data in the database.
- Users also have the option to log in using their Google account via the Firebase API.

#### JWT Authentication and Authorization

- Upon successful login or registration, the server generates a JWT that contains user-specific information like username, email, and avatar.
- JWT is used for accessing protected API endpoints. When making API requests to them, the React app includes the JWT in the Authorization header of HTTP requests as follows: `Authorization: Bearer {JWT}`
- The access token, which is used for authentication, has a short expiration time of `30 seconds`. Similarly, the refresh token, used for obtaining new access tokens, expires after `15 minutes`.

## Technologies Used

| Technology       | Version | Description                                                      |
| ---------------- | ------- | ---------------------------------------------------------------- |
| react            | 18.2.0  | Used for building user interfaces                                |
| axios            | 1.3.2   | Used for sending async HTTP requests and handling responses      |
| firebase         | 9.22.2  | Enables user authentication using their existing Google accounts |
| jwt-decode       | 3.1.2   | Used to decode JWT tokens                                        |
| react-dom        | 18.2.0  | Provides DOM-specific methods for React                          |
| react-router-dom | 6.8.0   | Provides routing in React applications                           |
| react-icons      | 4.7.1   | Provides high-quality, customizable icons for React              |
| react-inlinesvg  | 3.0.2   | Used for inline SVG in React                                     |
| react-select     | 5.7.3   | Used for styling select input component for React                |
| react-toastify   | 9.1.1   | Provides toast notifications for React                           |
| tailwindcss      | 3.3.2   | A CSS framework used for rapid UI development                    |

## Getting started

1. Clone the repository:

```
git clone https://github.com/juliaozm/nc-news.git
```

2. Navigate to the project directory:

```
cd nc-news
```

3. Install dependencies:

```
npm install
```

4. Start the development server:

```
npm start
```

5. Open your browser and visit `http://localhost:3000` to see the application running.

6. In the end build the app for production to the `build` folder

```
npm run build
```

Your app is ready to be deployed!

## Created by

#### [GitHub @juliaozm](https://github.com/juliaozm)
