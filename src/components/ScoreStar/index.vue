<script>
export default {
    name: 'ScoreStar',
    props: {
        score: {
            type: Number,
            default: 0
        }
    },
    computed: {
        scoreClass () {
            const num = this.score > 5 ? 5 : this.score < 0 ? 0 : this.score;
            return 'star-' + num;
        }
    }
};
</script>

<template src="./template.html" />
<style lang="scss" src="./style.scss" scoped></style>
