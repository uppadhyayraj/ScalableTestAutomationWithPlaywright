/** 

* Represents a user object as returned by the ReqRes API. 

* 

* This interface defines the structure of a user, including their unique identifier, 

* contact information, and avatar image. It is used throughout the application to 

* ensure type safety when interacting with user data from the API. 

* 

* @see {@link https://reqres.in/api-docs/} for more details on the user schema. 

* 

* @property id - Unique numeric identifier for the user. 

* @property email - The user's email address. 

* @property first_name - The user's first name. 

* @property last_name - The user's last name. 

* @property avatar - URL to the user's avatar image. 

*/

export interface User {
  id: number;

  email: string;

  first_name: string;

  last_name: string;

  avatar: string;
}

/** 

* Represents the request payload for creating a new user. 

* 

* This interface is used when sending a POST request to the `/api/users` endpoint 

* as described in the Reqres API documentation. It contains the necessary fields 

* required to create a user resource. 

* 

* @property name - The name of the user to be created. 

* @property job - The job title or role of the user. 

*/

export interface CreateUserRequest {
  name: string;

  job: string;
}

/** 

* Represents the payload for updating a user's information. 

* 

* This interface is used when sending a request to update an existing user's details 

* via the API (see: https://reqres.in/api/users/{id}). 

* 

* @property name - (Optional) The new name for the user. 

* @property job - (Optional) The new job title for the user. 

* 

* Both fields are optional, allowing partial updates. 

*/

export interface UpdateUserRequest {
  name?: string;

  job?: string;
}

/** 

* Represents the response structure for a paginated list of users. 

* 

* This interface models the response returned by the ReqRes API's `/users` endpoint. 

* It includes pagination details, the list of user data, and additional support information. 

* 

* @property page - The current page number of the results. 

* @property per_page - The number of users returned per page. 

* @property total - The total number of users available. 

* @property total_pages - The total number of pages available. 

* @property data - An array of user objects for the current page. 

* @property support - Additional support information, such as a URL and descriptive text. 

* 

* @see {@link https://reqres.in/api-docs/#/users/get_users} 

*/

export interface UserListResponse {
  page: number;

  per_page: number;

  total: number;

  total_pages: number;

  data: User[];

  support: {
    url: string;

    text: string;
  };
}

/** 

* Represents the payload required to authenticate a user. 

* 

* This interface defines the structure for the login request body, 

* typically used when sending a POST request to the `/login` endpoint. 

* 

* @property email - The user's email address used for authentication. 

* @property password - The user's password. 

* 

* @remarks 

* This interface is based on the API contract described in https://reqres.in/api-docs/#/Users/post_login. 

* It is used to encapsulate the credentials needed for user login. 

*/

export interface LoginRequest {
  email: string;

  password: string;
}

/** 

* Represents the request payload for registering a new user. 

* 

* This interface is used when sending a registration request to the API, 

* such as the `/api/register` endpoint described in https://reqres.in/api-docs/. 

* 

* @property email - The user's email address. This is required for registration. 

* @property password - The user's password. This is required for registration. 

*/

export interface RegisterRequest {
  email: string;

  password: string;
}
