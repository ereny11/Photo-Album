<template>
  <h1 class="page-title">Photo Album {{ $route.params.id }}</h1>

  <div>
      <div v-if="loading">
        <div class="loading-spinner"></div>
      </div>
      <div v-else class="photo-album pic">
      <div 
        v-for="(photo, index) in imgs"
        :key="index"
         
        @click="showImg"
      >
        <img :src="photo.url" :alt="photo.title"/>
      </div>
      <VueEasyLightbox
        :visible="visibleRef"
        :imgs="imgs"
        :index="currentIndex"
        @hide="onHide"
        @index-update="updateCurrentIndex"
      >
      <template v-slot:lightbox-content="{ currentIndex }">
        <img :src="imgs[currentIndex].url" />
      </template>
      </VueEasyLightbox>
    </div>
  </div>

</template>

<script >
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
  data(){
  return{
    visibleRef: false,
    currentIndex: 0,
    imgs: [],
    loading: false,
  }
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
        this.imgs = data.album.photos.data;
      }
    },
  },
  mounted() {
    console.log(this.imgs);
  },

methods:{

  async fetchData() {
      this.loading = true;
      try {
        // fetch data here
        const response = await this.apollo.album.result
        // update component data with the fetched data
        this.imgs = response.data;
      } catch (error) {
        // handle error
        console.error('Error fetching data:', error);
      } finally {
        this.loading = false;
      }
  },

  showImg (index) {
    this.currentIndex = index;
    this.visibleRef = true;
    console.log('showLightbox:', this.visibleRef);
    console.log('currentIndex:', this.currentIndex);
  },
  onHide(){ 
    this.visibleRef = false
  },
  updateCurrentIndex(event) {
      // Check if the event is a PointerEvent
    if (event instanceof PointerEvent) {
      // Extract the index value from the event object
      this.currentIndex = event.detail;
      console.log('New currentIndex:', this.currentIndex);
    } else {
      // If the event is not a PointerEvent, assume it's the expected index value
      this.currentIndex = event;
      console.log('New currentIndex:', this.currentIndex);
    }
  }
}

}




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
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
