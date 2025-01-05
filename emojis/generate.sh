#!/bin/bash

# Requires imagemagick

rm -f index.html
cat header.html >> index.html

echo "<ul class=\"emojis\">" >> index.html

for FILE in $(ls images/*); do
  echo "Found $FILE"

  echo "<li><a href=\"$FILE\"><span class="emoji"><img src=\"$FILE\"></a></span><a href=\"$FILE\">${FILE/images\//}</a></li>" >> index.html
done

echo "</ul>" >> index.html

cat footer.html >> index.html
