<template>
  <q-layout view="hHh lpR fFf">
    <HomePageHeader/>

    <q-page-container>

      <div class="q-pa-lg">
        <div class="pageTitle">
          First, choose your favourites sports
        </div>
        <q-separator style="background-color: yellow; margin-bottom: 30px"/>

        <q-list class="q-gutter-y-xl row" style="justify-content: flex-start">
          <q-item
              v-ripple
              v-for="sport in sports"
              :key="sport.idSport"
              class="text-yellow"
          >
            <q-item-section>
              <div>{{ sport.strSport }}</div>
              <q-item-section thumbnail>
                <img :src="sport.strSportThumb"/>
              </q-item-section>
            </q-item-section>

            <q-item-section side bottom>
              <q-btn
                  v-bind:class="{ active: mySports(sport.idSport) }"
                  flat
                  round
                  icon="favorite"
                  @click="
                  checkFav(sport.idSport, 'sport')
                    ? deleteFav('sport', sport.idSport)
                    : addFavSport('sport', sport.idSport)
                "
              />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div class="skip">
        <q-btn class="button" @click="skip" label="Next step">

        </q-btn>
      </div>



    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import HomePageHeader from '@/components/HomePageHeader'

import axiosR from '../services/api'

let url = 'api/SportDB/'
const bearer = localStorage.getItem('bearer')

export default {
  name: 'preferencesSports',
  components: { HomePageHeader },
  setup () {
    return {
      value: ref(true),
      text: ref(''),
    }
  },
  data () {
    return {
      loading: true,
      errored: false,
      searchResult: [],
      searchPlayerResult: [],
      sports: [],
      leagues: [],
      filteredLeagues: [],
      favouriteSports: [],
      favouriteTeams: [],
      favouriteLeagues: [],
      favouriteAthletes: [],
    }
  },
  methods: {
    mySports: function (id) {
      let result = false
      for (let i = 0; i < this.favouriteSports.length; i++)
        if (this.favouriteSports[i].idSport === id) result = true
      return result
    },

    removeFav (category, id) {
      axiosR({
        method: 'delete',
        baseURL: 'api/Account/favourite',
        headers: {
          Authorization: 'Bearer ' + bearer,
        },
        data: {
          category: category,
          id: id,
        },
      })
          .then(function (response) {
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
          })
    },
    checkFav (id, object) {
      switch (object) {
        case 'sport': {
          if (this.favouriteSports.filter((x) => x.idSport == id).length)
            return true
          else return false
        }

      }
    },
    postFav (category, id) {
      axiosR({
        method: 'post',
        baseURL: 'api/Account/favourite',
        headers: {
          Authorization: 'Bearer ' + bearer,
        },
        data: {
          category: category,
          id: id,
        },
      })
          .then(function (response) {
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
          })
    },
    deleteFav (category, id) {
      this.removeFav(category, id)
      switch (category) {
        case 'sport': {
          this.favouriteSports = this.favouriteSports.filter(
              (x) => x.idSport !== id
          )
          break
        }

      }
    },
    addFavSport (category, id) {
      this.postFav(category, id)
      axiosR
          .request({
            method: 'get',
            baseURL: url + `favourite/sports`,
            headers: {
              Authorization: 'Bearer ' + bearer,
            },
          })
          .then((response) => {
            this.favouriteSports = response.data
          })
          .catch((error) => {
            console.log(error)
            this.errored = true
          })
          .finally(() => (this.loading = false))
    },


    skip() {
      this.$router.push({name: 'preferencesOther'})
    }
  },
  mounted () {
    axiosR
        .get(url + 'sports')
        .then(
            (response) =>
                (this.sports = response.data.sort((a, b) => {
                  return a.strSport.localeCompare(b.strSport)
                }))
        )
        .catch((error) => {
          console.log(error)
          this.errored = true
        })
        .finally(() => (this.loading = false))

    axiosR
        .request({
          method: 'get',
          baseURL: url + 'favourite/sports',
          headers: {
            Authorization: 'Bearer ' + bearer,
          },
        })
        .then((response) => {
          this.favouriteSports = response.data
        })
        .catch((error) => {
          console.log(error)
          this.errored = true
        })
        .finally(() => (this.loading = false))

  },
}
</script>

<style scoped lang="scss">
@import "../quasar.variables";
@import url("https://fonts.googleapis.com/css2?family=Mochiy+Pop+One&family=Ubuntu&display=swap");

.q-item,
q.input,
q.list {
  font-family: "Ubuntu", sans-serif;
}

.active {
  color: yellow !important;
}

.pageTitle {
  text-align: center;
  font-size: 70px;
  color: yellow;
  font-family: "News of the World";
  letter-spacing: 2px;
  text-transform: uppercase;
}

.button {
  background-color: $light-blue-14;
  font-family: "News of the World";
  font-size: 30px;
  width: 200px;
  letter-spacing: 2px;
  margin-left: 85%;
}
</style>
