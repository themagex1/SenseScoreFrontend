<template>
  <q-layout view="hHh lpR fFf">
    <HomePageHeader />
    <HomePageDrawer />
    <q-page-container>
      <RoutingTabs />
      <h1 style="text-align: center">Your coupons</h1>
      <div class="q-pa-md column" style="align-items: center">
        <div v-if="!tickets.length">No coupons</div>
        <q-list
          v-else
          v-for="ticket in tickets"
          :key="ticket.id"
          style="width: 400px; border: 1px solid blue; margin-bottom: 20px"
        >
          <p class="q-pa-md">COUPON</p>
          <q-item>
            <q-item-section>
              <q-item-label>{{ ticket.rate }}$</q-item-label>
              <q-item-label caption>Bid</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ ticket.totalOdds }}</q-item-label>
              <q-item-label caption>Total odds</q-item-label>
            </q-item-section>
            <q-item-section side top>
              <q-item-label
                ><q-badge color="teal"
                  >{{ roundDecimal(ticket.rate, ticket.totalOdds) }}$</q-badge
                ></q-item-label
              >
              <q-item-label caption>Potential win</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-for="position in ticket.positions" :key="position.eventID">
            <q-item-section>
              <q-item-label>{{ position.eventID }}</q-item-label>
              <q-item-label caption>Event ID</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ position.odds }}</q-item-label>
              <q-item-label caption>Event odd</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-page-container>
  </q-layout>
</template>
<script>
import { ref } from "vue";
import axios from "axios";
import HomePageHeader from "@/components/HomePageHeader";
import HomePageDrawer from "@/components/HomePageDrawer";
import RoutingTabs from "@/components/RoutingTabs";
const bearer = localStorage.getItem("bearer");

let url = "https://localhost:5001/api/";

export default {
  name: "Coupons",
  components: { HomePageHeader, RoutingTabs, HomePageDrawer },
  setup() {
    return {
      value: ref(true),
    };
  },
  data() {
    return {
      loading: true,
      errored: false,
      tickets: [],
    };
  },
  methods: {
    roundDecimal(rate, odds) {
      return (rate * odds).toFixed(2);
    },
  },
  mounted() {
    axios
      .request({
        method: "get",
        baseURL: url + "Betting/tickets",
        headers: {
          Authorization: "Bearer " + bearer,
        },
      })
      .then((response) => {
        this.tickets = response.data;
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
};
</script>

<style scoped>
</style>

