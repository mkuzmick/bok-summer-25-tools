# mk-microproject-ico-conversion


## version 1

```
#!/usr/bin/env bash

convert $1 -resize 16x16   -depth 32 16-32.png
convert $1 -resize 32x32   -depth 32 32-32.png
convert $1 -resize 48x48   -depth 32 48-32.png
convert $1 -resize 256x256 -depth 32 256-32.png

convert 16-32.png 32-32.png 48-32.png 256-32.png $2%    
```

## next

- generate new icons
- svg and png
- try using pngs and svgs specifically in some contexts
- illustrator, photoshop and xcode for conversions?
- or just imagemagick
- 