<h1 align="center">Welcome to VueGifSearch 🔍</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
</p>

> A simple component to search gifs in vue with Giphy and get the url

## Install 📦

```sh
npm i vue-gif-search
```

## How to use 📝

```javascript
import gifSearch from "VueGifSearch";
```

## Emited :arrow_up:

Once you clicked on one result, the component will emit the url, you will need to catch it

#### Example

```javascript
<template>
   <gifSearch apiKey="YourAPIKey" @clicked="onClickGIF" />
</template>
<script>
import gifSearch from "VueGifSearch";


export default {
  components: {
    gifSearch
  },

  data() {
    return{
      url: "";
    }
  },

  methods: {
    onClickGIF (value) {
      this.url = value;
      console.log(this.url)
    }
  }
};
</script>
```

## Props 🗃

| Name               | Type    | Default                                             | Description                                                            |
| ------------------ | ------- | --------------------------------------------------- | ---------------------------------------------------------------------- |
| apiKey             | Array   | -                                                   | Giphy API Key, only required value                                     |
| height             | Number  | 256                                                 | Gif preview height                                                     |
| width              | Number  | 256                                                 | Gif preview width                                                      |
| searchBar          | Boolean | true                                                | Show/hide searchBar                                                    |
| imgStyle           | String  | "padding-top: 10px;margin: 0 10px; cursor: pointer" | CSS style for gif previews                                             |
| row                | Boolean | true                                                | Show previews as Row or Column                                         |
| placeholder        | String  | "Gif search..."                                     | Input placeholder text                                                 |
| searchButtonText   | String  | "Go!"                                               | Search Button text                                                     |
| resultNumbers      | Number  | 15                                                  | Amount of gif previews (More than 15 could cause performance problems) |
| clearSearchBar     | Boolean | True                                                | Should search bar be cleared once image are searched                   |
| clearResultOnClick | Boolean | True                                                | Should result be cleared once you clicked one of them                  |

## Show your support ✨

Give a ⭐️ if this project helped you!

## Author 👷

**Daniel Villalobos <daniel.villalobosdel@gmail.com>**
