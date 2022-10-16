## 1. Fixtures
How to share initial data during the development phase.

## 1.1. The Definition of Fixtures
The collection of data that Django knows how to import into the database.

## 1.2. The Default Path for Fixtures
* app_name/fixtures/
    * The dumpdata doesn't create fixtures in the defualt path. The files should be moved manually
    * The "default" path means when it comes to loading data

## 1.3. Create Fixtures
* dumpdata
    * `python manage.py dumpdata --indent 4 AppName.ModelName > FileName.json`
        * Ex. `python manage.py dumpdata --indent 4 articles.article > articles.json`
        * `--indent 4` is optional, just for making the file look good.
* Move files into app_name/fixtures/
    * If the file name is duplicated, you should divide the name space of fixtrues
        * app_name/fixtures/app_name/

## 1.3. Import Fixtures
* loaddata
    * If the namespace is divided
        * `python manage.py loaddata AppName/FileName.json`
    * If the namespace is not divided
        * `python manage.py loaddata FileName.json`
    * If you want to load mutilple files at one
        * `python manage.py loaddata FileName1.json FileName2.json FileName3.json`
        * **WARNING**: Otherwise, Models not dependent of other models should be registered first.