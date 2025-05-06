<script setup lang="ts">
import {NCard, NInput, NFormItem, NForm, NButton, NText} from 'naive-ui';
import axios from 'axios';
import { ref } from 'vue';


const firstName = ref<string>('');
const lastName = ref<string>('');
const email = ref<string>('');
const phone = ref('');
const subject = ref<string>('');
const message = ref<string>('');
const finishedRequest = ref(false);


async function submitContactForm(): Promise<void> {
  try{
    const response = await axios.post(`https://backend-3497.onrender.com/api/contact`, {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      phone: phone.value,
      subject: subject.value,
      message: message.value
    });
    console.log(`Response from post request: ${response.data}`);
  }
  catch (error){
    alert(`Axios error: ${error}`);
    console.error('Axios error: ', error);
  }
  finally{
    //finsihed the post request, so I am setting the finished request value to true, and displaying a new page for that
    finishedRequest.value = true;
  }
}


</script>


<template>
  <div>
    <h1>Contact Page</h1>
    <n-card bordered:true hoverable:false v-if="!finishedRequest">
      <n-text>
        Looking for a portrait photographer in DFW? If you have any questions or want to book a session, please fill out the form below, and I will be in contact shortly. 
      </n-text>
      <n-form label-placement="top">
        <n-form-item required:true>
          <n-input v-model:value="firstName" round placeholder="First Name"/>
        </n-form-item>
        <n-form-item required:true>
          <n-input v-model:value="lastName" round placeholder="Last Name"/>
        </n-form-item>
        <n-form-item required:true>
          <n-input v-model:value="email" round placeholder="Email"/>
        </n-form-item>
        <n-form-item required:true>
          <n-input v-model:value="phone" round placeholder="Phone"/>
        </n-form-item>
        <n-form-item required:True>
          <n-input v-model:value="subject" round placeholder="Subject"/>
        </n-form-item>
        <n-form-item required:true>
          <n-input v-model:value="message" round placeholder="Message Details" />
        </n-form-item>
        <n-button round primary @click="submitContactForm">
          Submit
        </n-button>
      </n-form>
    </n-card>
    <n-card v-else>
      <n-text>Thank you so much, I will be in contact shortly!</n-text>
    </n-card>
  </div>
</template>



<style>
</style>