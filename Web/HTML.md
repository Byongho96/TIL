# Web
: the collection of web pages linked each other through links

* Components of web site
    * HTML: for structure
    * CSS: for decoration
    * JavaScript: for effect(computation and process)

* Browser
    * SW for randering codes as web pages(how to service html doc?)
    
    * following web standards(ex. HTML 5)
---
# HTML(Hyper Text Markup Language)
: Hyper Text = link
: Markup Language = Structured language

* Basic structure
    * head
        * meat data
        * Documents title, Encoding, Style, Open Graph Protocol
    * body
        * real contents showing on the page
    * comment
        * <!-- -->
* elements = tag + (contents)
    * Some tags does not need contests(ex. br, hr, img)
    * tags can be nested
* attribute
    * similar to parameters
    * diffrent for each tag
    * Global Attributes(can be used in all tags)
        * id
        * class
        * data-*
        * style
        * title
        * tabindex

* Semantic tag vs Non Semantic tag
    * semantic tag: has semantic value
        * each componets also has meaning not only be pretty
        * suitable for SEO(search engine optimization) and maintenance
        * header, nav, aside, secton, article, footer..
    * non-semantic tag: doesn't have semantic value
        * div, span...

* Dom(Document Object Model) Tree
: structre for randering HTML doc to web page

* In-line vs Block 
    * In-line is considered as
---
## Tags
* <form> 
    * for submit data to the surver
    * action: URL of the server
    * method: HTTP method
    * enctype: type of data(when method == POST)
* <input>
    * get data from user that goes in to form
    * id
    * type
    * name
    * value
* <label>
    * description of input tag
    * for: id of input tag
