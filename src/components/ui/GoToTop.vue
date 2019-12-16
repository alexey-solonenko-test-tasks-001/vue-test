<template>
    <div class='go-to-top' @click="goToTop">/\</div>
</template>

<script>
export default {
    methods :{
        goToTop: function() {
            window.scroll(0,0);
        }
    },
}
</script>