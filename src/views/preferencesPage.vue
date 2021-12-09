<template>
  <div class="content">
    <MainPageHeader/>
    <q-page-container>
      <div class="fit row wrap container">
        <div class="col self-center column-1">
          <div class="header">
            <h2>
              Choose your preferences
            </h2>
          </div>
          <div class="section-athlete">
            <h4>
              Are you interested in an individual athlete?
            </h4>
            <addAthlete/>

          </div>
          <div class="section-league">
            <h4>
              Are you interested in a league?
            </h4>
            <addLeague/>
          </div>
          <div class="section-team">
            <h4>
              Are you interested in a team?
            </h4>
            <addTeam/>
          </div>
          <div class="section-sport">
            <h4>
              or maybe you are interested in a sports discipline?
            </h4>
            <addSport/>
          </div>

          <q-btn color="light-blue-14"
                 text-color="grey-9"
                 class="finish-button">
            Finish
          </q-btn>

        </div>
      </div>
    </q-page-container>
  </div>
</template>

<script>
import MainPageHeader from '@/components/MainPageHeader'
import addAthlete from '@/components/addAthlete'
import addLeague from '@/components/addLeague'
import addTeam from '@/components/addTeam'
import addSport from '@/components/addSport'

export default {
  name: 'preferencesPage',
  components: {
    MainPageHeader,
    addAthlete,
    addLeague,
    addTeam,
    addSport
  }
}
</script>

<style scoped lang="scss">
@import "../quasar.variables";

.container {
  text-align: center;
}

h2, h4 {
  color: $light-blue-14;
  font-family: "News of the World";
  margin-bottom: 2vh;
  margin-top: 4vh;
}

.finish-button {
  margin-top: 3vh;
  font-family: "News of the World";
  font-size: 1.2vw;
  width: 10vw;

}
</style>
