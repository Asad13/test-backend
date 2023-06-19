# test-application

## Steps to run the application

- Download and install Git from [here](https://git-scm.com/download).
- Download and install Node from [here](https://nodejs.org/en). Install version 20.0.0 or above.
- Install the package manager. Run the following command on your terminal/powershell:

  ```bash
  npm i -g yarn@1.22.19
  ```

- Clone the Git repository. Run any of the following command on your terminal/powershell **[Not required if you are using the zip]**:
  - **SSH:** `git clone git@github.com:Asad13/test-backend.git`
  - **HTTPS:** `git clone https://github.com/Asad13/test-backend.git`
- Open terminal/powershell at the same location as your application's directory to run rest of the commands.
- Install all the dependencies. Run the following command on your terminal/powershell:

  ```bash
  yarn install
  ```

- Start the application:

  ```bash
  yarn run dev
  ```

- visit **<http://localhost:3000>** to see your application running.
- To convert **Typescrpt** files to **JavaScript** files in the **dist** folder, run the following command:

  ```bash
  yarn run build
  ```

- To run the application using **Javascript** files instead of **Typescript**, run the following command:

  ```bash
  yarn start
  ```

- To find **API Documentation** visit **<http://localhost:3000/api/docs>** from any browser.
- To get **API Documentation** in **JSON** visit **<http://localhost:3000/api/docs.json>**. You can use
  this data in postman to test API.
- You can see the logs of the application in the **logs** folder in the application directory.
