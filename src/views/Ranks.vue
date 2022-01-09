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
        <q-table
          title="Rank"
          :rows="rows"
          :columns="columns"
          row-key="name"
          :pagination="initialPagination"
        />
      </div>
    </q-page-container>
  </q-layout>
</template>
<script>
import { ref } from "vue";
//import axios from "axios";
import HomePageHeader from "@/components/HomePageHeader";
import HomePageDrawer from "@/components/HomePageDrawer";
import RoutingTabs from "@/components/RoutingTabs";
//const bearer = localStorage.getItem("bearer");

//let url = "https://localhost:5001/api/";
const columns = [
  {
    name: "name",
    required: true,
    label: "Dessert (100g serving)",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "calories",
    align: "center",
    label: "Calories",
    field: "calories",
    sortable: true,
  },
  { name: "fat", label: "Fat (g)", field: "fat", sortable: true },
  { name: "carbs", label: "Carbs (g)", field: "carbs" },
  { name: "protein", label: "Protein (g)", field: "protein" },
  { name: "sodium", label: "Sodium (mg)", field: "sodium" },
  {
    name: "calcium",
    label: "Calcium (%)",
    field: "calcium",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: "iron",
    label: "Iron (%)",
    field: "iron",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
];

const rows = [
  {
    name: "Frozen Yogurt",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: "14%",
    iron: "1%",
  },
  {
    name: "Ice cream sandwich",
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: "8%",
    iron: "1%",
  },
  {
    name: "Eclair",
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: "6%",
    iron: "7%",
  },
  {
    name: "Cupcake",
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: "3%",
    iron: "8%",
  },
  {
    name: "Gingerbread",
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: "7%",
    iron: "16%",
  },
  {
    name: "Jelly bean",
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: "0%",
    iron: "0%",
  },
  {
    name: "Lollipop",
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: "0%",
    iron: "2%",
  },
  {
    name: "Honeycomb",
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: "0%",
    iron: "45%",
  },
  {
    name: "Donut",
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: "2%",
    iron: "22%",
  },
  {
    name: "KitKat",
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: "12%",
    iron: "6%",
  },
];

export default {
  name: "Ranks",
  components: { HomePageHeader, RoutingTabs, HomePageDrawer },
  setup() {
    return {
      value: ref(true),
      columns,
      rows,
      initialPagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 10,
        // rowsNumber: xx if getting data from a server
      },
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
  methods: {},
  mounted() {},
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

