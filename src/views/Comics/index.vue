<template>
    <div class="comics">
        <ComicItem
            v-for="item in comicItems"
            :key="item.id"
            :cover="item.cover"
            :title="item.title"
            :description="item.description"
            @click.native="$router.push({ name: 'ComicDetail', params: { id: item.id } })"
        />
    </div>
</template>

<script>
import axios from 'axios';
import ComicItem from '@/components/ComicItem/index.vue';
import { onMounted, ref } from 'vue';
export default {
    name: 'Comics',
    components: {
        ComicItem
    },
    setup () {
        const comicItems = ref([]);
        onMounted(() => {
            axios(`${process.env.VUE_APP_API_URL}/comics`).then(res => {
                comicItems.value = res.data;
            });
        });
        return {
            comicItems
        };
    }
};
</script>

<style>

</style>
