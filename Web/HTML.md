# 1. Web
: the collection of web pages linked each other through links

* Components of web site
    * HTML: for structure
    * CSS: for decoration
    * JavaScript: for effect(computation and process)

* Browser
    * SW for randering codes as web pages(how to service html doc?)
    
    * following web standards(ex. HTML 5)
---
# 2. HTML(Hyper Text Markup Language)
**Hyper Text = link**
**Markup Language = Structured language**

## 2-1. Element
* **Element = tag + content**
* Each tag has its' own attributes
    * Like object and mehtods in python

## 2-2. Global Attributes
* **class**: list of classes that the element is in
* **data-\***: assign user-cumstom data
    * related to JavaScript and DOM
* **hidden**: browser doesn't randering the element
* **id**: unique(recommended) id of the element
* **style**: css code
* **tabindex**: give the order of accessibility with 'tab'
    * `tabindex='-1'`: disabled
    * `tabindex='0~32767'`: abled
* **title**: additonal explanation when mouse-curser is on
    * for link
    * for img
    * for quote
    * for abbr
    * for input
* **lang**: for accessibility

##  2-3. Semantic Tags
**Assign meaning to the browser contents**
* **header**: title, logo, author, search, 
* **nav**: menu, index
* **main**: main contents
* **section**: category(title)
* **article**: can be independant by itself
* **aside**: index(sixe bar), ad
* **footer**: author, info, copyright
---
* `<i> vs <em>`
    * `<i>`: italic only visually
    * `<em>`: italic with emphasis
* `<b> vs <strong>`
    * `<b>`: bold only visually
    * `<strong>`: bold with emphasis
* `<ul> vs <ol> vs <dl>`
    * `<ul>-<li>`: unordered-list
    * `<ol>-<li>`: ordered-list
    * `<dl>-<dt><dd>`: definition-list
* `background-img vs <img>`
* `flex, grid vs <table>`

## 2-4. Inline tags vs Block tags
* Inline tags
    |tag|usage|
    |---|---|
    |`<a></a>`|link to another url|
    |`<b></b>; <strong></strong>`|bold|
    |`<i></i>; <em></em>`|italic|
    |`<br>`|change line|
    |`<img>`|image|
    |`<span></span>`|meaningless inline container|
* Block tags
    |tag|usage|
    |---|---|
    |`<p></p>`|paragraph|
    |`<hr>>`||
    |`<ol></ol>;<ul></ul>`|list|
    |`<pre></pre>`|express html contents|
    |`<blockquote></blockquote>`|long quote|
    |`<div></div>`|meaningless block container|

## 2-5. \<form> and \<input>
```html
<label for="agreement">description of the input</label>
<input type="checkbox" name="agreement" id="agreement">
<!-- 'for' is linked to 'id' -->
```
* type
    * **text**: text
    * **password**: input is being hidden
    * **email**: email form
    * **number**: number
    * **file**: type can be determined by `accept`
    * **checkbox**: checkbox
    * **radio**: only one between the same name
    * **color**: color picker
    * **date**: date picker
    * **hidden**: hidden from users