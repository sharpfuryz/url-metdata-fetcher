# url-metadata-fetcher
This is small module that returns metadata for any urls in standartized format.
For example, if I pass 'zoommyapp.com' as param module will return: 
```
    {
      url: 'https://zoommyapp.com',
      title: 'Zoommy - more than 80 000 free photos in one place',
      url_title: 'zoommyapp.com',
      tags: '[]',
      image_url: 'http://zoommyapp.com/og_preview.png'
    };
```

# Why you may need this? 
- Don't reinvent the wheel and just use simple logic
- Don't write another wrapper over open-graph modules
- Don't check input
## How it works?
- Check input: add https or http
- Get opengraph
- Select image from opengraph
- Normalize data and return 
- 
## Usage
Step 1:
Add it via yarn or npm
```
yarn add url-metadata-fetcher
```
Step 2:
Use it in your nodejs application:
```
const urlMetadataFetcher = require('url-metadata-fetcher');
urlMetadataFetcher('google.com').then((data) => console.log(data));
```
## Why rejections and any errors are not throwed? 
This module should return item with field in any cases, even if host doesn't exist or network connection is not available.
