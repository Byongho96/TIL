# HTML

## Index

- [1. Web](#1-web)
  - [1.1. Components of a Web Page](#11-components-of-a-web-page)
  - [1.2. Browser](#12-browser)
- [2. HTML](#2-html)
  - [2.1. Element](#21-element)
    - [2.1.1. Global Attributes](#211-global-attributes)
    - [2.1.2. Semantic Tags](#212-semantic-tags)
    - [2.1.3. Inline & Block Tags](#213-inline-block-tags)
    - [2.1.4. Similar Tags](#214-similar-tags)
    - [2.1.5. \<form> and \<input>](#215-form-and-input)

---

# 1. Web

**the collection of web pages linked each other through links**

## 1.1. Components of a Web Page

- **HTML**
  - The basic structure of a web page
- **CSS**
  - The layout and design of a web page
- **JavaScript**
  - Running a web page dynamically

## 1.2. Browser

**Simply speaking, the software that drives the code on a webpage**

---

# 2. HTML

**Hyper Text Markup Language**

- **Hyper Text**
  - Hypertext is text which contains links to other texts.
- **Markup Language = Structured language**
  - It is a language that specifies the structure of documents or data using v tags.

## 2.1. Element

**Element = Tag + Content.** Each tag has its own attributes that provide additional information about the tag.

- **Tag**
  - An HTML tag is a piece of markup language used to indicate the beginning and end of an HTML element in an HTML document.
- **Content**
  - Information that tags have

### 2.1.1. Global Attributes

**The global attributes are attributes that can be used with all HTML elements.**

[HTML Global Attributes](https://www.w3schools.com/tags/ref_standardattributes.asp)

| Attributes | Description                                                            |
| ---------- | ---------------------------------------------------------------------- |
| class      | a list of classes that the element is in                               |
| data-\*    | assign user-cumstom data which can be transmitted between HTML and DOM |
| hidden     | browser doesn't rendering the element                                  |
| id         | unique(recommended) id of the element                                  |
| style      | css code                                                               |
| tabindex   | give the order of accessibility with 'tab' key                         |
| title      | additonal explanation when mouse-curser is on                          |
| lang       | the language of the element's content (for accessibility)              |

### 2.1.2. Semantic Tags

**A semantic element clearly describes its meaning to both the browser and the developer.**

[HTML Semantic Tags](https://www.w3schools.com/html/html5_semantic_elements.asp)

| Attributes | Description                                                                     |
| ---------- | ------------------------------------------------------------------------------- |
| header     | represents a container for introductory content or a set of navigational links. |
| nav        | defines a set of navigation links.                                              |
| main       | Specifies the main content of a document.                                       |
| section    | defines a section in a document.                                                |
| article    | specifies independent, self-contained content.                                  |
| aside      | defines some content aside from the content it is placed in (like a sidebar).   |
| footer     | bdefines a footer for a document or section.                                    |

### 2.1.3. Inline & Block Tags

- **Inline Tags**

  | tag               | usage                        |
  | ----------------- | ---------------------------- |
  | `<a>`             | link to another url          |
  | `<b>`, `<strong>` | bold                         |
  | `<i>`, `<em>`     | italic                       |
  | `<br>`            | change the line              |
  | `<img>`           | image                        |
  | `<span>`          | meaningless inline container |

- **Block tags**

  | tag            | usage                       |
  | -------------- | --------------------------- |
  | `<p>`          | paragraph                   |
  | `<hr>`         | a thematic break            |
  | `<ol>`, `<ul>` | list                        |
  | `<pre>`        | express html contents       |
  | `<blockquote>` | long quote                  |
  | `<div>`        | meaningless block container |

### 2.1.4. Similar Tags

- `<i> vs <em>`
  - `<i>`: italic only visually
  - `<em>`: italic with emphasis
- `<b> vs <strong>`
  - `<b>`: bold only visually
  - `<strong>`: bold with emphasis
- `<ul> vs <ol> vs <dl>`
  - `<ul>-<li>`: unordered-list
  - `<ol>-<li>`: ordered-list
  - `<dl>-<dt>, <dd>`: definition-list

### 2.1.5. \<form> and \<input>

- **\<form>**
  - The \<form> tag is used to create an HTML form for user input. It can submit several input fields at once.
- **\<input>**
  - The \<input> tag specifies an input field where the user can enter data.
  * **Types**
    - **text**: text
    - **password**: input is being hidden
    - **email**: email form
    - **number**: number
    - **file**: type of the available file can be determined by `accept` attribute
    - **checkbox**: checkbox
    - **radio**: only one can be chosen between the inputs that have the same `name` attribute
    - **color**: color picker
    - **date**: date picker
    - **hidden**: hidden from the user

```html
<form>
  <label for="agreement">description of the input</label>
  <input type="checkbox" name="agreement" id="agreement" />
  <!-- 'for' attribute is linked to 'id' attribute -->
  <input type="submit" value="Submit" />
</form>
```
