<script setup lang="ts">
import Testimonial from "./models/Testimonial.model";
import TestimonialComponent from "./components/Testimonial.vue";
import { Rating } from "./models/Rating.enum";

const testimonialSvcBaseUrl = "http://rd.kevcoder.com:3000/";

const testimonials: Testimonial[] = [new Testimonial(Rating.Five, "Kevin is so good!")];

console.log(`GET ${testimonialSvcBaseUrl}testimonials => `, testimonials);
</script>

<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" /> -->

    <div class="wrapper">
      <TestimonialComponent :testimonial="testimonials[0]" ></TestimonialComponent>
    </div>
  </header>

  <main>
    <div>Testimonial List will go here</div>
  </main>
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
