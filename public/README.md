# Mea as a service

Mea pages are pages that show famous quotes of significant people. It's mostly used for trolling websites like http://halomea.com/.

To quickstart creating your page, you can download this repo and use the contents of `/template/` folder as a bootstrap for your page. Othrewise you can follow these simple instructions.

## Creating a Mea page

When creating a Mea page, start with minimal template: 

```
<h1 id="quote">Default text</h1>
<button id="next">Next quote</button>

<script src="//cdn.firebase.com/js/client/1.0.3/firebase.js"></script>
<script src="//mea.firebaseapp.com/mea.js"></script>
```

- Mea.js will load quotes from database according to domain and adds `.loaded` class to `<body>` when it is ready.
- Use `.loaded` class to show the `#next` button, otherwise it could not work before loading all needed data.
- Mea.js will add `.animating` class to `<body>` after clicking on `#next` button. You can use that one to make a transition between quotes. Class will be added and after one second, the quote will be changed to new one and class removed.

## Admin

All Mea pages are open to accept new quotes. You can create an administration form.

```
<div id="history"></div> <!-- Optional -->
<textarea id="admin" autofocus placeholder="Add a quote"></textarea>

<script src="//cdn.firebase.com/js/client/1.0.3/firebase.js"></script>
<script src="//mea.firebaseapp.com/mea.js"></script>
```

- Admin needs to be on the same domain as the original Mea page. It can even be in the same file as Mea page.
- `#admin` is either `<input>` or `<textarea>`. After pressing <kbd>enter</kbd>, the quote from input will be saved.
- If `#history` element is present, it will be filled with quotes that you saved.
- You don't need to include `<script>`s twice if the admin area is on the same page as the Mea page.

Optionaly if you are implementing admin as a single page, you can use this stylesheet: 

```
body {
    margin: 50px;
}
* {
    color: #111;
    text-transform: uppercase;
    font-size: 53px;
    background: #f4f4f4;
    font-family: sans-serif;
}
#history {
    margin-bottom: 50px;
}
#admin {
    width: 100%;
    border: 0;
    outline: 0;
}
```
