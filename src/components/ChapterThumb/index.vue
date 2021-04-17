<template>
    <div ref="chapterThumb" class="chapterThumb">
        <ul ref="chapterThumbList">
            <li
                v-if="pchapter"
                class="cBtn"
            >
                <router-link
                    :to="pchapter"
                    replace
                >
                    <span>上一話</span>
                </router-link>
            </li>
            <li
                v-for="(item,index) in pages"
                :key="item"
                :class="{active:index == page}"
            >
                <a
                    href="javascript:;"
                    :style="{backgroundImage:'url('+item+')'}"
                    @click="clickHandler(index)"
                />
            </li>
            <li
                v-if="nchapter"
                class="cBtn"
            >
                <router-link
                    :to="nchapter"
                    replace
                >
                    <span>下一話</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { nextTick, ref, watch } from 'vue';
export default {
    name: 'ChapterThumb',
    props: {
        page: {
            type: Number,
            default: 0
        },
        pages: {
            type: Array,
            required: true
        },
        pchapter: {
            type: Object,
            default: null
        },
        nchapter: {
            type: Object,
            default: null
        }
    },
    setup (props, { emit }) {
        const chapterThumb = ref(null);
        const chapterThumbList = ref(null);
        const clickHandler = index => {
            emit('setCurrentPage', index);
        };
        watch(() => props.page, async () => {
            await nextTick();
            const li = chapterThumb.value.querySelector('li.active');
            chapterThumbList.value.scrollLeft = li.offsetLeft - chapterThumbList.value.offsetWidth / 2 + li.offsetWidth / 2; // 先將 li.active 靠左 (chapterThumbList.value.scrollLeft = li.offsetLeft) 再扣除偏移量使其保持於中央
        });
        return {
            props,
            chapterThumb,
            chapterThumbList,
            clickHandler
        };
    }
};
</script>

<style lang="scss" src="./style.scss" scoped></style>
