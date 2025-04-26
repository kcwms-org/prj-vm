<script setup lang="ts">
import Testimonial from "./models/Testimonial.model";
import TestimonialComponent from "./components/Testimonial.vue";
import api from "./services/ApiService";
import { ref } from "vue";

const testimonialSvcBaseUrl = "http://rd.kevcoder.com:3000/";

const apiSvc = new api<Testimonial>(testimonialSvcBaseUrl);

let testimonial = ref<Testimonial>(new Testimonial(5, ""));
const existingTestimonials = ref<Testimonial[]>([]);

function getTestimonials(testimonialToHighlight?: string) {
  apiSvc
    .get("testimonials")
    .then((response) => {
      existingTestimonials.value = response;
      console.log(`GET ${testimonialSvcBaseUrl}testimonials => `, existingTestimonials);

      if (testimonialToHighlight) {
        const testimonialElement = document.querySelector(
          `#testimonialid-${testimonialToHighlight}`
        );
        if (testimonialElement) {
          testimonialElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    })
    .catch((error) => {
      console.error(`Error fetching from ${testimonialSvcBaseUrl}testimonials:`, error);
    });
}

function saveTestimonial() {
  apiSvc
    .post("testimonials", testimonial.value)
    .then((response) => {
      console.log(`POST ${testimonialSvcBaseUrl}testimonials => `, response);
      if (response.acknowledged) {
        testimonial.value = new Testimonial(5, "");
        getTestimonials(response.insertedId);
      } else {
        console.error(`Error posting to ${testimonialSvcBaseUrl}testimonials:`, response);
      }
    })
    .catch((error) => {
      console.error(`Error posting to ${testimonialSvcBaseUrl}testimonials:`, error);
    });
}

getTestimonials();
</script>

<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" /> -->

    <div class="wrapper">
      <div class="wrapper-testimonial">
        <TestimonialComponent
          :in-edit-mode="true"
          :testimonial="testimonial"
        ></TestimonialComponent>
      </div>
      <div class="wrapper-button">
        <button @click="saveTestimonial">Save</button>
      </div>
    </div>
  </header>

  <main>
    <TestimonialComponent v-for="t in existingTestimonials" :testimonial="t"></TestimonialComponent>
  </main>

  <pre style="max-width: 600px; font-family: 'Lucida Console'">
      {{ JSON.stringify(testimonial, null, 2) }}
    </pre
  >
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
