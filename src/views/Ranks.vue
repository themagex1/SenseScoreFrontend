<template>
  <q-layout view="hHh lpR fFf">
    <HomePageHeader />
    <HomePageDrawer />
    <q-page-container>
      <RoutingTabs />
      <h1 style="text-align: center" class="text-uppercase text-h4">
        User standing
      </h1>
      <div class="q-pa-md column" style="align-items: center">
        <div class="q-pa-md row q-gutter-lg">
          <q-table
            :rows="rowsPointsTable"
            :columns="pointsColumns"
            title="Points"
            hide-bottom
            virtual-scroll
            card-class="bg-grey-8 text-amber-5"
            :pagination="initialPagination"
            table-class="text-amber-5"
            table-header-class="text-amber-4"
          />
          <q-table
            :rows="rowsBalanceTable"
            :columns="balanceColumns"
            title="Balance"
            hide-bottom
            virtual-scroll
            card-class="bg-grey-8 text-amber-5"
            :pagination="initialPagination"
            table-class="text-amber-5"
            table-header-class="text-amber-4"
          />
          <q-table
            :rows="rowsPointsRecentTable"
            :columns="pointsRecentColumns"
            title="Recent"
            hide-bottom
            virtual-scroll
            card-class="bg-grey-8 text-amber-5"
            :pagination="initialPagination"
            table-class="text-amber-5"
            table-header-class="text-amber-4"
          />
        </div>
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
const pointsColumns = [
  {
    name: "user",
    label: "User",
    align: "left",
    field: "user",
    sortable: true,
  },
  {
    name: "position",
    label: "Position",
    field: "position",
    sortable: true,
  },
  { name: "points", label: "Points", field: "points", sortable: true },
];

const pointsRecentColumns = [
  {
    name: "user",
    label: "User",
    align: "left",
    field: "user",
    sortable: true,
  },
  {
    name: "position",
    label: "Position",
    field: "position",
    sortable: true,
  },
  { name: "points", label: "Points", field: "points", sortable: true },
];

const balanceColumns = [
  {
    name: "user",
    label: "User",
    align: "left",
    field: "user",
    sortable: true,
  },
  {
    name: "position",
    label: "Position",
    field: "position",
    sortable: true,
  },
  { name: "balance", label: "Balance", field: "points", sortable: true },
];

export default {
  name: "Ranks",
  components: { HomePageHeader, RoutingTabs, HomePageDrawer },
  setup() {
    return {
      toggleTable: true,
      value: ref(true),
      pointsColumns,
      pointsRecentColumns,
      balanceColumns,
      initialPagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 10,
      },
    };
  },
  data() {
    return {
      loading: true,
      errored: false,
      rowsPointsTable: [],
      rowsBalanceTable: [],
      rowsPointsRecentTable: [],
    };
  },
  methods: {},
  mounted() {
    const requestOne = axios.request({
      method: "get",
      baseURL: url + "Rank/all",
      headers: {
        Authorization: "Bearer " + bearer,
      },
    });
    const requestTwo = axios.request({
      method: "get",
      baseURL: url + "Rank/balance",
      headers: {
        Authorization: "Bearer " + bearer,
      },
    });
    const requestThree = axios.request({
      method: "get",
      baseURL: url + "Rank/recent",
      headers: {
        Authorization: "Bearer " + bearer,
      },
    });
    axios.all([requestOne, requestTwo, requestThree]).then(
      axios.spread((...responses) => {
        const responseOne = responses[0].data;
        const responseTwo = responses[1].data;
        const responseThree = responses[1].data;
        this.rowsPointsTable = responseOne;
        this.rowsBalanceTable = responseTwo;
        this.rowsPointsRecentTable = responseThree;
      })
    );
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
  background-color: #757575;
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

