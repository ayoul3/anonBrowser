# Anon Browser
Anon Browser is an extension that randomizes some Navigator attributes used for fingerprinting and tracking user activity.  
It acts at two levels:

### HTTP headers
It randomizes values in the *user-agent (UA)* and *accept* headers in the least intrusive way.  
It does not change the nature of the UA, simply build numbers and browser versions. Enough to thwart tracking without breaking websites that rely on the UA
```
Example UAs generated:

Mozilla/5.0 (Windows NT 8.0; Win64; x64; rv:48.0) Gecko/20100125 Firefox/102.20

Mozilla/5.0 (Windows NT 8.0; Win64; x64; rv:78.0) Gecko/20100112 Firefox/99.25
```
### Navigator object
The extension also overwrites four properties of the Navigator object in JavaScript:
- userAgent again (same technique as above)
- hardwareConcurrency property - random value between 1 and 6
- buildID
- productSub

It also adds random properties to the navigator object to increase its count number

# Permissions
The extension requires three permissions:
- Webrequest to intercept HTTP headers
- Blocking to alter HTTP headers
- Storage to store its state (enabled/disabled)

# Testing:
Firefox developer: https://download.mozilla.org/?product=firefox-devedition-latest-ssl&amp;os=linux64&amp;lang=en-US
# License
Anon browser is licensed under MIT license

