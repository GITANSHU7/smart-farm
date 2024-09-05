import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "mongodb",
  host: "mongodb+srv://gitanshu:qaz121wsx@omr.bdcleek.mongodb.net/?retryWrites=true&w=majority&appName=omr",
  port: 3306,
  database: "omr",
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

export default AppDataSource;
