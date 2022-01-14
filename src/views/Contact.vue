<template>
  <div class="content">
    <MainPageHeader/>
    <q-page-container class="q-pa-md">
      <div class="row">
        <div class="col">
          <div class="header">Contact</div>
        </div>
      </div>

      <q-separator class="separator"/>

      <div class="row">
        <div class="col">
          <div class="text-center small-desc">
            for all enquiries, please email us using the form below
          </div>
          <div class="question">
            How we can help you?
          </div>
          <q-form align="center">
            <q-input class="text-field"
                     outlined
                     bg-color="white"
                     v-model="textArea"
                     type="textarea"
                     label="Here write a message">
            </q-input>
            <q-btn label="Send" class="bg-light-blue-14 text-grey-9 submitButton">
            </q-btn>

          </q-form>
        </div>
      </div>
    </q-page-container>
  </div>
</template>

<script>
import MainPageHeader from '@/components/MainPageHeader'

export default {
  name: 'Contact',
  components: { MainPageHeader },
  data () {
    return {
      textArea: ''
    }
  }
}
</script>

<style scoped lang="scss">
@import "../quasar.variables";

.separator {
  background-color: $light-blue-14;

}

.header {
  font-family: "News of the World", serif;
  color: $light-blue-14;
  font-size: 7vw;
  margin-top: 2vh;
  margin-bottom: 1vh;
  letter-spacing: 0.5vw;
  text-align: center;


}

.small-desc {
  color: $light-blue-14;
  margin-top: 4vh;
  font-size: 2vh;
  word-spacing: 0.2vh;
}

.question {
  font-size: 4vh;
  color: $light-blue-14;
  margin-top: 10vh;
  min-width: 1vh;
  text-align: center;
  margin-bottom: 2vh;
}

.text-field {
  max-width: 50%;
  margin: 0 auto;


}

.submitButton {
  font-family: "News of the World";
  font-size: 3vh;
  letter-spacing: 0.2vw;
  margin-top: 3vh;

  @media (max-width: $phone-max-width) {
    .submitButton {
      width: 3vw;
    }
  }

}

@media (max-width: $phone-max-width) {
  .header{
    font-size: 10vh;
  }
}


</style>
