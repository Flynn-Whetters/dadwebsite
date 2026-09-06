<script setup>
import HeroSection from '../components/HeroSection.vue'
import GallerySection from '../components/GallerySection.vue'
import StorySection from '../components/StorySection.vue'
import WorkshopStrip from '../components/WorkshopStrip.vue'
import TimberSection from '../components/TimberSection.vue'
import AboutSection from '../components/AboutSection.vue'
import InquiryForm from '../components/InquiryForm.vue'
import SectionDivider from '../components/SectionDivider.vue'
</script>

<template>
  <div>
    <HeroSection />
    <GallerySection />
    <SectionDivider />
    <StorySection />
    <WorkshopStrip />
    <SectionDivider />
    <TimberSection />
    <AboutSection />
    <InquiryForm />
  </div>
</template>
