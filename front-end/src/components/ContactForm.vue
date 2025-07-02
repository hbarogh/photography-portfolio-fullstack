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
    finishedRequest.value = true;
  }
}



</script>


<template>
    <n-card bordered:true hoverable:false v-if="!finishedRequest" class="contact-form">
      <n-text class="contact-form-title">
        Get in Touch
      </n-text>
      <n-text>
        Looking for a portrait photographer in DFW? If you have any questions or want to book a session, please fill out the form below, and I will be in contact shortly. 
      </n-text>
      <n-form label-placement="top" >
        <div class="inline-name-fields">
          <n-form-item required: true >
            <n-input  v-model:value="firstName"  placeholder="First Name" clearable style="border-radius: 0.5rem;"/>
          </n-form-item>
          <n-form-item required: true >
            <n-input  v-model:value="lastName"  placeholder="Last Name" clearable style="border-radius: 0.5rem;"/>
          </n-form-item>
        </div>
        <n-form-item required: true >
          <n-input  v-model:value="email"  placeholder="Email" clearable style="border-radius: 0.5rem;" />
        </n-form-item>
        <n-form-item required: true >
          <n-input  v-model:value="phone"  placeholder="Phone" clearable style="border-radius: 0.5rem;" />
        </n-form-item>
        <n-form-item required: true >
          <n-input  v-model:value="subject"  placeholder="Subject" clearable style="border-radius: 0.5rem;" />
        </n-form-item>
        <n-form-item required: true >
          <n-input  v-model:value="message"  placeholder="Message Details" clearable style="border-radius: 0.5rem;" />
        </n-form-item>
        <div class="submit-button-wrapper">
          <n-button round primary @click="submitContactForm" style="background-color: black; color: white; width: 15rem; align-items: center; box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.4); ">
            Submit
          </n-button>
        </div>
      </n-form>
    </n-card>
    <n-card v-else>
      <n-text>Thank you so much, I will be in contact shortly!</n-text>
    </n-card>
</template>



<style>
.contact-form{
  max-width: 600px;
  width: 100%;
  height: 80vh;
  display:flex;
}

.inline-name-fields{
  display: flex;
  gap: 1rem;
}

.inline-name-fields .n-form-item{
  flex: 1;
}

.contact-form-title{
  font-size: 2.5rem;
  font-weight: bold;
  width: 100%;
  display: block;
  margin: 1rem 0;
  text-align: center;
}

.submit-button-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

</style>