<template>
  <div class="testimonial" v-if="inEditMode">
    <h2>Add Your Testimonial</h2>
    <div>
      <label for="rating">Rating:</label>
      <select id="rating" v-model="data.rating">
        <option value=""></option>
        <option :value="Rating.One">{{ Rating[Rating.One] }}</option>
        <option :value="Rating.Two">{{ Rating[Rating.Two] }}</option>
        <option :value="Rating.Three">{{ Rating[Rating.Three] }}</option>
        <option :value="Rating.Four">{{ Rating[Rating.Four] }}</option>
        <option :value="Rating.Five">{{ Rating[Rating.Five] }}</option>
      </select>
    </div>
    <div>
      <label for="comment">Comment:</label>
      <textarea id="comment" v-model="data.text"></textarea>
    </div>
    <div>
      <label for="name">Name:</label>
      <input id="name" type="text" v-model="data.name" />
    </div>
  </div>

  <div
    v-bind:id="`testimonialid-${data._id}`"
    class="testimonial-report"
    v-if="!inEditMode"
    style="padding-bottom: 1em"
  >
    <p>Rating &nbsp; : &nbsp;{{ data.rating }}</p>
    <p>{{ data.text }}</p>
    <p>
      <span style="text-align: right"> -- {{ data.name }}</span>
      <span>{{ data.createdAt }}</span>
    </p>
    <hr style="border-style: dashed" />
  </div>
</template>

<script setup lang="ts">
import { Rating } from "@/models/Rating.enum";
import Testimonial from "@/models/Testimonial.model";
const props = defineProps({
  testimonial: {
    type: Object as () => Testimonial,
    required: false,
    default: () => new Testimonial(Rating.Four, "I love this service"),
  },
  inEditMode: {
    type: Boolean,
    default: false,
  },
});

const data: Testimonial = props.testimonial;
</script>

<style scoped>
.testimonial {
  max-width: 600px;
  margin: 0 auto;
}
.testimonial textarea,
input,
select {
  border-style: dashed;
  margin-left: 3px;
}
form {
  margin-bottom: 20px;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin-bottom: 10px;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
}
button {
  margin-right: 5px;
}
</style>
