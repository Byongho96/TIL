---
title: 'Django Fixtures'
updatedAt: '2022-12-27'
createdAt: '2022-11-08'
isCompleted: true
reference:
---

- [1. Fixtures](#1-fixtures)
  - [1.1. The Definition of Fixtures](#11-the-definition-of-fixtures)
  - [1.2. The Default Path of Fixtures](#12-the-default-path-of-fixtures)
  - [1.3. Create Fixtures](#13-create-fixtures)
  - [1.4. Import Fixtures](#14-import-fixtures)

---

# 1. Fixtures

How to share theinitial data during the development phase.

## 1.1. The Definition of Fixtures

The collection of data that Django knows how to import into the database.

## 1.2. The Default Path of Fixtures

**`app/fixtures/`**  
By default, Django looks in the fixtures directory inside each app for fixtures. You can set the FIXTURE_DIRS setting to a list of additional directories where Django should look.

Based on my experience, the `BASE_DIR` is also one of the default paths.

## 1.3. Create Fixtures

- **dumpdata**
  - `python manage.py dumpdata --indent 4 AppName.ModelName > FileName.json`
    - Ex. `python manage.py dumpdata --indent 4 articles.article > articles.json`
    - `--indent 4` is optional, just for making the file look good.
- **Move the fixtures into `app_name/fixtures/`**
  - <mark>If the file name is duplicated,</mark> you should divide the name space of fixtrues
    - `app_name/fixtures/app_name/`

## 1.4. Import Fixtures

- **loaddata**  
  Considering the dependence between models, independent models should be loaded first.

  - `python manage.py loaddata FileName.json`
  - If the namespace is divided

    - `python manage.py loaddata AppName/FileName.json`

  * To avoid considering model relationships

    - `python manage.py loaddata FileName1.json FileName2.json FileName3.json`
