<template>
  <div>
    <div
      @keyup.enter="searchGifs()"
      v-if="searchBar"
      style="display: flex; justify-content: center; align-items: center"
    >
      <input
        v-model="searchText"
        :placeholder="placeholder"
        class="searchGifInput"
      />
      <button @click="searchGifs" class="buttonSearchGif">
        {{ searchButtonText }}
      </button>
    </div>
    <div v-if="this.result" style="display: flex; justify-content:center">
      <div class="container" :style="direction">
        <img
          :key="image.index"
          v-for="image in this.result"
          :height="height"
          :width="width"
          :src="image"
          :style="imgStyle"
          @click="onClickImage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    apiKey: {
      type: String,
    },
    height: {
      type: Number,
      default: 256,
    },
    width: {
      type: Number,
      default: 256,
    },
    searchBar: {
      type: Boolean,
      default: true,
    },
    imgStyle: {
      type: String,
      default: "padding-top: 10px;margin: 0 10px; cursor: pointer",
    },
    row: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: "Gif search...",
    },
    searchButtonText: {
      type: String,
      default: "Go!",
    },
    resultNumbers: {
      type: Number,
      default: 15,
    },
    clearSearchBar: {
      type: Boolean,
      default: true,
    },
    clearResultOnClick: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      searchText: "",
      result: [],
      direction: "",
    };
  },
  mounted: function() {
    this.direction = "flex-direction:  " + (this.row ? "row" : "column") + ";";
  },
  methods: {
    async searchGifs() {
      this.result = [];
      await axios
        .get(
          "https://api.giphy.com/v1/gifs/search?api_key=" +
            this.apiKey +
            "&q=" +
            this.searchText
        )
        .then((response) => {
          this.searchText = "";
          let count = 0;
          for (let el of response.data.data) {
            this.result.push(el.images.original.url);
            if ((count += 1) >= this.resultNumbers) break;
          }
        });
      if (this.clearSearchBar) this.searchText = "";
    },
    onClickImage(image) {
      this.$emit("clicked", image.srcElement.currentSrc);
      if (this.clearResultOnClick) this.result = [];
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 15px;
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  width: 50%;
}

.searchGifInput {
  width: 25rem;
  height: 3.5vh;
  padding-left: 1%;
  margin-right: 10px;
  border-radius: 0.25rem;
  font-size: 1.25rem;
  border-width: 0;
  background-color: #f0f0f0;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.buttonSearchGif {
  --bg-opacity: 1;
  background-color: #48bb78;
  background-color: rgba(72, 187, 120, var(--bg-opacity));
  border-radius: 0.375rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --text-opacity: 1;
  color: #fff;
  color: rgba(255, 255, 255, var(--text-opacity));
  font-size: 1.25rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  cursor: pointer;
  box-sizing: border-box;
  border-width: 0;
  border-style: solid;
  border-color: #e2e8f0;
}

.buttonSearchGif:hover {
  background-color: #68d391;
}

/* Hide scrollbar for Chrome, Safari and Opera */
div::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
div {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
