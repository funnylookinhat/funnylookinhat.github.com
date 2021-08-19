#!/bin/bash

# Requires imagemagick

rm -f index.html
cat header.html >> index.html

echo "<ul class=\"gallery\">" >> index.html

for FILE in $(ls [0-9][0-9][0-9][0-9]-*); do
  echo "Checking $FILE"
  if [[ ! -f "thumb-$FILE" ]]; then
    echo "Generating thumb-$FILE"
    convert -thumbnail 200 $FILE thumb-$FILE
  fi

  echo "<li><a href=\"$FILE\"><img src=\"thumb-$FILE\"></a><p><a href=\"$FILE\">$FILE</a></p></li>" >> index.html
done

echo "</ul>" >> index.html

cat footer.html >> index.html
