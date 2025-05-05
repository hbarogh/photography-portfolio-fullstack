<script setup lang="ts">
import {NCard, NInput, NFormItem, NForm, NButton, NText} from 'naive-ui';
</script>


<template>
  <div>
    <h1>Contact Page</h1>
    <n-card bordered:true hoverable:false>
      <n-text>
        Looking for a portrait photographer in DFW? If you have any questions or want to book a session, please fill out the form below, and I will be in contact shortly. 
      </n-text>
      <n-form label-placement="top">
        <n-form-item required:true>
          <n-input round placeholder="Name"/>
        </n-form-item>
        <n-form-item required:true>
          <n-input round placeholder="Last Name"/>
        </n-form-item>
        <n-form-item required:true>
          <n-input round placeholder="Email"/>
        </n-form-item>
        <n-form-item required:true>
          <n-input round placeholder="Phone"/>
        </n-form-item>
        <n-form-item required:True>
          <n-input round placeholder="Subject"/>
        </n-form-item>
        <n-form-item required:true>
          <n-input round placeholder="Message Details" />
        </n-form-item>
        <n-button round primary>
          Submit
        </n-button>
      </n-form>
    </n-card>
  </div>
</template>



<style>
</style>