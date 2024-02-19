<template>
    <div>
      <div id="listHeader">
        
        <span>Фильтр по:</span>

        <select @change="onFilter($event)" id="filterSelect">
            <option value="name">name</option>
            <option value="status">status</option>
        </select>

        <input type="text" :value="inputValue" ref="inputFilter" 
        @change="onInput($event)" :placeholder="filterBy === 'name' ? 
        (filterName ? filterName : 'Имя') : 
        (filterStatus ? filterStatus : 'Статус')">

        

        <button id="filterBtn" @click="applyFilter()">Применить</button>

    </div>

      <div id="charactersBox">
        <Character v-if="charactersCount > 0" v-for="character in charactersList" :key="character.id" :character="character" />
        <div v-else="charactersCount === 0">
            <h1 >Ничего не найдено</h1>
            <p>чтобы вернуться на первоначальную страницу нажмите "Применить" еще раз</p>
        </div>
      </div>

      <div v-if="charactersCount > 0" id="listFooter">
        <div class="pageSelect">
          <button :disabled="prevDisabled" @click="loadPrevPage">&lt;</button>
          <span>Page: {{ pageCount }}</span>
          <button :disabled="nextDisabled" @click="loadNextPage">&gt;</button>
        </div>
      </div>
      
    </div>
  </template>

  <script setup>
    import { onMounted, ref } from 'vue';
    import fetchDataFromAPI from '../utils/apiFetcher';
    import Character from './Character.vue';

    const apiUrl = 'https://rickandmortyapi.com/api/';
    const charactersList = ref([]);

    const prevPageUrl = ref('');
    const nextPageUrl = ref('');
    const pageCount = ref(1);
    const prevDisabled = ref(true);
    const nextDisabled = ref(true);
    const filterBy = ref('name');
    const filterName = ref(null);
    const filterStatus = ref(null);
    const inputValue = ref('');
    const charactersCount = ref(0);

    async function loadCharacters(params){
        try {
            const apiData = await fetchDataFromAPI(apiUrl);
            let characters;
            if (params){
                let paramsStr = params.name || params.status ? '/?' + 
                (params.name && params.status ? `name=${params.name}&status=${params.status}` : 
                (params.name ? `name=${params.name}`:`status=${params.status}`))
                : '';
                characters = await fetchDataFromAPI(apiData.characters + paramsStr);
            }
            else{
                characters = await fetchDataFromAPI(apiData.characters)
            }
            for (let i = 0; i < characters.results.length; i ++){
                let episode = await fetchDataFromAPI(characters.results[i].episode[0]);
                characters.results[i].episode = episode.name;
            }
            charactersList.value = characters.results;
            prevPageUrl.value = characters.info.prev;
            nextPageUrl.value = characters.info.next;
            charactersCount.value = characters.info.count;
            prevDisabled.value = !prevPageUrl.value;
            nextDisabled.value = !nextPageUrl.value;
        } catch (error) {
            prevPageUrl.value = ''
            nextPageUrl.value = ''
            charactersList.value = []
            charactersCount.value = 0
            prevDisabled.value = true;
            nextDisabled.value = true;
        }
    }
    onMounted(loadCharacters);

    async function loadPrevPage() {
      try {
        if (prevPageUrl.value) {
          prevDisabled.value = true;
          const characters = await fetchDataFromAPI(prevPageUrl.value);
          for (let i = 0; i < characters.results.length; i ++){
                let episode = await fetchDataFromAPI(characters.results[i].episode[0]);
                characters.results[i].episode = episode.name;
            }
          charactersList.value = characters.results;
          prevPageUrl.value = characters.info.prev;
          nextPageUrl.value = characters.info.next;
          pageCount.value--;
          prevDisabled.value = !prevPageUrl.value;
          nextDisabled.value = !nextPageUrl.value;
          window.scroll(0,0);
        }
      } catch (error) {
        console.error(error);
      }
    }

    async function loadNextPage() {
      try {
        if (nextPageUrl.value) {
          nextDisabled.value = true;
          const characters = await fetchDataFromAPI(nextPageUrl.value);
          for (let i = 0; i < characters.results.length; i ++){
                let episode = await fetchDataFromAPI(characters.results[i].episode[0]);
                characters.results[i].episode = episode.name;
            }
          charactersList.value = characters.results;
          prevPageUrl.value = characters.info.prev;
          nextPageUrl.value = characters.info.next;
          pageCount.value++;
          prevDisabled.value = !prevPageUrl.value;
          nextDisabled.value = !nextPageUrl.value;
          window.scroll(0,0);
        }
      } catch (error) {
        console.error(error);
      }
    }

    async function onInput(event){
        try {
            if (filterBy.value === 'name'){
                filterName.value = event.target.value
            }
            if (filterBy.value === 'status'){
                filterStatus.value = event.target.value
            }
        } catch (error) {
            console.error(error);
        }
    }

    function applyFilter(){    
        try {
            loadCharacters({
                name: filterName.value,
                status: filterStatus.value
            });
            filterName.value = ''
            filterStatus.value = ''
            pageCount.value = 1
        } catch (error) {
            console.error(error);
        }
    }
    async function onFilter(event){
        filterBy.value = event.target.value
        inputValue.value = filterBy.value === 'name' ? filterName.value : filterStatus.value
    }
  </script>
  <style>
    #listHeader{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 8vh;
        margin: 0 auto 2rem auto;
        background: rgb(31, 32, 36);
    }

    #listHeader span{
        margin-right: 1rem;
    }

    #listHeader input{
        margin: 0 2rem;
        height: 30%;
        padding: 0 1rem;
    }
    
    #filterBtn{
        margin-left: 1rem;
        border-radius: 2px;
        height: 30%;
        width: 10%;
        padding: 0;
        font-size: 13px;
        text-align: center;
    }

    #charactersBox {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      min-width: 60vw;
      max-width: 1920px;
    }
  
    .pageSelect span {
      margin: 0 2rem;
    }
  </style>
    