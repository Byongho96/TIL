# Python Error Handling

## Index

- [1. Terms](#1-terms)
- [2. Types of error](#2-types-of-error)
  - [2.1. Syntax Error](#21-syntax-error)
  - [2.2 Exception](#22---exception--)
- [3. Error Handing](#3-error-handing)
  - [3.1. Try Except](#31-try-except)

---

# 1. Terms

- **Bug**
  - problems occurring in SW
- **Debugging**
  - fixing bugs

---

# 2. Types of error

## 2.1. Syntax Error

**If there's syntax error, code can't be excuted.** '^' indciates the position where the error is detected

- **EOL / EOF**
  - End of Line / End of File: error related to brackets
- **IndentationError**
  - Base class for syntax errors related to incorrect indentation

## 2.2 Exception

**Simply speaking, errors except syntax errors.** The error occurs during running the code.

- **IndexError**
  - Raised when a sequence subscript is out of range.
- **ImportError**
  - Raised when the import statement has troubles trying to load a module.
- **KeyError**
  - Raised when a mapping (dictionary) key is not found in the set of existing keys.
- **KeyboardInterrupt**
  - Raised when the user hits the interrupt key (normally Control-C or Delete).
- **ModuleNotFoundError**
  - A subclass of ImportError which is raised by import when a module could not be located.
- **NameError**
  - Raised when a local or global name is not found.
- **TypeError**
  - Raised when an operation or function is applied to an object of inappropriate type.
- **ValueError**
  - Raised when an operation or function receives an argument that has the right type but an inappropriate value.
- **ZeroDivisionError**
  - Raised when the second argument of a division or modulo operation is zero

---

# 3. Error Handing

## 3.1. Try Except

**Basic Structure**

```python
try:
    # anyway try this code
except:
    # When Error is occured
else:
    # When Error is not occured
finally:
    # Always
```

**Basic Structure Example**

```python
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

**Applications**

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
