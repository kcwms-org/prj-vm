<script setup lang="ts">
import Carousel from 'primevue/carousel';
import { ref } from "vue";
import TestimonialComponent from "./components/TestimonialComponent.vue";
import Testimonial from "./models/Testimonial.model";
import api from "./services/ApiService";

const testimonialSvcBaseUrl = import.meta.env.VITE_SERVER_URL || "http://tbd/";

const apiSvc = new api<Testimonial>(testimonialSvcBaseUrl);

const testimonial = ref<Testimonial>(new Testimonial(5, ""));
const existingTestimonials = ref<Testimonial[]>([]);
const responsiveOptions = ref([
  {
    breakpoint: '1400px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '1199px',
    numVisible: 3,
    numScroll: 1
  },
  {
    breakpoint: '767px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '575px',
    numVisible: 1,
    numScroll: 1
  }
]);

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
  if (!testimonial.value._id) {
    testimonial.value.createdAt = new Date();
  }

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
    <!--

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
    -->

  </header>

  <main>

    <Carousel :value="existingTestimonials" :numVisible="2" :numScroll="1" :responsiveOptions="responsiveOptions"
      circular :autoplayInterval="3000">
      <template #item="testimonial">
        <TestimonialComponent :key="testimonial.data._id" :testimonial="testimonial.data">
        </TestimonialComponent>
      </template>
    </Carousel>

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
