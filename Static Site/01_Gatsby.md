Gatsby automatically creates pages for React components that are the default export of files in the src/pages directory.

Pages created in the src/pages directory use the name of the file as the route for the page.

The Link component lets you add a link to another page in your Gatsby site. It’s similar to an HTML <a> tag, but with some extra performance benefits. The Link component takes a prop called to, which is similar to the <a> tag’s href attribute. The value should be the URL path to the page on your site you want to link to.

If you take another look at the finished example blog, you might notice that there are some repeated parts of the UI across each page, like the site title and the navigation menu.
Instead, it would be better to create one common Layout component that groups all the shared elements to reuse across multiple pages.

In Gatsby terms, a plugin is a separate npm package that you install to add extra features to your site.
