<template>
  <h1 class="text-3xl mb-4 font-bold underline">Photo Album</h1>

  <div>
    <div class="grid grid-cols-4 gap-5 px-4">
      <div v-for="album in albums.data">
        <NuxtLink
          :to="`/albums/${album.id}`"
          class="album-card"
        >
          <h5 class="album-title">
            Album {{ album.id }}
          </h5>
          <p class="album-subtitle">
            {{ album.title }}
          </p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script>
import gql from "graphql-tag";

export default {
  apollo: {
    albums: gql`
      query AlbumPage {
        albums {
          data {
            id
            title
            photos {
              data {
                id
                title
                url
                thumbnailUrl
              }
            }
          }
        }
      }
    `,
  },
};
</script>
