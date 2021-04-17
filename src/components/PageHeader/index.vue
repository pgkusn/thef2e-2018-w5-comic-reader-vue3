<script>
import { useRoute, useRouter } from 'vue-router';
import ArrowButton from '@/components/ArrowButton';
export default {
    name: 'PageHeader',
    components: {
        ArrowButton
    },
    setup () {
        const route = useRoute();
        const router = useRouter();
        const clickHandler = () => {
            if (route.name === 'ComicDetail') {
                router.push({ name: 'Comics' });
            }
            else if (route.name === 'ComicChapter') {
                router.push({ name: 'ComicDetail' });
            }
        };
        return {
            clickHandler
        };
    }
};
</script>

<template src="./template.html" />
<style lang="scss" src="./style.scss" scoped></style>
