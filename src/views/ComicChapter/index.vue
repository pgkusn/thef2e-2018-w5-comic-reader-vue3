<template>
    <div v-if="pages.length" class="comicChapter">
        <div class="view">
            <ArrowButton :class="['prev', { lock: currentPage === 0 }]" @click.native="prevHandler" />
            <ImageArea :src="imageSrc" />
            <ArrowButton :class="['next', { lock: currentPage === pages.length - 1 }]" :direction="1" @click.native="nextHandler" />
        </div>
        <ChapterThumb
            :page="currentPage"
            :pages="pages"
            :pchapter="prevChapter"
            :nchapter="nextChapter"
            @setCurrentPage="setCurrentPage"
        />
    </div>
</template>

<script>
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { computed, onMounted, ref } from 'vue';
import ArrowButton from '@/components/ArrowButton/index.vue';
import ImageArea from '@/components/ImageArea/index.vue';
import ChapterThumb from '@/components/ChapterThumb/index.vue';
export default {
    name: 'ComicChapter',
    components: {
        ArrowButton,
        ImageArea,
        ChapterThumb
    },
    setup () {
        const route = useRoute();
        const router = useRouter();
        const currentPage = ref(0);
        const pages = ref([]);
        let chapters = [];
        const chapterIdx = computed(() => chapters.findIndex((value, index) => value.id === parseInt(route.params.cid, 10)));
        const prevChapter = ref(null);
        const nextChapter = ref(null);
        const imageSrc = computed(() => pages.value[currentPage.value]);
        const getChapterRoute = (id, cid) => ({
            name: 'ComicChapter',
            params: { id, cid }
        });
        const prevHandler = () => {
            if (currentPage.value > 0) {
                currentPage.value--;
            }
            else if (prevChapter.value && window.confirm('觀看上一話？')) {
                router.push(prevChapter);
            }
        };
        const nextHandler = () => {
            if (currentPage.value < pages.value.length - 1) {
                currentPage.value++;
            }
            else if (nextChapter.value && window.confirm('觀看下一話？')) {
                router.push(nextChapter);
            }
        };
        const setCurrentPage = index => {
            currentPage.value = index;
        };
        const getPages = () => axios(`${process.env.VUE_APP_API_URL}/chapter/${route.params.cid}`);
        const getChapters = () => axios(`${process.env.VUE_APP_API_URL}/detail/${route.params.id}`);
        onMounted(() => {
            Promise.all([getPages(), getChapters()])
                .then(results => {
                    pages.value = results[0].data.pages;
                    chapters = results[1].data.chapters;

                    // 設定上下章節路由
                    if (chapterIdx.value < chapters.length - 1) {
                        prevChapter.value = getChapterRoute(route.params.id, parseInt(route.params.cid, 10) - 1);
                    }
                    if (chapterIdx.value > 0) {
                        nextChapter.value = getChapterRoute(route.params.id, parseInt(route.params.cid, 10) + 1);
                    }
                })
                .catch(err => {
                    console.error(err.message);
                    if (err.response.status === 404) {
                        router.replace({ name: 'Comics' });
                    }
                });
        });
        return {
            currentPage,
            pages,
            prevChapter,
            nextChapter,
            imageSrc,
            prevHandler,
            nextHandler,
            setCurrentPage
        };
    }
};
</script>

<style lang="scss" src="./style.scss" scoped></style>
