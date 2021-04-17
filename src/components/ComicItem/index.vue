<template>
    <div class="comicItem">
        <div
            class="cover"
            :style="{backgroundImage:'url('+cover+')'}"
        />
        <div class="info">
            <h2 class="title">
                {{ title }}
            </h2>
            <p class="description">
                {{ description }}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ComicItem',
    props: {
        cover: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    }
};
</script>

<style lang="scss" src="./style.scss" scoped></style>
