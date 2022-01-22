<template>
  <div class="content">
    <MainPageHeader/>
    <q-page-container>
      <div class=" row wrap container">
        <div class="col self-center column-1">
          <div class="big-desc">
            <h1 class="text-light-blue-14 title">YOUR LEAGUE</h1>
            <h1 class="text-light-blue-14 title">YOUR MATCH</h1>
            <div class="row wrap justify-center buttons">
              <LoginPopUp class="login-button"/>
              <RegisterPopup class="register-button"/>
              <q-btn
                  outline
                  text-color="light-blue-14"
                  @click="signInWithGoogle"
                  class="google-button"
              >
                <img src="https://img.icons8.com/ios-filled/50/4a90e2/google-logo.png"/>
              </q-btn>
            </div>
          </div>

          <div class="description__left text-light-blue-14">
            Sense Score is a sport service where you can manage your favourite sport teams, leagues or athletes.
            Also try our virtual betting game.
          </div>
        </div>
        <div class="col self-center column-2">
          <div class="section__carousel text-center items-center">
            <q-carousel
                class="carousel"
                animated
                v-model="slide"
                arrows
                navigation
                infinite
                :autoplay="autoplay"
                transition-next="slide-left"
                transition-prev="slide-right"
                @mouseleave="autoplay = true"
                @mouseenter="autoplay = false"
            >
              <q-carousel-slide :name="1" img-src="@/assets/Karuzela-1.jpg"/>
              <q-carousel-slide :name="2" img-src="@/assets/Karuzela-2.jpg"/>
              <q-carousel-slide
                  :name="3"
                  img-src="@/assets/Karuzela-3.jpg"
              />

            </q-carousel>
          </div>

          <div class="icon-description"></div>
        </div>
        <div
            class="col column-3"
            style="
            overflow: auto;
            min-width: 100%;
            max-width: 100%;
            position: fixed;
            left: 0;
            bottom: 0;
          "
        >
          <div class="image__marquee"></div>
        </div>
      </div>

      <q-footer elevated class="footer" v-if="!cookiesPolicyAccepted">
        <q-toolbar style="">
          <div class="footer__box self-center">
            <div class="footer__box-text text-center">
              <span class="text-weight-bold"> Important notice!</span>
              This webpage uses cookies to store data on your computer. To gain detailed information about block
              cookies, check out cookie policy. These choices will be signaled to our partners and will not affect
              browsing data.
            </div>
          </div>
          <q-space/>
          <q-btn @click="acceptCookiesPolicy">
            Accept cookie policy
          </q-btn
          >
        </q-toolbar>
      </q-footer>
    </q-page-container>
  </div>
</template>

<script>
import { ref } from 'vue'
import LoginPopUp from '@/components/loginPopUp'
import RegisterPopup from '@/components/registerPopUp'
import MainPageHeader from '@/components/MainPageHeader'
import FetchHelper from '@/helpers/fetchHelper'
import { setAuthToken, setLoggedInEmail } from '@/services/sessionProps'

export default {
  name: 'MainPage',
  components: {
    MainPageHeader,
    LoginPopUp,
    RegisterPopup,
  },
  setup () {
    return {
      autoplay: ref(true),
      slide: ref(1),
    }
  },
  data () {
    return {
      cookiesPolicyAccepted: false,
    }
  },
  methods: {
    acceptCookiesPolicy () {
      this.cookiesPolicyAccepted = true
      sessionStorage.setItem('cookiesPolicyAccepted', 'true')
    },
    async signInWithGoogle () {
      try {
        const fetchHelper = new FetchHelper()
        const googleUser = await this.$gAuth.signIn()
        let id_token = googleUser.getAuthResponse().id_token
        const response = await fetch(
            'api/Account/google-request',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id_token,
              }),
            }
        )
            .then(fetchHelper.handleErrors)
            .then((res) => res.json())
        localStorage.setItem('googleID', id_token)
        localStorage.setItem('bearer', response.access_token)
        localStorage.setItem('user', googleUser.zu.qf)
        localStorage.setItem('accessToken', response.access_token)
        localStorage.setItem('accountFlag', '1')
        setAuthToken(response.access_token)
        localStorage.setItem('refreshToken', response.refresh_token)
        if(!response.initialized)
        {
          await this.$router.push({
            path: 'preferencesSports'
          })
        } else
        {
          await this.$router.push({
            name: 'home'
          })
        }

      } catch (e) {
        setAuthToken(null)
        setLoggedInEmail(null)
      }
    },
  },
  mounted () {
    this.cookiesPolicyAccepted = sessionStorage.getItem('cookiesPolicyAccepted') === 'true'

  },

}
</script>

<style scoped lang="scss">
@import "../quasar.variables";

.container {
  margin: 2vh auto;
}

.description__left {
  color: white;
  max-width: 600px;
  margin: 40px auto;
  font-family: "News of the World", serif;
  font-size: 25px;
}

.title {
  font-size: 7vw;
  text-align: center;
  font-family: "News of the World", serif;
  margin: 10vh auto;
}

.section__carousel {
  margin-right: 5%;
  margin-left: 5%;
  border: 1em solid yellow;
  border-radius: 10px;
  box-shadow: 5px 5px 8px 5px $light-blue-14;
}

.image__marquee {
  height: 50px; /* Any size you want */
  background-image: url("../assets/soccersi.jpeg");
  animation: imageMovement 8s linear infinite;
  @keyframes imageMovement {
    100% {
      background-position-x: 728px; /* width of the image */
    }
  }
}

.footer {
  background-color: rgba(0, 145, 234, 0.9);
  height: 70px;
  max-width: 80vw;
  margin: 0 auto 10px;
  border-radius: 15px;
}

.footer__box {
  margin: 1em auto;
}

.footer__box-text {
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: $grey-9;
}

.google-button {
  font-size: 30px;
  width: 80px;

  font-family: "News of the World";
  color: $grey-9;
  height: 6vh;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 1vw;
}

.google-image {
  max-width: 1.2vw;
  background-color: $light-blue-14;
  margin-left: 0.2vw;
}
@media (max-width: 800px) {
  .container {
    flex-direction: column;
    .title {
      font-size: 7em;
    }
  }
  .section__carousel {
    display: none;
  }
}
@media (max-width: $phone-max-width) {
  .container {
    flex-direction: column;
    margin: 0 auto;
    padding: 0 1px;
  }
  .description__left {
    margin-top: -2px;
  }
  .title {
    font-size: 7em;
  }


}
@media (max-width: 500px) {
  .title {
    margin-top: 30px;
    margin-bottom: 30px;
    max-width: 90%;

  }
  .buttons {
    flex-direction: column;
    align-items: center;
    margin-bottom: 50px;
  }
  .description__left {
    display: none;
  }
}
@media (max-width: 400px) {
  .title {
    margin-top: 20px;
    margin-bottom: 30px;
  }
  .description__left {
    max-width: 200px;
  }
  .buttons {
    margin-top: 10px;
    margin-bottom: 60px;
  }
}

@import url(https://fonts.googleapis.com/css?family=Roboto:500);
</style>
