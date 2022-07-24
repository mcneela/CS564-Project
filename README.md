# CS564-Project
Group project for Summer 2022 CS564

## Creating a Database
To create a database and apply migrations (changes to the tables), run
```
python manage.py makemigrations
python manage.py migrate
```
This will create a local `db.sqlite3` file which contains your database!
Note: It will be large, so **DO NOT** push it to the repo.

## Loading Data into the Database
To load a csv file of job postings into the database, you can use a handy command. Just run
```
python manage.py load_db --path <path_to_your_csv_file>
```
