1. **module**
: ==python file== that contains functionas and vairiables
2. **package**
: ==directory== that contains moudules
3. **library**
: ==directory== that contains packages
```python
my_package/
    __init__.py # indicate that the current directory is a python package
    math/
        __init__.py
        tools.py  
```
---
## (from 'package.module') import 'data' (as 'nickname')
* name after 'import' must be expressed
* if you use '*' after import >> that means that importing all the functions form the module
---
## How to use package
|cmd|meaning|
|---|---|
|pip install somepackage;(==specific version);(>=minimum version)|install a package|
|pip uninstall somepackage|uninstall a package|
|pip list|show the packages that installed|
|pip show somepackage|show information of a pacakge|
|pip freeze > requirements.txt|save the list of current packages into requirements.txt|
|pip install -r requirements.txt|에 install packages in requirements.txt;'-r' have recursive characteristic|

---
## Key modules
* **import sys**
* **import math**
* **import decimal**
* **import copy**
* **import os**
* **import pickle**