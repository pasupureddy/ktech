
how to load the app

 cd /frontend
    python3 -m http.server 8000

 cd /bacnekd 
   node app.js  


DB setup

vi docker-compose.yaml
docker-compose up -d
 npx sequelize-cli init
  npm install sequelize pg pg-hstore
  npx sequelize-cli init
  npx sequelize-cli model:generate --name User --attributes name:string,email:string,password:string,role:string

  npx sequelize-cli migration:generate --name add-user-validations