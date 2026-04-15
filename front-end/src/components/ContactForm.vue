<script setup lang="ts">
import {NCard, NInput, NFormItem, NForm, NButton, NText} from 'naive-ui';
import type { FormInst, FormRules } from 'naive-ui';
import axios from 'axios';
import { ref } from 'vue';


const firstName = ref<string>('');
const lastName = ref<string>('');
const email = ref<string>('');
const phone = ref('');
const subject = ref<string>('');
const message = ref<string>('');
const finishedRequest = ref(false);

const formRef = ref<FormInst | null>(null);

const formValue = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
});

const rules: FormRules = {
  firstName: [
    { required: true, message: 'First name is required', trigger: ['input', 'blur'] }
  ],
  lastName: [
    { required: true, message: 'Last name is required', trigger: ['input', 'blur'] }
  ],
  email: [
    { required: true, message: 'Email is required', trigger: ['input', 'blur'] },
    { type: 'email', message: 'Enter a valid email address', trigger: ['blur', 'input'] }
  ],
  phone: [
    { required: true, message: 'Phone number is required', trigger: ['input', 'blur'] },
  ],
  subject: [
    { required: true, message: 'Subject is required', trigger: ['input', 'blur'] }
  ],
  message: [
    { required: true, message: 'Message is required', trigger: ['input', 'blur'] },
    { min: 10, message: 'Message must be at least 10 characters', trigger: ['input', 'blur'] }
  ]
};

async function submitContactForm(): Promise<void> {
  if (!formRef.value) return; 

  try{
    await formRef.value.validate();
    await axios.post(`https://backend-3497.onrender.com/api/contact`, {
      firstName: formValue.value.firstName,
      lastName: formValue.value.lastName,
      email: formValue.value.email,
      phone: formValue.value.phone,
      subject: formValue.value.subject,
      message: formValue.value.message
    });
    finishedRequest.value = true; 
  }
  catch (error){
    console.error("error in catch statement: ", error);
    alert(`Failed to submit contact form, error: ${error}`);
    finishedRequest.value = false;
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
      <n-form 
        ref="formRef"
        :model="formValue"
        :rules="rules"
        label-placement="top" 
      >
        <div class="inline-name-fields">
          <n-form-item path="firstName" >
            <n-input  v-model:value="formValue.firstName"  placeholder="First Name" clearable style="border-radius: 0.5rem;"/>
          </n-form-item>
          <n-form-item path="lastName">
            <n-input  v-model:value="formValue.lastName"  placeholder="Last Name" clearable style="border-radius: 0.5rem;"/>
          </n-form-item>
        </div>
        <n-form-item path="email">
          <n-input  v-model:value="formValue.email"  placeholder="Email" clearable style="border-radius: 0.5rem;" />
        </n-form-item>
        <n-form-item path="phone">
          <n-input  v-model:value="formValue.phone"  placeholder="Phone" clearable style="border-radius: 0.5rem;" />
        </n-form-item>
        <n-form-item path="subject" >
          <n-input  v-model:value="formValue.subject"  placeholder="Subject" clearable style="border-radius: 0.5rem;" />
        </n-form-item>
        <n-form-item path="message">
          <n-input  v-model:value="formValue.message" type="textarea" placeholder="Message Details" clearable style="border-radius: 0.5rem;" />
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
  display:flex;
  margin-bottom: 50px;
  min-height: 500px;
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