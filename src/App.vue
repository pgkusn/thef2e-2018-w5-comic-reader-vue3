<template>
    <PageHeader />
    <transition
        :key="$route.fullPath"
        name="fade"
        mode="out-in"
        appear
    >
        <router-view style="padding: 60px 0 40px 0" />
    </transition>
    <PageFooter />
</template>

<script>
import PageHeader from '@/components/PageHeader/index.vue';
import PageFooter from '@/components/PageFooter/index.vue';
export default {
    name: 'App',
    components: {
        PageHeader,
        PageFooter
    }
};
</script>

<style lang="scss" src="./assets/style/main.scss"></style>
