# Whose Pet Is It?

A responsive browser game for matching pets to their owners.

## Files

- `index.html`
- `styles.css`
- `script.js`
- `images/`
  - `higgins.jpg`
  - `tom.jpg`
  - `mommy.jpg`
  - `cuddles.jpg`
  - `tc.jpg`

## GitHub Pages setup

1. Create a new GitHub repository.
2. Upload all files and the `images` folder to the root of the repository.
3. Commit the files.
4. Open the repository's **Settings**.
5. Select **Pages**.
6. Under **Build and deployment**, choose **Deploy from a branch**.
7. Select your main branch and `/ (root)`.
8. Save.

GitHub will publish the game at a URL similar to:

`https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`

## Editing pets later

Open `script.js` and edit the `pets` array near the top.

Example:

```js
{ name: "Higgins", owner: "Scott", image: "images/higgins.jpg" }
```

Add the image file to the `images` folder and add the owner's name to the `owners` array.
