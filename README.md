# Whose Pet Is It?

A responsive browser game for matching pet photos to their owners. Pet names are not required or displayed.

The game contains 40 supplied photos and 16 owners. Each owner is the first word of the filename, before the hyphen. ChristinaI and ChristinaR are separate owners, as supplied. Pet names and filename suffixes are not displayed.

Each game shows one randomly chosen photo per owner, so a round never repeats an owner. Each round shows the correct owner plus three other owners, for four choices total.

Owner photo counts: Brooke 1; Brittany 1; ChristinaI 1; ChristinaR 7; Dustin 2; Eireann 4; Jasmine 2; Julia 1; Kristen 2; Morgan 1; Rayna 3; Robin 2; Sadie 1; Sarah 4; Stacie 1; Tiffany 7.

## Files

- `index.html`
- `styles.css`
- `script.js`
- `images/`
  - The supplied photos optimized as WebP images (quality 80, longest edge up to 800 pixels).

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
{ owner: "Example Owner", image: "images/photo01.jpg" }
```

The owner and filename above are examples only. Add one entry per supplied photo using its actual owner and filename. Place the image file in the `images` folder.

The same owner may appear in multiple entries; use the same spelling each time. Each game picks one photo per owner at random. Each round offers four owner names: the correct owner and three randomly chosen others. Pet names are not used.

Round totals and final scores follow the number of owners. Score messages use percentages so they work if the owner count changes.

To run locally, open `index.html` in a browser, keeping the other files and `images` folder alongside it. No build step is required.


## Compressed edition

Use this edition's `script.js` together with its `images` folder because the filenames now end in `.webp`. Extract the ZIP before uploading; upload its contents at the repository root. Original photos remain untouched.
