<template>
  <q-layout view="hHh lpR fFf">
    <HomePageHeader />
    <HomePageDrawer />
    <q-page-container>
      <RoutingTabs />
      <h1 style="text-align: center" class="text-uppercase text-h4">
        Your coupons
      </h1>
      <div class="q-pa-md column" style="align-items: center">
        <div class="q-pa-md q-gutter-sm">
          <q-btn
            outline
            color="yellow"
            label="All coupons"
            @click="allTickets()"
          />
          <q-btn
            outline
            color="yellow"
            label="Only closed tickets"
            @click="filterClosedTickets()"
          />
          <q-btn
            outline
            color="yellow"
            label="Only won tickets"
            @click="filterTickets()"
          />
        </div>
        <div v-if="!tickets.length">No coupons</div>
        <q-list
          v-else
          v-for="(ticket, ticketid) in filteredTickets"
          :key="ticket.id"
        >
          <p class="q-pa-md">COUPON #{{ ticketid + 1 }}</p>
          <div class="q-pl-md pending" v-if="!ticket.isClosed">Pending</div>
          <div class="q-pl-md won" v-if="ticket.won && ticket.isClosed">
            WON
          </div>
          <div class="q-pl-md lost" v-if="ticket.lost && ticket.isClosed">
            LOST
          </div>
          <q-item>
            <q-item-section>
              <q-item-label>{{ ticket.bid }}$</q-item-label>
              <q-item-label caption>Bid</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ ticket.totalOdds }}</q-item-label>
              <q-item-label caption>Total odds</q-item-label>
            </q-item-section>
            <q-item-section side top>
              <q-item-label
                ><q-badge color="teal"
                  >{{ roundDecimal(ticket.bid, ticket.totalOdds) }}$</q-badge
                ></q-item-label
              >
              <q-item-label caption>Potential win</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            v-for="position in ticket.positions"
            :key="position.eventID"
            style="border: 1px solid #f9f871; border-radius: 5px"
            class="q-ma-sm"
          >
            <q-item-section>
              <q-item-label
                >{{ position.homeName }}-{{ position.awayName }}</q-item-label
              >
              <q-item-label caption>Event</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ position.odds }}</q-item-label>
              <q-item-label caption>Event odd</q-item-label>
            </q-item-section>
            <q-item-section v-if="position.choice == '0'">
              <q-item-label>{{ position.homeName }}</q-item-label>
              <q-item-label caption>Choice</q-item-label>
            </q-item-section>
            <q-item-section v-if="position.choice == '1'">
              <q-item-label>{{ position.awayName }}</q-item-label>
              <q-item-label caption>Choice</q-item-label>
            </q-item-section>
            <q-item-section v-if="position.choice == '2'">
              <q-item-label>Draw</q-item-label>
              <q-item-label caption>Choice</q-item-label>
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
      filteredTickets: [],
    };
  },
  methods: {
    roundDecimal(rate, odds) {
      return (rate * odds).toFixed(2);
    },
    sortedTickets() {
      return this.tickets.sort(
        (a, b) => new Date(b.created) - new Date(a.created)
      );
    },
    filterTickets() {
      this.filteredTickets = this.tickets.filter((x) => x.won == "true");
    },
    filterClosedTickets() {
      this.filteredTickets = this.tickets.filter((x) => x.isClosed == "true");
    },
    allTickets() {
      this.filteredTickets = this.tickets;
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
        this.tickets = this.tickets.sort(
          (a, b) => new Date(b.created) - new Date(a.created)
        );
        this.filteredTickets = this.tickets;
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
h1,
p {
  font-family: "Ubuntu", sans-serif;
  color: #f9f871;
}

.q-list {
  color: #90caf9;
  padding: 10px;
  border-radius: 4px;
  width: 400px;
  margin-bottom: 30px;
  border: 1px solid #ffffff;
}
.lost {
  border: 1px solid;
  color: #d8000c;
  background-color: #ffbaba;
  width: 30%;
}
.won {
  border: 1px solid;
  color: #4f8a10;
  background-color: #dff2bf;
  width: 30%;
}
.pending {
  border: 1px solid;
  color: #ff9800;
  background-color: #fcd59b;
  width: 30%;
}

.q-item__label--caption,
.q-item__label,
.q-item__section {
  color: #ffffff !important;
}
.coupon {
  background-color: #757575;
  color: #f9f871 !important;
  border-radius: 4px;
  border: 1px solid #ffffff;
}
</style>

