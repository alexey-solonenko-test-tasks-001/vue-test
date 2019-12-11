<template>
    <div class='row'>
        <p class='col-xs-12'>Thumbnails per page</p>
        <div class='col-xs-12'>
            <input
                type='number'
                id='thumbsPerPageInput'
                name='thumbsPerPageInput'
                v-on='listeners'
                :value='itemsPerPage'
                
            >
        </div>
        <div class='col-xs-2'>1</div>
        <div class='col-xs-8'>
            <input
                type='range'
                id='thumbsPerPageSlider'
                name='thumbsPerPageSlider'
                min='1'
                max='100'
                v-on='listeners'
                :value='itemsPerPage'
            >
        </div>
        <div class='col-xs-2'>100 to repl with prop</div>

    </div>
</template>

<script>
/**
 * @typedef import('./controlPanelEvents.js').controlPanelEvents
 */

/** @type controlPanelEvents */
import controlPanelEvents from './controlPanelEvents.js';

export default {
    props: {
        itemsPerPage: String,
    },
    computed: {
        /**
         * @function
         * @description This function is taken from official Vue.js tutorial
         * https://codesandbox.io/s/o29j95wx9
         */
        listeners(){
            return ({
                ...this.$listeners,
                input: event => this.$emit(controlPanelEvents.updateThumbsPerPage,event.target.value)
            });
        }
    }
}
</script>