<script setup>
  import { defineProps } from 'vue';
    const props = defineProps({
    character: { type: Object, required: true }
  });
</script>

<template>
  <article class="characterCard">
    <div class="characterCardImage">
      <img :src="character.image" :alt="character.name">
    </div>
    <div class="characterCardContent">
      <section> 
        <h3 class="characterName">{{ character.name }}</h3>
        <span class="characterStatus">
          <span class="characterStatus"><span :class="'charactedStatusIcon ' + character.status.toLowerCase()"></span>{{ character.status }} - {{ character.species }}</span>
        </span>
      </section>
      <section>
        <span class="characterContentTitle">Last known location:</span>
        <span class="characterLastSeenLocation">{{ character.location.name }}</span>
      </section>
      <section>
        <span class="characterContentTitle">First seen in:</span>
        <span class="characterEpisode">{{ character.episode }}</span>
      </section>
    </div>
  </article>
</template>

<style>
.characterCard{
    width: 600px;
    height: 225px;
    display: flex;
    overflow: hidden;
    background: rgb(31, 32, 36);
    border-radius: 0.5rem;
    margin: 0.75rem;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
}

.characterCardImage{
  flex: 2 1 0%;
  width: 100%;
}

.characterCardImage img{
  width: 100%;
    height: 100%;
    margin: 0px;
    opacity: 1;
    transition: opacity 0.5s ease 0s;
    object-position: center center;
    object-fit: cover;
}

.characterCardContent{
  text-align: left;
  flex: 3 1 0%;
  height: 100%;
    position: relative;
    padding: 0 0 0 0.75rem;
    color: rgb(255, 255, 255);
    display: flex;
    flex-direction: column;
}

.characterCardContent section{
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  -webkit-box-pack: center;
  justify-content: center;
}

.characterContentTitle{
  color: rgb(158, 158, 158);
}

.charactedStatusIcon{
  display: inline-block;
  height: 0.5rem;
  width: 0.5rem;
  margin-right: 0.375rem;
  border-radius: 50%;
}

.charactedStatusIcon.dead{
  background: rgb(214, 61, 46);
  
}

.charactedStatusIcon.alive{
  background: rgb(85, 214, 46);
}

.charactedStatusIcon.unknown{
  background: rgb(167, 167, 167);
}
</style>