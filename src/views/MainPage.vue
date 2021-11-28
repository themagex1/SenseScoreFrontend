<template>
  <div class="content">
    <MainPageHeader />
    <q-page-container>
      <div class="fit row wrap container">
        <div class="col self-center column-1">
          <div class="big-desc">
            <h1 class="text-light-blue-14 title">YOUR LEAGUE</h1>
            <h1 class="text-light-blue-14 title">YOUR MATCH</h1>
            <div class="row justify-center">
              <LoginPopUp />
              <RegisterPopup />
              <Button @click="signInWithGoogle()"> Sign in with Google </Button>
            </div>
          </div>

          <div class="description__left text-light-blue-14">
            Sense Score jest serwisem w którym możesz zarządzać swoimi
            ulubionymi zespołami sportowymi oraz zagrać w wirtualną grę
            bukmacherską.
          </div>
        </div>
        <div class="col self-center column-2">
          <div class="section__carousel text-center items-center">
            <q-carousel
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
              <q-carousel-slide :name="1" img-src="@/assets/pilka-nozna.jpeg" />
              <q-carousel-slide :name="2" img-src="@/assets/koszykowka.jpeg" />
              <q-carousel-slide
                :name="3"
                img-src="@/assets/tenis-ziemny.jpeg"
              />
              <q-carousel-slide :name="4" img-src="@/assets/pilka-nozna.jpeg" />
              <q-carousel-slide
                :name="5"
                img-src="@/assets/tenis-ziemny.jpeg"
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

      <q-footer elevated class="footer" v-if="cookiesPolicyAccepted">
        <q-toolbar style="">
          <div class="footer__box self-center">
            <div class="footer__box-text text-center">
              <span class="text-weight-bold"> Ważna informacja!</span>
              Ta strona korzysta z plików cookies do przechowywania informacji
              na Twoim komputerze. Aby uzyskać szczegółowe informacje na temat
              blokowania plików cookies, zapoznaj się z polityką cookies
            </div>
          </div>
          <q-space />
          <q-btn @click="acceptCookiesPolicy">
            Akceptuję politykę cookies</q-btn
          >
        </q-toolbar>
      </q-footer>
    </q-page-container>
  </div>
</template>

<script>
import { ref } from "vue";
import LoginPopUp from "@/components/loginPopUp";
import RegisterPopup from "@/components/registerPopUp";
import MainPageHeader from "@/components/MainPageHeader";
import FetchHelper from "@/helpers/fetchHelper";
import { setAuthToken, setLoggedInEmail } from "@/services/sessionProps";

export default {
  name: "MainPage",
  components: {
    MainPageHeader,
    LoginPopUp,
    RegisterPopup,
  },
  setup() {
    return {
      autoplay: ref(true),
      slide: ref(1),
    };
  },
  data() {
    return {
      cookiesPolicyAccepted: true,
    };
  },
  methods: {
    acceptCookiesPolicy() {
      this.cookiesPolicyAccepted = false;
    },
    async signInWithGoogle() {
      try {
        const fetchHelper = new FetchHelper();
        const googleUser = await this.$gAuth.signIn();
        var id_token = googleUser.getAuthResponse().id_token;
        const response = await fetch(
          "https://localhost:5001/Account/google-request",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id_token,
            }),
          }
        )
          .then(fetchHelper.handleErrors)
          .then((res) => res.json());
        localStorage.setItem("bearer", response.access_token);
        setAuthToken(response.access_token);
        console.log(googleUser);
        setLoggedInEmail(googleUser.Email);

        await this.$router.push({
          name: "home",
        });
      } catch (e) {
        setAuthToken(null);
        setLoggedInEmail(null);
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "../quasar.variables";

.container {
  margin: 2vh auto;
}

.description__left {
  color: white;
  max-width: 400px;
  margin: 40px auto;
  font-family: "News of the World";
  font-size: 1.1vw;
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
  border: 1.5em solid $light-blue-14;
  border-radius: 20px;
  box-shadow: 10px 10px 10px 5px $light-blue-14;
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
</style>
