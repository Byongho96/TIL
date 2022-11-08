# 1. Basic CSS(Cascading Style Sheets)
: Choose HTML by tags, and stylize them.

## 1-1. Type of definition
```css
h1 /*selector*/ {
    color: blue; /*declaration*/
    font-sixe:/*property*/ 15px;/*value*/
}
```
* **Inline**: in the html tag
* **Embedding**: in the head section
    * select tags with selector
* **Link**: in the new file
    * <link> tag

## 1-2. Selectors
* **universal selector**
    * `*`
    * select every element
* **type selector**
    * name of the attribute
* **class selector**
    * `.<class name>`
    * select elements in the class
* **id selector**
    *  `#<class name>`
    * select elements which have the id
* **A:nth-child(N)**
    * A's the second sibling
* **A:first-child**
    * A's the first sibling
* **A:last-child**
    * A's the last sibling
* **A:onlu-child**
    * A which is the only child
* **A:nth-of-type(N)**
    * A's Nth A sibling
* **A:first-of-type**
    * A's the first A sibling
* **A:last-of-type**
    * A's the last A sibling
## 1-3. Combinators
* **descendant selector**
    * `A B{}`
* **child selector**
    * `A>B{}`
* **general sibling selector**
    * `A~B{}`
    * B after A in the same depth
* **adjacent sibling selector**
    * `A+B{}`
    * B right after A in the same depth

## 1-4. Cascading order
* !important > In-line > class > type > The order of the code

## 1-5. Inheritance
* **Inherited**
    * about text
        * font, color, text-align, opacity....
* **Not inherited**
    * about Box
        * display, width, height, margin, padding, border
    * about position

## 1-6. Unit
* **px** vs **%** vs **vw**
    * %: dependant on the parent
        * body size is dependant of the web browser size
    * vw: dependant on the web-browser size
        * 1vw = 1%
* **em** vs **rem**
    * em: dependant on the parent
    * rem: dependant on the html
        * font-size: 16px

# 2. Box model
## 2-1. Box components
![Box_model.img](images/box_model.jpg)
```css
margin {
    margin: 10px 20px 30px 40px;
}
border {
    box-sixing: border-box;/*content-box*/
    border: 2px dashed black;
}
```
<!-- 기본 크기(특히 바디)
위에 맞춘 사이징 -->
## 2-3. Display
* **disaply: inline**
    * take up space as big as the conent
    * line-change X
    * width, height X
    * only margin-start, end / padding-right, left
    * div / li / p / hr / form
* **disaply: block**
    * take up the whole line
        * ==even if the width is confined,== margin takes up the rest
    * width, height O
    * span / a / img / input / label
* **disaply: inline-block**
    * block that takes up space as big as the conent
    * width, height O
* **disaply: none**
    * web does not randering the element
        * `visibility: hideen;`takes up the space

## 2-4. Position
* **static**
    * default position
* **relative**
    * takes up the default position
    * but shown at moved position
    ```css
    .relatvie {
        position: relative;
        top: 100px;
        left: 100px;
    }
    ```
* **absolute**
    * ==doesn't== take up the default position
    * base the nearest ancestor ==which is not static== 
    * otherwise, base the browser
* **fixed**
    * ==doesn't== take up the default position
    * base the viewport
* **sticky**