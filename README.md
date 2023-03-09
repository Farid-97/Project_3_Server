# Project Name
​
<br>
​
# Quick Compo
​
<br>
​
## Description
​
This is an app to search for ideas of whatever you want. You can post pictures gifs or videos of any work that you have done, any example or display of your living room that you would like to share with the world, you can share whatever you want.
​
## User Stories
​
-  **404:** As a user I get to see a 404 page with a feedback message if I try to reach a page that does not exist so that I know it's my fault.
-  **Signup:** Signup and being redirected to the login page so you can access the app
-  **Login:** As a user I can login to the platform so that I can access my profile and fill my personal information.
-  **Logout:** As a logged in user I can logout from the app so no one else use it.
-  **Profile Page**: As a logged in user I can visit my profile page so that I can access the edit page and see my personal information, change my profile picture, you can also see your albuns created and images that you have added.
-  **Add New Post:** As a logged in user i can add a new post, with a image, title, description and a various tags so they can be found more easily.
-  **Edit Post:** As a logged in user i can edit a post i created. 
-  **User Initial Page:** As a logged in user i can see all the Post created by all the users.
-  **Home Page:** As a user I want to see what it is available in this website.
​
​
​
​
## Backlog
​
- sort by tags
​
​
<br>
​
​
# Client / Frontend
​
## React Router Routes (React App)
​
| Path                         | Component            | Permissions                | Behavior                                                  |
| ---------------------------- | -------------------- | -------------------------- | --------------------------------------------------------- |
| `/login`                     | LoginPage            | anon only `<AnonRoute>`    | Login form, navigates to home page after login.           |
| `/signup`                    | SignupPage           | anon only  `<AnonRoute>`   | Signup form, navigates to home page after signup.         |
| `/`                          | HomePage             | public `<Route>`           | Home page.                                                |
| `/user-profile`              | ProfilePage          | user only `<PrivateRoute>` | User profile for the current user.             |
| `/user-profile/edit`         | EditProfilePage      | user only `<PrivateRoute>` | Edit user profile form.                                   |
| `/post/add`           | CreatePostPage | user only `<PrivateRoute>` | Create new Post form.                               |
| `/initialPage`               | PostListPage   | user only `<PrivateRoute>` | Post list.                                         |
| `/post/:postId` | PostDetailPage | user only `<PrivateRoute>` | Post details. Shows post details, title, description and the image of the post and who posted it. |
| `/profile/:id`    | SpecificProfile  | user only `<PrivateRoute>` | Specific person profile with all the content he/she posted until now.                                    |
​
​
​
​
​
## Components
​
Pages:
​
- LoginPage
​
- SignupPage
​
- HomePage
​
- ProfilePage
​
- EditProfilePage
​
- AddPost
​
- EditPost
​
- SpecificProfile
​
- InitialPage
​
​
  
​
Components:
​
- Navbar
- SearchBar
- FollowButton
- FavButton
- CommentInput 
​
​
## Services
​
- **Auth Service**
​
  - `authService` :
    - `.login(user)`
    - `.signup(user)`
    - `.logout()`
    - `.validate()`
​
- **User Service**
​
  - `userService` :
    - `.updateCurrentUser(id, userData)`
    - `.getCurrentUser()`
​
- **Post Service**
​
  - `postService` :
    - `.createpost(postData)`
    - `.getPost()`
    - `.getOnePost(id)`
    - `.updatePost(id, postData)`
    - `.deletePost(id)`
​
- **Profile Service**
​
  - `profileService` :
    - `.getUserDetails(id)`
​
  
​
​
​
<br>
​
​
# Server / Backend
​
​
## Models
​
**User model**
​
```javascript
{
  username: {type: String, required: true, unique: true}
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
	post: { type: Schema.Types.ObjectId, ref:'Post' },
  favourites: [ { type: Schema.Types.ObjectId, ref:'Post' } ]
  following:[{type: Schema.Types.ObjectId, ref:'User'}]
}
```
​
​
​
**Post model**
​
```javascript
 {
   title: { type: String, required: true },
   img: { type: String, required: true},
   description: { type: String },
   tags: {type: [String], required: true}
   comments: [{type: Schema.Types.ObjectId, ref:'Comment'}]
}
```
​
​
​
**Comments model**
​
```javascript
{
  userId: [{type: Schema.Types.ObjectId, ref:'User'}],
  comment: {type:string, required: true}
}
```
​
​
​
​
<br>
​
​
## API Endpoints (backend routes)
​
| HTTP Method | URL                    | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | ---------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/auth/profile    `    | Saved session                | 200            | 404          | Check if user is logged in and return profile page           |
| POST        | `/auth/signup`         | {name, email, password}      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`          | {username, password}         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/auth/logout`         |                              | 204            | 400          | Logs out the user                                            |
| GET         | `/api/posts`     |                              |                | 400          | Show all posts                                         |
| GET         | `/api/post/:id` |                              |                |              | Show specific post                                     |
| POST        | `/api/post`     | { title, img, description, tags }       | 201            | 400          | Create and save a new post                             |
| PUT         | `/api/post/:id` | { title, description, tags }       | 200            | 400          | edit post                                              |
| DELETE      | `/api/post/:id` |                              | 201            | 400          | delete post                                            |
| GET         | `/api/person/:id`     |                              |                |              | show specific person                                         |                                                 |
| PUT         | `/api/profile/:id`     | { username, password }                | 201            | 400          | edit personal information                                                  |
​
​
<br>
​
## API's
none
​
<br>
​
## Packages
​
​
<br>
​
​
## Links
​
### Trello/Kanban
​
[Link to your trello board](https://trello.com/b/PBqtkUFX/curasan) or a picture of your physical board
​
### Git
​
The url to your repository and to your deployed project
​
[Client repository Link](https://github.com/screeeen/project-client)
​
[Server repository Link](https://github.com/screeeen/project-server)
​
[Deployed App Link](http://heroku.com)
​
### Slides
​
[Slides Link](http://slides.com) - The url to your *public* presentation slides
​
### Contributors
​
FirstName LastName - <github-username> - <linkedin-profile-link>
​
FirstName LastName - <github-username> - <linkedin-profile-link>
