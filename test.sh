#!/bin/bash

rm -f /tmp/anonbrowser.xpi
zip -r -1 /tmp/anonbrowser.xpi manifest.json background.js anon.js icons popup
python -m http.server --bind 127.0.0.1 --directory ./tests 9999 > /dev/null 2>&1 &
python3 tests/main_test.py

rm -f /tmp/anonbrowser.xpi