const og = require('open-graph');
const URL = require('url');

const getHostFromUrl = (url) => {
  let result;
  try {
    result = new URL(url).hostname;
  } catch (_error) {
    result = url;
  }
  return result;
};
const validateUrl = (url) => {
  if (!/^https?:\/\//i.test(url)) {
    return `http://${url}`;
  }
  return url;
};

const updateInfo = (card) => new Promise((resolve) => {
  const { url } = card;
  let host = getHostFromUrl(url);
  og(url, (err, meta) => {
    let image_url, item;
    if (err) {
      meta = {};
      item = {
        url,
        title: url,
        url_title: url,
        tags: '[]'
      };
      return resolve(item);
    }
    item = {
      url: meta.url,
      title: meta.title,
      url_title: host,
      tags: '[]'
    };
    if (meta.image) {
      if (meta.image.url) {
        if (typeof meta.image.url === 'string') {
          image_url = meta.image.url;
        }
        if (typeof meta.image.url === 'object') {
          image_url = meta.image.url[0];
        }
        item.format = image_url.split('.').pop();
      } else {
        image_url = false;
      }
    } else {
      image_url = false;
    }
    if (!item.title) {
      item.title = url;
    }
    if (!item.url) {
      item.url = url;
    }
    if (Array.isArray(item.title)) {
      item.title = item.title[0];
    }
    item.image_url = image_url;
    return resolve(item);
  });
});

const getInfo = (given_url) => new Promise((resolve) => {
  let error = null;
  let url = validateUrl(given_url);
  let host = getHostFromUrl(url);
  try {
    og(url, (err, meta) => {
      let image_url, item;
      if (err) {
        meta = {};
        item = {
          url: url,
          title: url,
          url_title: url,
          tags: '[]'
        };
      } else {
        item = {
          url: meta.url,
          title: meta.title,
          url_title: host,
          tags: '[]'
        };
      }
      if (meta.image) {
        if (meta.image.url) {
          if (typeof meta.image.url === 'string') {
            image_url = meta.image.url;
          }
          if (typeof meta.image.url === 'object') {
            image_url = meta.image.url[0];
          }
          item.format = image_url.split('.').pop();
        } else {
          image_url = false;
        }
      } else {
        image_url = false;
      }
      if (!item.title) {
        item.title = url;
      }
      if (item.url) {
        item.url = url;
      }
      if (Array.isArray(item.title)) {
        item.title = item.title[0];
      }
      item.image_url = image_url;
      return resolve(item);
    });
  } catch (_error) {
    error = _error;
    item = {
      url,
      title: url,
      url_title: url,
      tags: '[]'
    };
    return resolve(item);
  }
});

module.exports = {
  getInfo, updateInfo
};