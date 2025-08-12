# ExpertSoft
Its a program made to help a side to manage better their transactions and bills because they where using Excel sheets to maintain this and that was too difficult to read

# The setup
First things first youll need to install node in your computer, I made a tutorial in my other repository called development test

After that youll need to execute the following commands in the project
```
npm init -y


npm install dotenv mysql2 express cors csv-parse fs path
```
Afer that the project should be ready to start, just go to the folder that contains the api.js and execute **node api.js** 

Also execute the .sql archive im uploading to have the same database, just open your gestor and paste it there, if you want to upload csv files you will need to edit the load_csv file

# Used technologies

In this project I used MySQL workbench to make the database and connected it with javascript (the endpoints function perfectly but im still struggling with the frontend functionality)
I used Node to simulate the server in the project and all the libraries to parse and connect listed above

# Normalization

In the repository there is a file with the normalization, I just separated it in entities because there wasnt any duplicates, also I separated the addess because there were like 2 address in the same cell and was making problems at uploading, I made a middle table for transactions and bills because maybe in a strange case someone can pay more bills in one transaction, and not pay all the bill in the transaction, so it could have made a problem in the future

# To charge CSV
There is a file called load_csv.js, all you need to do is to change the names from the files in the list, the first list is to estipulate an order to make sure the strong tables charges first, after that the object is to execute the command when he finds the file, youll need to change the variables and the query to make sure this functions, but thats all, it would make the work for all the files

# Advanced querys

In the api.js there are 2 querys that arent linked to anything, is because they were asked, but are basically querys with conditionals and join, being the first one a way to see all the money spend from a client in all his transactions, the second one is to see all the pending transactions with all the information of the user and all the information of the bill

# Relational Model
Just an image that is the map to make the sql database
![MER_pd_David_Orjuela](https://github.com/user-attachments/assets/8d035fc9-9977-4d04-aeec-887b73459616)

# Personal information
Name: David
Clan: lovelace
Email: david123orjuela@gmail.com
