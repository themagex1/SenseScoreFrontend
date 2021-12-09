<template>
  <div class="content">
    <q-btn class="bg-light-blue-14 button__add " @click="card=true">
      Add sport
    </q-btn>
    <q-dialog v-model="card" class="justify-center dialog" style="background-color: rgba(0, 0, 0, 0.8)">
      <q-card class="flex flex-center column bg-light-blue-14 popUp">
        <div class="row flex-center container">
          <div class="col column__1">
            <div class="popUp__header">
              <h4>
                Add Sport
              </h4>
            </div>
            <div class="main-content">
              <q-input standout
                       bg-color="grey-9"
                       label="Sport name"
                       label-color="light-blue-14"
                       type="text"
                       v-model="sport">

              </q-input>
              <q-btn color="grey-9"
                     text-color="light-blue-14"
                     class="search-button">
                Search
              </q-btn>
              <div>
                Znaleziony GET
              </div>
              <q-btn color="grey-9"
                     text-color="light-blue-14"
                     class="add-button">
                Add
              </q-btn>
            </div>


          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: 'addSport',
  data () {
    return {
      card: false,
      sport: ""
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/quasar.variables";

.button__add {
  color: $grey-9;
  font-family: "News of the World";
  width: 10vw;
  font-size: 1.1vw;
}

.popUp {
  border-radius: 25px 0 25px 0;
  min-width: 30vw;
  min-height: 40vh;
  border: 10px solid $grey-9;
}

.popUp__header {
  color: $grey-9;
  font-family: "News of the World";
}
</style>
