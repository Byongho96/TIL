## Bug
: problems occurring in SW

## Debugging
: fixing bugs

## Types of error
* **Syntax Error**
    * Doesn't start
    * '^' indciates the position where the error is detected
    * **EOL / EOF** 
        * Eod of Line / End of File: related to brackets
* **Exception**
    * errors except syntax erorr, which means the syntax is correct
    * **ZeroDivisionError**
        * tried to divide something with 0
    * **NameError**
        * not defined
    * **TypeError**
        * The type of the object is not appropriate
        * arguments error
    * **ValueError**
        * Type is right, but the value is not appropriate
    * **IndexError**
        * Index out of range
    * **KeyError**
        * key out of dict.keys()
    * **ModuleNotFoundError**
        * `import Module` when can not find Module
    * **ImportError**
        * There is the module, but isn't the class of function
    * **KeyboardInterrupt**
        * The program is forcibly ended. Ex) Ctrl + C
    * **IndentationError**
        * Indentation is not used appropriately

---
## Handling Exception
**try... except... (else...) (finally...)**
```python
try:
    # anyway try this code
except:
    # When Error is occured
else:
    # When Error is not occured
finally:
    # Always

try:
    f = open('nofile.txt')
except FileNotFoundError:
    print('There is no file')
else:
    print('Starts reading file')
    print(f.read())
    print('Ends reading file')
    f.close()
finally:
    print('Ends the program')
```
```python
try:
    # try this code
except <Errorname> as <Nickname>:
    # When Nickname(Errorname) occured
```
```python
try:
    # try this code
except <Error1, Error2>:
    # Erorr1 or Error2 occured
```
```python
try:
    # try this code
except <Error1>:
    # Erorr1 occured
except <Error2>:
    # Erorr2 occured, which is not Error 1
except:
    # Some kinds of Error occured, which is not Error 1 or 2
```
