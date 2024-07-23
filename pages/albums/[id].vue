<template>
  <h1 class="page-title">Photo Album {{ $route.params.id }}</h1>

  <div>
    <div v-if="loading">
      <div class="loading-spinner"></div>
    </div>
    <div v-else class="photo-album pic">
      <div
        v-for="(photo, index) in albumObject"
        :key="index"
        class="pic"
        @click="showImg(index)"
      >
        <img :src="photo.url" :alt="photo.title" />
      </div>
      <VueEasyLightbox
        :visible="visibleRef"
        :imgs="imgs"
        :index="currentIndex"
        @hide="onHide"
      >
      </VueEasyLightbox>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

const Album = gql`
  query Album($id: ID!) {
    album(id: $id) {
      photos {
        data {
          id
          url
          title
          thumbnailUrl
        }
      }
    }
  }
`;

export default {
  data() {
    return {
      visibleRef: false,
      currentIndex: null,
      albumObject: null,
      loading: false,
      imgs: [],
    };
  },

  apollo: {
    album: {
      query: Album,
      variables() {
        return {
          id: this.$route.params.id,
        };
      },
      result({ data }) {
        this.albumObject = data.album.photos.data;
        this.imgs = this.albumObject.map((item) => item.url);
      },
    },
  },
  mounted() {
    console.log(this.albumObject);
    console.log(this.imgs);
  },

  methods: {
    showImg(index) {
      this.visibleRef = true;
      this.currentIndex = index;
      console.log("showLightbox:", this.visibleRef);
      console.log("currentIndex:", this.currentIndex);
      this.loading = false;
    },
    onHide() {
      this.visibleRef = false;
    },
  },
};
</script>

<style>
.loading-spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
